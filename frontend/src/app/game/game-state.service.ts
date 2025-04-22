import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GameStateService {
    // Sử dụng BehaviorSubject để các component khác có thể theo dõi thay đổi
    private selectedSeedSource = new BehaviorSubject<string | null>(null);
    private inventorySource = new BehaviorSubject<{ [key: string]: number }>({ 'seed_basic': 10 }); // Ví dụ kho đồ ban đầu

    selectedSeed$ = this.selectedSeedSource.asObservable();
    inventory$ = this.inventorySource.asObservable();

    constructor() { }

    // Hàm để Angular UI gọi khi chọn hạt giống
    selectSeed(seedType: string | null): void {
        console.log('Service: Seed selected:', seedType);
        this.selectedSeedSource.next(seedType);
    }

    // Hàm để Phaser Scene gọi để lấy hạt giống đang chọn
    getCurrentSeed(): string | null {
        return this.selectedSeedSource.getValue();
    }

    // Hàm để Phaser Scene gọi khi dùng hạt giống
    useSeed(seedType: string): void {
        const currentInventory = this.inventorySource.getValue();
        if (currentInventory[seedType] && currentInventory[seedType] > 0) {
            currentInventory[seedType]--;
            this.inventorySource.next(currentInventory); // Cập nhật kho đồ
             // Nếu hết hạt loại đó, bỏ chọn
            if (currentInventory[seedType] === 0) {
                 if (this.getCurrentSeed() === seedType) {
                     this.selectSeed(null);
                 }
            }
        }
    }

    // Hàm để Phaser Scene gọi khi thu hoạch
    addInventoryItem(itemType: string, quantity: number): void {
        const currentInventory = this.inventorySource.getValue();
        currentInventory[itemType] = (currentInventory[itemType] || 0) + quantity;
        this.inventorySource.next(currentInventory); // Cập nhật kho đồ
    }

    // Có thể thêm các hàm khác: mua/bán đồ, lưu/tải game...
}