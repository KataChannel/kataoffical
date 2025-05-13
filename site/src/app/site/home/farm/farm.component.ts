import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, signal, Signal, WritableSignal } from '@angular/core';
import { interval, Subscription } from 'rxjs';

type Elemental = 'kim' | 'moc' | 'thuy' | 'hoa' | 'tho';

export type PlotState = 'empty' | 'seed' | 'growing' | 'ready';

export interface FarmPlot {
  id: number;
  row: number;
  col: number;
  soilType: number; // 0..4 corresponds to the five soil types below
  state: PlotState;
  cropType: string | null;
  growthProgress: number;
  effectiveGrowthTime: number;
  effectiveHarvestValue: number;
}

export interface Crop {
  name: string;
  element: Elemental;
  growthTime: number;
  harvestValue: number;
  color: string;
}

@Component({
  selector: 'app-farm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss']
})
export class FarmComponent implements OnInit, OnDestroy {
  rows = 10; cols = 10;
  private farmPlots: WritableSignal<FarmPlot[][]> = signal([]);
  plots: Signal<FarmPlot[][]> = this.farmPlots.asReadonly();
  private tickSub!: Subscription;
  lastHarvestInfo: string = ''; // New property to store harvest details

  // 5 Loại Cây mới theo yêu cầu:
  // Hành Kim: Cây chanh vàng (Citrus limon)
  // Hành Mộc: Cây ổi (Psidium guajava)
  // Hành Thủy: Cây mận (Prunus domestica)
  // Hành Hỏa: Cây đào (Prunus persica)
  // Hành Thổ: Cây nhãn (Dimocarpus longan)
  crops: Crop[] = [
    { name: 'chanh vàng', element: 'kim', growthTime: 10, harvestValue: 5, color: 'yellow' },
    { name: 'ổi',        element: 'moc', growthTime: 8,  harvestValue: 4, color: 'green'  },
    { name: 'mận',       element: 'thuy', growthTime: 12, harvestValue: 6, color: 'blue'   },
    { name: 'đào',       element: 'hoa', growthTime: 9,  harvestValue: 5, color: 'red'    },
    { name: 'nhãn',      element: 'tho', growthTime: 11, harvestValue: 7, color: 'brown'  },
  ];

  // Mapping crop names to their raw material list
  private cropMaterials: Record<string, string[]> = {
    'chanh vàng': ['Sợi chanh vàng', 'Nhựa chanh'],
    'ổi': ['Sợi ổi', 'Lá ổi', 'Gỗ ổi'],
    'mận': ['Sợi mận', 'Nhựa mận'],
    'đào': ['Sợi đào', 'Hoa đào', 'Gỗ đào'],
    'nhãn': ['Sợi nhãn', 'Vỏ nhãn', 'Gỗ nhãn']
  };

  // 5 loại đất với màu sắc đại diện (màu dùng cho visual trong UI)
  // Hành Kim: Cát trắng (Silica sand)
  // Hành Mộc: Đất phù sa (Alluvial soil) Thảo Nguyên
  // Hành Thủy: Đất sét đen (Black clay) Đất ngập mặn
  // Hành Hỏa: Đất đỏ bazan (Basaltic red soil)
  // Hành Thổ: Đất hoàng thổ (Loess soil)
  soilColors: Record<Elemental, string> = {
    kim:  '#EFEFEF', // Cát trắng
    moc:  '#A0522D', // Đất phù sa
    thuy: '#2F4F4F', // Đất sét đen
    hoa:  '#B22222', // Đất đỏ bazan
    tho:  '#DEB887'  // Đất hoàng thổ
  };

  // Quan hệ ngũ hành: sử dụng map hiện có (tương sinh và tương khắc)
  // Tương sinh: tăng 50% sản lượng, Tương khắc: giảm 30% sản lượng, trung tính: bình thường
  birthMap: Record<Elemental, Elemental> = {
    kim: 'thuy',  thuy: 'moc',
    moc: 'hoa',   hoa: 'tho',
    tho: 'kim'
  };
  killMap: Record<Elemental, Elemental> = {
    kim: 'moc',   moc: 'tho',
    tho: 'thuy',  thuy: 'hoa',
    hoa: 'kim'
  };

  // Update inventory: giữ seed của cây và nguyên vật liệu, nguyên vật liệu khởi đầu là 0.
  inventory: WritableSignal<Record<string, number>> = signal({
    'chanh vàng': 5,
    'ổi': 5,
    'mận': 5,
    'đào': 5,
    'nhãn': 5,
    'Sợi chanh vàng': 0,
    'Nhựa chanh': 0,
    'Sợi ổi': 0,
    'Lá ổi': 0,
    'Gỗ ổi': 0,
    'Sợi mận': 0,
    'Nhựa mận': 0,
    'Sợi đào': 0,
    'Hoa đào': 0,
    'Gỗ đào': 0,
    'Sợi nhãn': 0,
    'Vỏ nhãn': 0,
    'Gỗ nhãn': 0
  });
  money = signal(0);
  selectedCrop = signal(this.crops[0].name);

