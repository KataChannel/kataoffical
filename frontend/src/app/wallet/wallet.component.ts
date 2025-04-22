import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-wallet',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css']
})
export class WalletComponent {
    @Input() user: any;
    @Output() userChange = new EventEmitter<any>();
    walletAddress = '';
    withdrawAmount = '';

    async connectWallet() {
        try {
            const response = await fetch('http://localhost:3000/users/connect_wallet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.user.userId, walletAddress: this.walletAddress })
            });
            const data = await response.json();
            this.userChange.emit(data.user);
            alert(data.message);
        } catch (error: any) {
            alert(error.message);
        }
    }

    async deposit() {
        try {
            const response = await fetch('http://localhost:3000/users/deposit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.user.userId, amount: 2 })
            });
            const data = await response.json();
            this.userChange.emit(data.user);
            alert(data.message);
        } catch (error: any) {
            alert(error.message);
        }
    }

    async withdraw() {
        try {
            const response = await fetch('http://localhost:3000/users/withdraw', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.user.userId, amount: parseFloat(this.withdrawAmount) })
            });
            const data = await response.json();
            this.userChange.emit(data.user);
            alert(data.message);
        } catch (error: any) {
            alert(error.message);
        }
    }
}
