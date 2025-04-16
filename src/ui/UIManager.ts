// abc/ui/UIManager.ts
import Phaser from 'phaser';
import * as config from '../config/gameConfig';
import { getFruitDataById, ALL_FRUITS } from '../data/fruits';
import { PlayerInventory, FruitData } from '../interfaces/fruit.interface';
import { TonConnectUI, THEME, WalletInfo } from '@tonconnect/ui';
import { Address } from 'ton-core';

type SeedBagElement = {
    icon: Phaser.GameObjects.Image;
    text: Phaser.GameObjects.Text;
    buyButton?: Phaser.GameObjects.Text;
};

export class UIManager {
    private scene: Phaser.Scene;
    private inventoryText: Phaser.GameObjects.Text | null = null;
    private seedBagUIElements: Map<string, SeedBagElement> = new Map();
    private selectedSeedHighlight: Phaser.GameObjects.Rectangle | null = null;

    private tonConnectUI: TonConnectUI | null = null;
    private walletAddress: string | null = null; // raw hex address
    private walletText: Phaser.GameObjects.Text | null = null;
    private connectWalletButton: Phaser.GameObjects.Text | null = null;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    public async initializeTonConnect(): Promise<void> {
        if (this.tonConnectUI) {
            console.warn("TonConnectUI already initialized.");
            return;
        }
        try {
            this.tonConnectUI = new TonConnectUI({
                manifestUrl: 'https://farm.kataoffical.online/tonconnect-manifest.json',
                uiPreferences: { theme: THEME.DARK, borderRadius: 'm' }
            });

            this.tonConnectUI.onStatusChange(
                (walletInfo: WalletInfo | null) => {
                  this.walletAddress = (walletInfo as any)?.account?.address || null; // Ép kiểu
                  console.log(this.walletAddress ? `Ví đã kết nối: ${this.walletAddress}` : 'Ví đã ngắt kết nối.');
                  this.updateWalletDisplay(this.walletAddress);
                  this.updatePurchaseButtons();
                },
                (error: unknown) => {
                  console.error("Lỗi thay đổi trạng thái TON Connect:", error);
                }
              );

            console.log("TonConnectUI initialized, checking for restored connection...");

            // Quan trọng: Đợi và kiểm tra kết nối đã được khôi phục
            const restoredConnection = await this.tonConnectUI.connectionRestored;
             if (restoredConnection) {
                  console.log('Connection was restored.', this.tonConnectUI.wallet);
                  this.walletAddress = this.tonConnectUI.account?.address || null;
                  // Cập nhật UI ngay sau khi khôi phục thành công
                   this.updateWalletDisplay(this.walletAddress);
                   this.updatePurchaseButtons();
             } else {
                  console.log('Connection was not restored.');
             }


        } catch (error) {
            console.error("Failed to initialize TonConnectUI:", error);
        }
    }

