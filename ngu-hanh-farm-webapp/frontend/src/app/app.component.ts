import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <div class="container">
            <h1>Ngũ Hành Farm (Testnet)</h1>
            <div *ngIf="!user">Please log in with Telegram to start playing.</div>
            <div *ngIf="user" class="tabs">
                <button (click)="activeTab = 'farm'" [class.active]="activeTab === 'farm'">Farm</button>
                <button (click)="activeTab = 'shop'" [class.active]="activeTab === 'shop'">Shop</button>
                <button (click)="activeTab = 'status'" [class.active]="activeTab === 'status'">Status</button>
                <button (click)="activeTab = 'wallet'" [class.active]="activeTab === 'wallet'">Wallet</button>
            </div>
            <app-farm *ngIf="user && activeTab === 'farm'" [user]="user" (userChange)="updateUser($event)"></app-farm>
            <app-shop *ngIf="user && activeTab === 'shop'" [user]="user" (userChange)="updateUser($event)"></app-shop>
            <app-status *ngIf="user && activeTab === 'status'" [user]="user"></app-status>
            <app-wallet *ngIf="user && activeTab === 'wallet'" [user]="user" (userChange)="updateUser($event)"></app-wallet>
        </div>
    `,
    styles: [`
        .container { max-width: 800px; margin: auto; padding: 20px; text-align: center; }
        .tabs button { margin: 5px; padding: 10px; cursor: pointer; border: none; background: #f0f0f0; }
        .tabs button.active { background: #007bff; color: white; }
        h1 { font-size: 2em; }
    `]
})
export class AppComponent implements OnInit {
    activeTab = 'farm';
    userId: string | null = null;
    user: any = null;

    async ngOnInit() {
        this.userId = localStorage.getItem('userId');
        if (this.userId) {
            await this.fetchUser(this.userId);
        }
    }

    async fetchUser(userId: string) {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        this.user = await response.json();
    }

    updateUser(user: any) {
        this.user = user;
    }
}
