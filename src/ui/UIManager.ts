// abc/ui/UIManager.ts
import Phaser from 'phaser';
import * as config from '../config/gameConfig';
import { getFruitDataById, ALL_FRUITS } from '../data/fruits';
import { PlayerInventory, FruitData } from '../interfaces/fruit.interface';

// Kiểu dữ liệu cho các thành phần UI của túi hạt giống
type SeedBagElement = { icon: Phaser.GameObjects.Image, text: Phaser.GameObjects.Text };

export class UIManager {
    private scene: Phaser.Scene;
    private inventoryText: Phaser.GameObjects.Text | null = null;
    private seedBagUIElements: Map<string, SeedBagElement> = new Map();
    private selectedSeedHighlight: Phaser.GameObjects.Rectangle | null = null;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    /** Tạo tất cả các thành phần UI chính */
    public createAllUI(playerInventory: PlayerInventory, playerSeedInventory: PlayerInventory): void {
        const screenWidth = this.scene.cameras.main.width;

        // Tiêu đề game
        this.scene.add.text(config.UI_PADDING, config.UI_PADDING, 'Nông Trại Ngũ Hành', { fontSize: '20px', color: '#ffffff' })
            .setOrigin(0, 0).setData('isUiElement', true);

        // Text hiển thị kho nông sản
        const inventoryTextY = config.UI_PADDING * 3;
        this.inventoryText = this.scene.add.text(config.UI_PADDING, inventoryTextY, 'Kho: ', { fontSize: '16px', color: '#ffffff' })
            .setWordWrapWidth(screenWidth - config.UI_PADDING * 2).setOrigin(0, 0).setData('isUiElement', true);
        this.updateInventoryDisplay(playerInventory); // Cập nhật lần đầu

        // Nút Reset
        const resetButton = this.scene.add.text(screenWidth - config.UI_PADDING, config.UI_PADDING, 'Chơi Lại Từ Đầu', config.RESET_BUTTON_STYLE)
            .setOrigin(1, 0)
            .setInteractive({ useHandCursor: true })
            .setData('isUiElement', true)
            .setData('resetButton', true); // Thêm data để nhận diện dễ hơn trong Scene
        // Sự kiện click sẽ được xử lý trong FarmScene thông qua event listener chung

        // Tiêu đề túi hạt giống
        const seedBagTitleY = config.UI_PADDING * 3;
        this.scene.add.text(screenWidth - config.UI_PADDING, seedBagTitleY, 'Hạt Giống', { fontSize: '18px', color: '#ffffff' })
            .setOrigin(1, 0).setData('isUiElement', true);

        // Tạo các icon và text cho túi hạt giống
        this.createSeedBagElements(playerSeedInventory);

        // Tạo hình chữ nhật highlight khi chọn hạt giống
        this.selectedSeedHighlight = this.scene.add.rectangle(0, 0, config.SEED_ICON_SIZE + 4, config.SEED_ICON_SIZE + 4)
            .setStrokeStyle(2, 0xffffff)
            .setVisible(false)
            .setDepth(2);
    }

