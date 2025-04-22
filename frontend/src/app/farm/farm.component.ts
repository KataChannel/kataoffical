import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

// Seed Catalog
const seedCatalog: { [key: string]: any } = {
  'kim': { 
    name: 'Dừa Kim',
    element: 'kim',
    growTime: 60,
    xpReward: 20,
    tokenChance: 0.05,
    price: 50,
    premium: true,
    description: 'Cây dừa kim quý hiếm, mang lại nhiều phước lành.'
  },
  'moc': { 
    name: 'Chuối Mộc',
    element: 'moc',
    growTime: 60,
    xpReward: 15,
    tokenChance: 0.03,
    price: 30,
    premium: false,
    description: 'Cây  thường thấy, mọc nhanh và bền bỉ.'
  },
  'thuy': { 
    name: 'thuy',
    element: 'thuy',
    growTime: 60,
    xpReward: 25,
    tokenChance: 0.04,
    price: 45,
    premium: true,
    description: 'Hoa thuy thanh khiết, biểu tượng của sự thuần khiết.'
  },
  'hoa': { 
    name: 'Phương Vĩ',
    element: 'hoa',
    growTime: 60,
    xpReward: 30,
    tokenChance: 0.06,
    price: 60,
    premium: true,
    description: 'Phương vĩ rực rỡ, mang năng lượng mạnh mẽ.'
  },
  'tho': { 
    name: 'Lúa',
    element: 'tho',
    growTime: 60,
    xpReward: 18,
    tokenChance: 0.04,
    price: 25,
    premium: false,
    description: 'Lúa vàng bội thu, nguồn sống của người nông dân.'
  }
};

// Sample User Data
const initialUser = {
  userId: 'demo-user-123',
  username: 'Nông Dân Vui Vẻ',
  crops: [
    {
      name: '',
      display_name: '',
      planted_at: Date.now() / 1000 - 30, // Planted 30 seconds ago
      time_to_mature: seedCatalog['moc'].growTime,
      status: 'growing',
      health: 100,
      watered: false,
      isWatering: false,
      isHarvesting: false
    },
    {
      name: 'tho',
      display_name: 'Lúa',
      planted_at: Date.now() / 1000 - 50, // Planted 50 seconds ago
      time_to_mature: seedCatalog['tho'].growTime,
      status: 'growing',
      health: 100,
      watered: false,
      isWatering: false,
      isHarvesting: false
    }
  ],
  seeds: {
    'kim': 3,
    'moc': 10,
    'thuy': 5,
    'hoa': 2,
    'tho': 15
  },
  vip: true,
  vipExpiry: Date.now() / 1000 + 86400, // VIP for 1 day
  lastWater: 0,
  xp: 150,
  tokens: 100,
  level: 2,
  avatarUrl: '/assets/images/default-avatar.png',
  wateringCanLevel: 1,
  fertilizerAmount: 0,
  unlocks: {
    maxPlots: 5
  }
};

