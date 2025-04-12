import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})
export class ShopComponent {
    @Input() user: any;
    @Output() userChange = new EventEmitter<any>();

    async buyItem(item: string) {
        try {
            const response = await fetch('http://localhost:3000/users/buy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.user.userId, item })
            });
            const data = await response.json();
            this.userChange.emit(data.user);
            alert(data.message);
        } catch (error) {
            alert(error.message);
        }
    }
}
