import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ImageSet {
  young: string;
  recent: string;
  folderNumber: string;
  personName: string;
}

@Component({
  selector: 'app-baby-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './baby-images.component.html',
  styleUrls: ['./baby-images.component.scss']
})
export class BabyImagesComponent implements OnInit, OnDestroy {
  currentImageSet!: ImageSet;
  currentBlurLevel: number = 10;
  imageSets: ImageSet[] = [];
  currentSetIndex: number = 0;
  blurInterval: number | undefined;
  isRecentImageVisible: boolean = false;
  isNameVisible: boolean = false;
  normalSpeed: number = 8000; // 8 seconds per step (80 seconds total)
  fastSpeed: number = 1000;   // 1 second per step (10 seconds total)
  currentSpeed: number = this.normalSpeed;

  ngOnInit() {
    this.loadImageSets();
    this.setCurrentImageSet(0);
    this.startBlurTransition();
  }

  ngOnDestroy() {
    if (this.blurInterval) {
      window.clearInterval(this.blurInterval);
    }
  }

  loadImageSets() {
    const folders = ['Hue', 'Yixi'];
    
    folders.forEach((folder, index) => {
      this.imageSets.push({
        young: `assets/images/Babies/${folder}/Young.png`,
        recent: `assets/images/Babies/${folder}/Recent.png`,
        folderNumber: (index + 1).toString(),
        personName: folder
      });
    });
  }

  setCurrentImageSet(index: number) {
    if (index >= 0 && index < this.imageSets.length) {
      this.currentSetIndex = index;
      this.currentImageSet = this.imageSets[index];
      this.resetBlur();
      this.isRecentImageVisible = false;
      this.isNameVisible = false;
      this.currentSpeed = this.normalSpeed; // Reset to normal speed for new image
    }
  }

  resetBlur() {
    this.currentBlurLevel = 10;
    if (this.blurInterval) {
      window.clearInterval(this.blurInterval);
    }
    this.startBlurTransition();
  }

  startBlurTransition() {
    this.blurInterval = window.setInterval(() => {
      if (this.currentBlurLevel > 0) {
        this.currentBlurLevel--;
      } else {
        if (this.blurInterval) {
          window.clearInterval(this.blurInterval);
        }
      }
    }, this.currentSpeed);
  }

  toggleSpeed() {
    this.currentSpeed = this.currentSpeed === this.normalSpeed ? this.fastSpeed : this.normalSpeed;
    if (this.currentBlurLevel > 0) { // Only restart if still blurry
      this.startBlurTransition();
    }
  }

  isSpeedUp(): boolean {
    return this.currentSpeed === this.fastSpeed;
  }

  toggleRecentImage() {
    this.isRecentImageVisible = !this.isRecentImageVisible;
  }

  toggleName() {
    this.isNameVisible = !this.isNameVisible;
  }

  nextSet() {
    this.setCurrentImageSet((this.currentSetIndex + 1) % this.imageSets.length);
  }

  previousSet() {
    const newIndex = this.currentSetIndex - 1 < 0 ? 
      this.imageSets.length - 1 : 
      this.currentSetIndex - 1;
    this.setCurrentImageSet(newIndex);
  }
}