@Component({
  selector: 'app-farm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent implements OnInit, OnDestroy {
  @Input() user: any = initialUser;
  @Output() userChange = new EventEmitter<any>();
  
  cropImages: { [key: string]: string } = {
    'kim': '/assets/images/kim.png',
    'moc': '/assets/images/moc.png',
    'thuy': '/assets/images/thuy.png',
    'hoa': '/assets/images/hoa.png',
    'tho': '/assets/images/tho.png'
  };

  seedCatalog = seedCatalog;
  private timerSubscription: Subscription | null = null;
  currentTimeSeconds: number = Date.now() / 1000;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('FarmComponent initialized with user:', this.user);
    this.timerSubscription = interval(1000).subscribe(() => {
      this.currentTimeSeconds = Date.now() / 1000;
      if (this.user.vip && this.user.vipExpiry < this.currentTimeSeconds) {
        this.user.vip = false;
        this.userChange.emit(this.user);
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  calculateProgress(crop: any): number {
    if (!crop?.planted_at || !crop.time_to_mature) return 0;
    const elapsed = this.currentTimeSeconds - crop.planted_at;
    const progress = Math.min(100, (elapsed / crop.time_to_mature) * 100);
    return progress < 0 ? 0 : progress;
  }

  isMature(crop: any): boolean {
    if (!crop?.planted_at || !crop.time_to_mature) return false;
    return this.currentTimeSeconds - crop.planted_at >= crop.time_to_mature;
  }

  getTimeRemaining(crop: any): string {
    if (!crop?.planted_at || !crop.time_to_mature) return 'N/A';
    if (this.isMature(crop)) return 'Sẵn sàng!';
    const remainingSeconds = Math.max(0, crop.time_to_mature - (this.currentTimeSeconds - crop.planted_at));
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = Math.floor(remainingSeconds % 60);
    return `${minutes}p ${seconds}s`;
  }

  canWater(): boolean {
    if (!this.user) return false;
    if (this.user.vip) return true;
    const timeSinceLastWater = this.currentTimeSeconds - (this.user.lastWater || 0);
    return timeSinceLastWater >= 1800; // 30 minutes cooldown
  }

  waterCooldownRemaining(): number {
    if (!this.user || this.user.vip || this.canWater()) return 0;
    const timeSinceLastWater = this.currentTimeSeconds - (this.user.lastWater || 0);
    return Math.max(0, Math.floor(1800 - timeSinceLastWater));
  }

  countMatureCrops(): number {
    if (!this.user?.crops) return 0;
    return this.user.crops.filter((crop: any) => this.isMature(crop)).length;
  }

  canHarvest(): boolean {
    return this.countMatureCrops() > 0;
  }

  getCropTooltip(crop: any): string {
    if (!crop) return '';
    const progress = this.calculateProgress(crop).toFixed(1);
    const remaining = this.getTimeRemaining(crop);
    return `${crop.display_name} - Tiến độ: ${progress}% - Còn lại: ${remaining}`;
  }

  emptyPlots(): any[] {
    const currentCrops = this.user?.crops?.length || 0;
    const maxPlots = this.user?.unlocks?.maxPlots || 5;
    return Array(Math.max(0, maxPlots - currentCrops));
  }

  formatVipExpiry(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  getGrowthScale(crop: any): number {
    const progress = this.calculateProgress(crop) / 100;
    const minScale = 0.4;
    const maxScale = 1.0;
    return minScale + (maxScale - minScale) * progress;
  }

  getHarvestXP(crop: any): number {
    return seedCatalog[crop.name]?.xpReward || 0;
  }

  getSeedKeys(): string[] {
    console.log('Seed keys:', Object.keys(this.seedCatalog));
    
    return Object.keys(this.seedCatalog);
  }

  async plantCrop(cropName: string) {
    
    try {
      console.log(`Attempting to plant ${cropName}`);
      
      if (!this.user.seeds[cropName] || this.user.seeds[cropName] <= 0) {
        throw new Error('Không đủ hạt giống');
      }
      if (this.user.crops.length >= this.user.unlocks.maxPlots) {
        throw new Error('Đã đạt giới hạn ô trồng');
      }

      const seed = seedCatalog[cropName];
      const newCrop = {
        name: cropName,
        display_name: seed.name,
        planted_at: this.currentTimeSeconds,
        time_to_mature: seed.growTime,
        status: 'growing',
        health: 100,
        watered: false,
        isWatering: false,
        isHarvesting: false
      };

      this.user.seeds[cropName]--;
      this.user.crops.push(newCrop);
      this.userChange.emit(this.user);
      this.cdr.detectChanges();

      console.log(`Planted ${cropName} successfully`);
    } catch (error: any) {
      console.error('Planting error:', error.message);
      alert(`Lỗi: ${error.message}`);
    }
  }

  async waterCrops() {
    if (!this.canWater()) return;

    this.user.crops.forEach((crop: any) => (crop.isWatering = true));
    this.cdr.detectChanges();

    try {
      this.user.lastWater = this.currentTimeSeconds;
      this.user.crops.forEach((crop: any) => {
        if (!crop.watered) {
          crop.time_to_mature = Math.max(10, crop.time_to_mature * 0.8); // Reduce growth time by 20%
          crop.watered = true;
        }
      });

      setTimeout(() => {
        this.user.crops.forEach((crop: any) => (crop.isWatering = false));
        this.userChange.emit(this.user);
        this.cdr.detectChanges();
      }, 600);
    } catch (error: any) {
      console.error('Watering error:', error.message);
      alert(`Lỗi: ${error.message}`);
      this.user.crops.forEach((crop: any) => (crop.isWatering = false));
      this.cdr.detectChanges();
    }
  }

  async harvestCrops() {
    if (!this.canHarvest()) return;

    const indicesToHarvest: number[] = [];
    this.user.crops.forEach((crop: any, index: number) => {
      if (this.isMature(crop) && !crop.isHarvesting) {
        crop.isHarvesting = true;
        indicesToHarvest.push(index);
      }
    });

    if (indicesToHarvest.length === 0) return;

    this.cdr.detectChanges();

    try {
      let totalXP = 0;
      let tokenGain = 0;

      indicesToHarvest.sort((a, b) => b - a);
      for (const index of indicesToHarvest) {
        const crop = this.user.crops[index];
        const seedData = seedCatalog[crop.name];

        // Add seeds back
        this.user.seeds[crop.name] = (this.user.seeds[crop.name] || 0) + 1;

        // Add XP
        totalXP += seedData.xpReward;

        // Token chance
        if (Math.random() < seedData.tokenChance) {
          tokenGain++;
        }

        // Remove crop
        this.user.crops.splice(index, 1);
      }

      this.user.xp += totalXP;
      this.user.tokens += tokenGain;

      // Level up logic
      const newLevel = Math.floor(this.user.xp / 100) + 1;
      if (newLevel > this.user.level) {
        this.user.level = newLevel;
        this.user.unlocks.maxPlots = Math.min(10, 5 + Math.floor(newLevel / 2));
      }

      setTimeout(() => {
        this.userChange.emit(this.user);
        this.cdr.detectChanges();
        alert(`Thu hoạch thành công! Nhận: ${totalXP} XP${tokenGain > 0 ? `, ${tokenGain} token` : ''}`);
      }, 800);
    } catch (error: any) {
      console.error('Harvesting error:', error.message);
      alert(`Lỗi: ${error.message}`);
      indicesToHarvest.forEach(index => {
        if (this.user.crops[index]) this.user.crops[index].isHarvesting = false;
      });
      this.cdr.detectChanges();
    }
  }

  async harvestSingleCrop(index: number) {
    if (this.isMature(this.user.crops[index]) && !this.user.crops[index].isHarvesting) {
      this.user.crops[index].isHarvesting = true;
      await this.harvestCrops();
    }
  }

  async watchAd() {
    try {
      this.user.tokens += 5;
      this.userChange.emit(this.user);
      this.cdr.detectChanges();
      alert('Cảm ơn bạn đã xem quảng cáo! Nhận: 5 token');
    } catch (error: any) {
      console.error('Ad error:', error.message);
      alert(`Lỗi: ${error.message}`);
    }
  }
}