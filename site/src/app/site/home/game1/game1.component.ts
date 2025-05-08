import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

// Class đơn giản cho Ô đất (Plot)
class Plot {
  isPlanted = false;
  plant: Plant | null = null;

  constructor(public readonly x: number, public readonly y: number, public readonly size: number) {}

  contains(px: number, py: number): boolean {
    return px > this.x && px < this.x + this.size &&
           py > this.y && py < this.y + this.size;
  }
}

// Class đơn giản cho Cây (Plant)
class Plant {
  growth = 0;
  readonly maxGrowth = 100;
  readonly growthRate = 0.5;
  isReadyToHarvest = false;

  update(): void {
    if (this.growth < this.maxGrowth) {
      this.growth += this.growthRate;
      if (this.growth >= this.maxGrowth) {
        this.growth = this.maxGrowth;
        this.isReadyToHarvest = true;
      }
    }
  }
}

@Component({
  selector: 'app-game1',
  imports: [
    CommonModule
  ],
  templateUrl: './game1.component.html',
  styleUrl: './game1.component.scss'
})
export class Game1Component implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('gameCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  loading = true;
  gameRunning = true;
  money = 100;
  readonly plantCost = 10;
  readonly harvestValue = 20;

  readonly plotSize = 50;
  readonly plotPadding = 10;
  readonly numRows = 5;
  readonly numCols = 8;
  plots: Plot[] = [];

  private animationFrameId = 0;
  private resizeHandler = () => this.resizeCanvas();

  ngOnInit(): void {
    this.initGameData();
  }

  ngAfterViewInit(): void {
    // Sau khi view (bao gồm canvas) được render
    // THÊM KIỂM TRA NÀY: Đảm bảo canvasRef đã được gán giá trị
    if (!this.canvasRef) {
      console.error('Canvas element not found!');
      return; // Thoát khỏi phương thức nếu không tìm thấy canvas
    }

    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    // Cập nhật kích thước canvas để phù hợp với container
    this.resizeCanvas();
    // Lắng nghe sự kiện resize cửa sổ để cập nhật lại kích thước canvas
    // Sử dụng bind(this) để đảm bảo 'this' trong resizeCanvas là component instance
    window.addEventListener('resize', this.resizeCanvas.bind(this));


    // Thêm listener cho sự kiện click trên canvas
    // Sử dụng bind(this) để đảm bảo 'this' trong handleCanvasClick là component instance
    canvas.addEventListener('click', this.handleCanvasClick.bind(this));

    // Bắt đầu vòng lặp game
    this.gameLoop();
  }


  ngOnDestroy(): void {
    this.gameRunning = false;
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.resizeHandler);
  }

  initGameData(): void {
    this.plots = [];
    for (let row = 0; row < this.numRows; row++) {
      for (let col = 0; col < this.numCols; col++) {
        const x = col * (this.plotSize + this.plotPadding) + this.plotPadding;
        const y = row * (this.plotSize + this.plotPadding) + this.plotPadding;
        this.plots.push(new Plot(x, y, this.plotSize));
      }
    }
  }

  private gameLoop = (): void => {
    if (!this.gameRunning) return;
    this.updateGame();
    this.drawGame();
    this.animationFrameId = requestAnimationFrame(this.gameLoop);
  };

  updateGame(): void {
    this.plots.forEach(plot => {
      plot.plant?.update();
    });
  }

  drawGame(): void {
    if (!this.ctx) return;
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.plots.forEach(plot => {
      this.ctx.fillStyle = plot.isPlanted ? '#8B4513' : '#D2B48C';
      this.ctx.fillRect(plot.x, plot.y, plot.size, plot.size);
      this.ctx.strokeStyle = '#A0522D';
      this.ctx.strokeRect(plot.x, plot.y, plot.size, plot.size);

      if (plot.isPlanted && plot.plant) {
        this.drawPlant(plot.plant, plot.x + plot.size / 2, plot.y + plot.size / 2);
      }
    });
  }

  drawPlant(plant: Plant, centerX: number, centerY: number): void {
    if (!this.ctx) return;
    const plantRadius = (plant.growth / plant.maxGrowth) * (this.plotSize / 3) + 5;
    const color = plant.isReadyToHarvest ? '#006400' : '#32CD32';
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, plantRadius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  handleCanvasClick(event: MouseEvent): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    for (const plot of this.plots) {
      if (plot.contains(mouseX, mouseY)) {
        if (!plot.isPlanted) {
          if (this.money >= this.plantCost) {
            this.money -= this.plantCost;
            plot.isPlanted = true;
            plot.plant = new Plant();
          }
        } else if (plot.plant?.isReadyToHarvest) {
          this.money += this.harvestValue;
          plot.isPlanted = false;
          plot.plant = null;
        }
        break;
      }
    }
  }

  resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const container = canvas.parentElement;
    if (container) {
      const containerWidth = container.clientWidth;
      const desiredHeight = containerWidth / 1.5;
      canvas.width = containerWidth;
      canvas.height = desiredHeight > 400 ? 400 : desiredHeight;
      this.drawGame();
    }
  }
}