    public createAllUI(playerInventory: PlayerInventory, playerSeedInventory: PlayerInventory): void {
        const screenWidth = this.scene.cameras.main.width;

        this.scene.add.text(config.UI_PADDING, config.UI_PADDING, 'Nông Trại Ngũ Hành', { fontSize: '20px', color: '#ffffff' })
            .setOrigin(0, 0).setData('isUiElement', true);

        const inventoryTextY = config.UI_PADDING * 3;
        this.inventoryText = this.scene.add.text(config.UI_PADDING, inventoryTextY, 'Kho: ', { fontSize: '16px', color: '#ffffff' })
            .setWordWrapWidth(screenWidth * 0.5).setOrigin(0, 0).setData('isUiElement', true);
        this.updateInventoryDisplay(playerInventory);

        this.scene.add.text(screenWidth - config.UI_PADDING, config.UI_PADDING, 'Chơi Lại Từ Đầu', config.RESET_BUTTON_STYLE)
            .setOrigin(1, 0).setInteractive({ useHandCursor: true })
            .setData('isUiElement', true).setData('resetButton', true);

        const seedBagTitleY = config.UI_PADDING * 3;
        this.scene.add.text(screenWidth - config.UI_PADDING, seedBagTitleY, 'Hạt Giống', { fontSize: '18px', color: '#ffffff' })
            .setOrigin(1, 0).setData('isUiElement', true);

        this.createSeedBagElements(playerSeedInventory);

        this.selectedSeedHighlight = this.scene.add.rectangle(0, 0, config.SEED_ICON_SIZE + 4, config.SEED_ICON_SIZE + 4)
            .setStrokeStyle(2, 0xffffff).setVisible(false).setDepth(2);

        // --- TON Connect UI ---
        this.connectWalletButton = this.scene.add.text(screenWidth / 2, config.UI_PADDING + 10, 'Kết nối Ví TON', config.CONNECT_BUTTON_STYLE)
             .setOrigin(0.5, 0).setInteractive({ useHandCursor: true })
             .setData('connectWalletButton', true).setData('isUiElement', true);

        this.connectWalletButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (!this.tonConnectUI) {
                 console.error("TonConnectUI not initialized yet!");
                 return;
            }
            if (this.tonConnectUI.connected) { // Dùng thuộc tính 'connected'
                 this.tonConnectUI.disconnect().catch(e => console.error("Disconnect error:", e));
            } else {
                this.tonConnectUI.openModal();
            }
        });

        this.walletText = this.scene.add.text(screenWidth / 2, config.UI_PADDING + 50, 'Đang kiểm tra ví...', { fontSize: '12px', color: '#cccccc', align: 'center' })
             .setOrigin(0.5, 0).setData('isUiElement', true);

        // Cập nhật hiển thị ví và nút mua dựa trên trạng thái ban đầu (có thể đã restore)
        this.updateWalletDisplay(this.walletAddress);
        this.updatePurchaseButtons();
    }

    private createSeedBagElements(playerSeedInventory: PlayerInventory): void {
        const screenWidth = this.scene.cameras.main.width;
        const seedBagStartX = screenWidth - config.UI_PADDING - config.SEED_ICON_SIZE / 2;
        const seedBagTitleY = config.UI_PADDING * 3;
        const seedBagStartY = seedBagTitleY + 50;

        // Xóa các element cũ trước khi tạo mới
        this.seedBagUIElements.forEach(el => {
            el.icon.destroy();
            el.text.destroy();
            el.buyButton?.destroy();
        });
        this.seedBagUIElements.clear();


        ALL_FRUITS.forEach((fruit: FruitData, index: number) => {
            const iconX = seedBagStartX;
            const iconY = seedBagStartY + index * (config.SEED_ICON_SIZE + config.SEED_SPACING_VERTICAL);
            const count = playerSeedInventory[fruit.id] || 0;
            const seedPrice = config.SEED_PRICES[fruit.id];

            const seedIcon = this.scene.add.image(iconX, iconY, fruit.spriteKeySeed)
                .setInteractive(count > 0 ? { useHandCursor: true } : undefined)
                .setDisplaySize(config.SEED_ICON_SIZE, config.SEED_ICON_SIZE)
                .setData('seedId', fruit.id).setData('isSeedIcon', true).setData('isUiElement', true)
                .setAlpha(count > 0 ? 1 : 0.5);

            const countTextY = iconY + config.SEED_COUNT_TEXT_OFFSET_Y;
            const countText = this.scene.add.text(iconX, countTextY, `x${count}`, { fontSize: '14px', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.5)', padding: { x: 2, y: 1 } })
                .setOrigin(0.5).setData('isUiElement', true);

            let buyButton: Phaser.GameObjects.Text | undefined = undefined;
            if (seedPrice !== undefined) {
                 buyButton = this.scene.add.text(seedIcon.x + config.SEED_ICON_SIZE / 2 + 5, seedIcon.y, `Mua (${seedPrice} TON)`, config.BUY_BUTTON_STYLE)
                    .setOrigin(0, 0.5).setInteractive({useHandCursor: true})
                    .setData('buySeedButton', fruit.id).setData('seedPrice', seedPrice)
                    .setData('isUiElement', true).setVisible(!!this.walletAddress); // Hiển thị dựa trên trạng thái kết nối ban đầu
            }

            this.seedBagUIElements.set(fruit.id, { icon: seedIcon, text: countText, buyButton });
        });
    }

    public updateInventoryDisplay(playerInventory: PlayerInventory): void {
        let text = 'Kho nông sản: ';
        let items: string[] = Object.entries(playerInventory)
            .filter(([_, count]) => count > 0)
            .map(([fruitId, count]) => {
                const fruitData = getFruitDataById(fruitId);
                return `${fruitData?.name || fruitId}: ${count}`;
            });
        text += items.join(' | ') || 'Trống';
        this.inventoryText?.setText(text);
    }

    public updateSeedBagDisplay(playerSeedInventory: PlayerInventory): void {
        this.seedBagUIElements.forEach((elements: SeedBagElement, fruitId: string) => {
            const count = playerSeedInventory[fruitId] || 0;
            elements.text.setText(`x${count}`);
            elements.icon.setAlpha(count > 0 ? 1 : 0.5);
            if (count > 0) {
                if (!elements.icon.input?.enabled) elements.icon.setInteractive({ useHandCursor: true });
            } else {
                if (elements.icon.input?.enabled) elements.icon.disableInteractive();
            }
        });
    }

    public updateWalletDisplay(rawAddress: string | null): void {
        if (!this.walletText || !this.connectWalletButton) return; // Đảm bảo UI đã sẵn sàng

        if (rawAddress) {
            try {
                const friendlyAddress = Address.parse(rawAddress).toString({ testOnly: true }); // << CHỈNH testOnly=true NẾU DÙNG TESTNET
                const shortAddress = `${friendlyAddress.substring(0, 6)}...${friendlyAddress.substring(friendlyAddress.length - 4)}`;
                this.walletText.setText(`Ví: ${shortAddress}`);
                this.connectWalletButton.setText('Ngắt kết nối');
            } catch (e) {
                console.error("Error parsing wallet address:", e);
                this.walletText.setText('Lỗi địa chỉ ví');
                this.connectWalletButton.setText('Kết nối Ví TON');
            }
        } else {
            this.walletText.setText('Chưa kết nối ví');
            this.connectWalletButton.setText('Kết nối Ví TON');
        }
    }

    public updatePurchaseButtons(): void {
        const isConnected = !!this.walletAddress;
        this.seedBagUIElements.forEach((elements: SeedBagElement) => {
            elements.buyButton?.setVisible(isConnected);
        });
    }

    public selectSeed(icon: Phaser.GameObjects.Image): void {
        this.selectedSeedHighlight?.setPosition(icon.x, icon.y).setVisible(true);
    }

    public deselectSeed(): void {
        this.selectedSeedHighlight?.setVisible(false);
    }

    public showConfirmationDialog(message: string, onConfirm: () => void, onCancel: () => void): void {
        // Logic DOM dialog giữ nguyên
        const existingDialog = document.getElementById('game-confirmation-dialog');
         if (existingDialog) document.body.removeChild(existingDialog); // Xóa dialog cũ nếu còn sót

        const dialogOverlay = document.createElement('div');
         dialogOverlay.id = 'game-confirmation-dialog'; // Thêm ID để quản lý
        dialogOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.6);z-index:1000;display:flex;justify-content:center;align-items:center;padding:15px;';
        const dialogBox = document.createElement('div');
        dialogBox.style.cssText = 'background-color:#fff;padding:25px;border-radius:8px;z-index:1001;text-align:center;box-shadow: 0 4px 15px rgba(0,0,0,0.2);max-width: 400px;width: 100%;';
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.style.cssText = 'color:#333;margin-bottom:20px;font-size:16px;line-height:1.5;word-wrap:break-word;';
        dialogBox.appendChild(messageElement);
        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginTop = '15px';
        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Xác nhận';
        confirmButton.style.cssText = 'margin:5px 10px;background-color:#3498db;color:#fff;border:none;padding:10px 18px;border-radius:5px;cursor:pointer;font-size:14px;transition: background-color 0.2s;';
        confirmButton.onmouseover = () => confirmButton.style.backgroundColor = '#2980b9';
        confirmButton.onmouseout = () => confirmButton.style.backgroundColor = '#3498db';
        confirmButton.onclick = () => { onConfirm(); if (document.body.contains(dialogOverlay)) document.body.removeChild(dialogOverlay); };
        buttonContainer.appendChild(confirmButton);
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Hủy';
        cancelButton.style.cssText = 'margin:5px 10px;background-color:#aaa;color:#fff;border:none;padding:10px 18px;border-radius:5px;cursor:pointer;font-size:14px;transition: background-color 0.2s;'; // Màu nút Hủy
        cancelButton.onmouseover = () => cancelButton.style.backgroundColor = '#888';
        cancelButton.onmouseout = () => cancelButton.style.backgroundColor = '#aaa';
        cancelButton.onclick = () => { onCancel(); if (document.body.contains(dialogOverlay)) document.body.removeChild(dialogOverlay); };
        buttonContainer.appendChild(cancelButton);
        dialogBox.appendChild(buttonContainer);
        dialogOverlay.appendChild(dialogBox);
        document.body.appendChild(dialogOverlay);
    }

    public getTonConnectInstance(): TonConnectUI | null { return this.tonConnectUI; }
    public getCurrentWalletAddress(): string | null { return this.walletAddress; }

    public destroy(): void {
        this.inventoryText?.destroy();
        this.selectedSeedHighlight?.destroy();
        this.walletText?.destroy();
        this.connectWalletButton?.destroy();
        this.seedBagUIElements.forEach(element => {
            element.icon.destroy(); element.text.destroy(); element.buyButton?.destroy();
        });
        this.seedBagUIElements.clear();
        // Không tự động disconnect khi UI bị hủy, để người dùng quản lý
        console.log("UIManager elements destroyed.");
    }
}