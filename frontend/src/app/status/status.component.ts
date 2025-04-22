import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-status',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.css']
})
export class StatusComponent {
    @Input() user: any;

    currentTime() {
        return Date.now() / 1000;
    }
    getRemainingTime(crop: any) {
        if (!crop) return 0;
        const currentTime = this.currentTime();
        const cropTime = crop.plantedAt + crop.growthTime;
        return cropTime - currentTime;
    }
}
