import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmComponent } from './farm/farm.component';
import { ShopComponent } from './shop/shop.component';
import { StatusComponent } from './status/status.component';
import { WalletComponent } from './wallet/wallet.component';
import { GameComponent } from './game/game.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule, 
        // FarmComponent, 
        // ShopComponent, 
        // StatusComponent, 
        // WalletComponent,
        GameComponent
    ],
    templateUrl: 'app.component.html',
    styles: [``]
})
export class AppComponent implements OnInit {
    activeTab = 'farm';
    userId: string | null = null;
    user: any = {
        id: 1, 
        name: 'Ngũ Hành Farm', 
        level: 1, 
        exp: 0, 
        coins: 100, 
        gems: 10, 
        crops: [
            { id: 1, name: 'Metal Seeds', type: 'seed', element: 'metal', quantity: Math.floor(Math.random() * 10) + 1, description: 'Seeds infused with metal element' },
            { id: 2, name: 'Wood Seeds', type: 'seed', element: 'wood', quantity: Math.floor(Math.random() * 10) + 1, description: 'Seeds infused with wood element' },
            { id: 3, name: 'Water Seeds', type: 'seed', element: 'water', quantity: Math.floor(Math.random() * 10) + 1, description: 'Seeds infused with water element' },
            { id: 4, name: 'Fire Seeds', type: 'seed', element: 'fire', quantity: Math.floor(Math.random() * 10) + 1, description: 'Seeds infused with fire element' },
            { id: 5, name: 'Earth Seeds', type: 'seed', element: 'earth', quantity: Math.floor(Math.random() * 10) + 1, description: 'Seeds infused with earth element' }
        ]
    };

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