    /** Tạo các icon và text số lượng cho túi hạt giống */
    private createSeedBagElements(playerSeedInventory: PlayerInventory): void {
        const screenWidth = this.scene.cameras.main.width;
        const seedBagStartX = screenWidth - config.UI_PADDING - config.SEED_ICON_SIZE / 2;
        const seedBagTitleY = config.UI_PADDING * 3;
        const seedBagStartY = seedBagTitleY + 50;
        this.seedBagUIElements.clear(); // Xóa các element cũ nếu có

        ALL_FRUITS.forEach((fruit: FruitData, index: number) => {
            const iconX = seedBagStartX;
            const iconY = seedBagStartY + index * (config.SEED_ICON_SIZE + config.SEED_SPACING_VERTICAL);
            const count = playerSeedInventory[fruit.id] || 0;

            const seedIcon = this.scene.add.image(iconX, iconY, fruit.spriteKeySeed)
                .setInteractive(count > 0 ? { useHandCursor: true } : undefined) // Chỉ set interactive nếu count > 0
                .setDisplaySize(config.SEED_ICON_SIZE, config.SEED_ICON_SIZE)
                .setData('seedId', fruit.id)
                .setData('isSeedIcon', true)
                .setData('isUiElement', true)
                .setAlpha(count > 0 ? 1 : 0.5); // Alpha dựa trên số lượng

            const countTextY = iconY + config.SEED_COUNT_TEXT_OFFSET_Y;
            const countText = this.scene.add.text(iconX, countTextY, `x${count}`, { fontSize: '14px', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.5)', padding: { x: 2, y: 1 } })
                .setOrigin(0.5)
                .setData('isUiElement', true);

            this.seedBagUIElements.set(fruit.id, { icon: seedIcon, text: countText });
        });
    }

    /** Cập nhật hiển thị kho nông sản */
    public updateInventoryDisplay(playerInventory: PlayerInventory): void {
        let text = 'Kho nông sản: ';
        let items: string[] = [];
        for (const fruitId in playerInventory) {
            if (playerInventory[fruitId] > 0) {
                const fruitData = getFruitDataById(fruitId);
                items.push(`${fruitData?.name || fruitId}: ${playerInventory[fruitId]}`);
            }
        }
        text += items.join(' | ') || 'Trống';

        const screenWidth = this.scene.cameras.main.width;
        const seedBagWidthEstimate = config.SEED_ICON_SIZE + config.UI_PADDING * 2;
        const availableWidth = screenWidth - seedBagWidthEstimate - config.UI_PADDING;

        if (this.inventoryText) {
            this.inventoryText.setText(text);
            // Đặt giới hạn chiều rộng để text tự xuống dòng
            this.inventoryText.setWordWrapWidth(availableWidth > 100 ? availableWidth : 100);
        }
    }

    /** Cập nhật hiển thị số lượng và trạng thái của túi hạt giống */
    public updateSeedBagDisplay(playerSeedInventory: PlayerInventory): void {
        this.seedBagUIElements.forEach((elements: SeedBagElement, fruitId: string) => {
            const count = playerSeedInventory[fruitId] || 0;
            elements.text.setText(`x${count}`);
            elements.icon.setAlpha(count > 0 ? 1 : 0.5);
            // Cập nhật lại tương tác
            if (count > 0) {
                if (!elements.icon.input?.enabled) {
                    elements.icon.setInteractive({ useHandCursor: true });
                }
            } else {
                if (elements.icon.input?.enabled) {
                    elements.icon.disableInteractive();
                }
            }
        });
    }

    /** Hiển thị highlight khi chọn hạt giống */
    public selectSeed(icon: Phaser.GameObjects.Image): void {
        if (this.selectedSeedHighlight) {
            this.selectedSeedHighlight.setPosition(icon.x, icon.y).setVisible(true);
        }
    }

    /** Ẩn highlight khi bỏ chọn hạt giống */
    public deselectSeed(): void {
        if (this.selectedSeedHighlight) {
            this.selectedSeedHighlight.setVisible(false);
        }
    }

    /** Hiển thị hộp thoại xác nhận (dùng DOM) */
    public showConfirmationDialog(message: string, onConfirm: () => void, onCancel: () => void): void {
        // Logic tạo dialog DOM giữ nguyên như bản Javascript
        const dialogOverlay = document.createElement('div');
        dialogOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.5);z-index:1000;display:flex;justify-content:center;align-items:center;';

        const dialogBox = document.createElement('div');
        dialogBox.style.cssText = 'background-color:#fff;padding:25px;border-radius:8px;z-index:1001;text-align:center;box-shadow: 0 4px 15px rgba(0,0,0,0.2);max-width: 90%;width: 300px;';

        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.style.cssText = 'color:#333;margin-bottom:20px;font-size:16px;line-height:1.5;';
        dialogBox.appendChild(messageElement);

        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginTop = '15px';

        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Xác nhận';
        confirmButton.style.cssText = 'margin:0 10px;background-color:#3498db;color:#fff;border:none;padding:10px 18px;border-radius:5px;cursor:pointer;font-size:14px;transition: background-color 0.2s;';
        confirmButton.onmouseover = () => confirmButton.style.backgroundColor = '#2980b9';
        confirmButton.onmouseout = () => confirmButton.style.backgroundColor = '#3498db';
        confirmButton.onclick = () => {
            onConfirm();
            if (document.body.contains(dialogOverlay)) {
                 document.body.removeChild(dialogOverlay);
            }
        };
        buttonContainer.appendChild(confirmButton);

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Hủy';
        cancelButton.style.cssText = 'margin:0 10px;background-color:#e74c3c;color:#fff;border:none;padding:10px 18px;border-radius:5px;cursor:pointer;font-size:14px;transition: background-color 0.2s;';
        cancelButton.onmouseover = () => cancelButton.style.backgroundColor = '#c0392b';
        cancelButton.onmouseout = () => cancelButton.style.backgroundColor = '#e74c3c';
        cancelButton.onclick = () => {
            onCancel();
             if (document.body.contains(dialogOverlay)) {
                 document.body.removeChild(dialogOverlay);
            }
        };
        buttonContainer.appendChild(cancelButton);

        dialogBox.appendChild(buttonContainer);
        dialogOverlay.appendChild(dialogBox);
        document.body.appendChild(dialogOverlay);
    }

    /** (Optional) Hủy các đối tượng UI được quản lý */
    public destroy(): void {
        this.inventoryText?.destroy();
        this.selectedSeedHighlight?.destroy();
        this.seedBagUIElements.forEach(element => {
            element.icon.destroy();
            element.text.destroy();
        });
        this.seedBagUIElements.clear();
        console.log("UIManager elements destroyed.");
    }
}