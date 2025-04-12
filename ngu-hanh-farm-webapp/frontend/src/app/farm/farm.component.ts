import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-farm',
    templateUrl: './farm.component.html',
    styleUrls: ['./farm.component.css']
})
export class FarmComponent {
    @Input() user: any;
    @Output() userChange = new EventEmitter<any>();

    cropImages = {
        'truc vang': '/assets/trucvang.jpg',
        'tre': '/assets/tre.jpg',
        'sen': '/assets/sen.jpg',
        'phuong vi': '/assets/phuongvi.jpg',
        'lua': '/assets/lua.jpg'
    };

    async plantCrop(cropName: string) {
        try {
            const response = await fetch('http://localhost:3000/users/plant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.user.userId, cropName })
            });
            const data = await response.json();
            this.userChange.emit(data.user);
            alert(data.message);
        } catch (error) {
            alert(error.message);
        }
    }

    async waterCrops() {
        try {
            const response = await fetch('http://localhost:3000/users/water', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.user.userId })
            });
            const data = await response.json();
            this.userChange.emit(data.user);
            alert(data.message);
        } catch (error) {
            alert(error.message);
        }
    }

    async harvestCrops() {
        try {
            const response = await fetch('http://localhost:3000/users/harvest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.user.userId })
            });
            const data = await response.json();
            this.userChange.emit(data.user);
            alert(data.message);
        } catch (error) {
            alert(error.message);
        }
    }

    async watchAd() {
        try {
            const response = await fetch('http://localhost:3000/users/ad', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.user.userId })
            });
            const data = await response.json();
            this.userChange.emit(data.user);
            alert(data.message);
        } catch (error) {
            alert(error.message);
        }
    }

    currentTime() {
        return Date.now() / 1000;
    }
}
