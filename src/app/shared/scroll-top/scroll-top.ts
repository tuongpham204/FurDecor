import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronUp } from 'lucide-angular';

@Component({
  selector: 'app-scroll',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './scroll-top.html',
})
export class ScrollTop {
  showButton = false;
  private readonly threshold = 100; 

  readonly ChevronUp = ChevronUp;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.pageYOffset > this.threshold;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}