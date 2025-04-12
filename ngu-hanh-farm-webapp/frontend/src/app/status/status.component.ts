import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.css']
})
export class StatusComponent {
    @Input() user: any;

    currentTime() {
        return Date.now() / 1000;
    }
}
