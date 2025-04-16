import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private characterPosition = { x: 100, y: 100 };
  private crops: { x: number, y: number, type: string, growth: number }[] = [];

  getCharacterPosition(): { x: number, y: number } {
    return { ...this.characterPosition };
  }

  moveCharacter(direction: string): void {
    const speed = 32;
    switch (direction) {
      case 'up':
        this.characterPosition.y -= speed;
        break;
      case 'down':
        this.characterPosition.y += speed;
        break;
      case 'left':
        this.characterPosition.x -= speed;
        break;
      case 'right':
        this.characterPosition.x += speed;
        break;
    }
  }

  plantCrop(x: number, y: number, type: string): void {
    this.crops.push({ x, y, type, growth: 0 });
  }

  getCrops(): { x: number, y: number, type: string, growth: number }[] {
    return [...this.crops];
  }

  growCrops(): void {
    this.crops.forEach(crop => {
      if (crop.growth < 100) {
        crop.growth += 10;
      }
    });
  }
}