import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-slider',
  imports: [],
  templateUrl: './banner-slider.component.html',
  styleUrl: './banner-slider.component.scss',
  standalone: true,
})
export class BannerSliderComponent implements OnInit {
  images: string[] = [
    'assets/images/banner1.jpg',
    'assets/images/banner2.jpg',
    'assets/images/banner3.jpg',
  ];

  currentIndex = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