  ngOnInit() {
    this.initFarm();
    this.tickSub = interval(1000).subscribe(() => this.updateGrowth());
    window.addEventListener('keydown', this.onKey);
  }
  ngOnDestroy() {
    this.tickSub.unsubscribe();
    window.removeEventListener('keydown', this.onKey);
  }

  private onKey = (e: KeyboardEvent) => {
    if (e.key >= '1' && e.key <= '5') {
      this.selectedCrop.set(this.crops[+e.key - 1].name);
    }
  };

  private initFarm() {
    const grid: FarmPlot[][] = [];
    let id = 0;
    for (let r = 0; r < this.rows; r++) {
      grid[r] = [];
      for (let c = 0; c < this.cols; c++) {
        grid[r][c] = {
          id: id++,
          row: r,
          col: c,
          soilType: (r * this.cols + c) % 5, // soil index 0..4 mapping to ['kim','moc','thuy','hoa','tho']
          state: 'empty',
          cropType: null,
          growthProgress: 0,
          effectiveGrowthTime: 0,
          effectiveHarvestValue: 0
        };
      }
    }
    this.farmPlots.set(grid);
  }

  // Click vào ô: nếu empty -> gieo hạt, nếu ready -> thu hoạch nguyên vật liệu từ cây
  onPlotClick(plot: FarmPlot) {
    const cur = this.farmPlots();
    const next = cur.map(row => row.map(p => ({ ...p })));
    const seed = this.selectedCrop();
    const crop = this.crops.find(x => x.name === seed)!;
    // Lấy soil element dựa trên soilType (index 0 đến 4 theo thứ tự: kim, mộc, thuy, hoa, tho)
    const soilEl: Elemental = (['kim', 'moc', 'thuy', 'hoa', 'tho'] as Elemental[])[plot.soilType];

    if (plot.state === 'empty') {
      // Xác định yếu tố hiệu quả sản lượng và thời gian thu hoạch
      let harvestFactor = 1;
      let growthFactor = 1;
      if (this.birthMap[crop.element] === soilEl) {
        harvestFactor = 1.5;
        growthFactor = 0.8; // Giảm 20% thời gian thu hoạch
      } else if (this.killMap[crop.element] === soilEl) {
        harvestFactor = 0.7;
        growthFactor = 1.3; // Tăng 30% thời gian thu hoạch
      }

      // Trừ inventory seed
      const inv = { ...this.inventory() };
      if (!inv[seed]) return;
      inv[seed]!--;
      this.inventory.set(inv);

      // Gán ô mới với growth time và harvest value đã điều chỉnh
      next[plot.row][plot.col] = {
        ...next[plot.row][plot.col],
        state: 'seed',
        cropType: seed,
        growthProgress: 0,
        effectiveGrowthTime: Math.ceil(crop.growthTime * growthFactor),
        effectiveHarvestValue: Math.ceil(crop.harvestValue * harvestFactor)
      };
    }
    else if (plot.state === 'ready') {
      // Thu hoạch: cộng tiền dựa trên effectiveHarvestValue
      const val = plot.effectiveHarvestValue;
      this.money.set(this.money() + val);
      const inv = { ...this.inventory() };
      // Thu hoạch nguyên vật liệu từ cây
      const materials = this.cropMaterials[crop.name];
      materials.forEach(mat => {
        inv[mat] = (inv[mat] || 0) + 1;
      });
      this.inventory.set(inv);

      // Build harvest info: tên và số lượng nguyên liệu thu được
      this.lastHarvestInfo = `Thu hoạch ${crop.name}: ` +
        materials.map(mat => `${mat}: 1`).join(', ');

      next[plot.row][plot.col] = {
        ...next[plot.row][plot.col],
        state: 'empty',
        cropType: null,
        growthProgress: 0
      };
    }

    this.farmPlots.set(next);
  }

  private updateGrowth() {
    const cur = this.farmPlots();
    const next = cur.map(row => row.map(p => ({ ...p })));
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const p = next[r][c];
        if ((p.state === 'seed' || p.state === 'growing') && p.cropType) {
          p.growthProgress++;
          p.state = p.growthProgress >= p.effectiveGrowthTime ? 'ready' : 'growing';
        }
      }
    }
    this.farmPlots.set(next);
  }

  // helper cho HTML
  getRemainingTime(plot: FarmPlot): number {
    return Math.max(0, plot.effectiveGrowthTime - plot.growthProgress);
  }
  getCropColor(name: string) { return this.crops.find(c => c.name === name)!.color; }
  getSoilColor(plot: FarmPlot): string {
    const el: Elemental = (['kim', 'moc', 'thuy', 'hoa', 'tho'] as Elemental[])[plot.soilType];
    return this.soilColors[el];
  }
  selectSeed(name: string) { this.selectedCrop.set(name); }

  // custom cursor theo màu seed
  get cursorStyle(): string {
    const c = this.crops.find(x => x.name === this.selectedCrop())!;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                   <circle cx="8" cy="8" r="4" fill="${c.color}"/>
                 </svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 8 8, auto`;
  }
}