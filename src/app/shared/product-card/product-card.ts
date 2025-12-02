// product-card.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
})
export class ProductCard implements OnInit {
  @Input() product!: Product;
  
  ngOnInit(): void {
    console.log('🎴 ProductCard loaded with product:', this.product);
  }

  // Tính % giảm giá
  get discountPercentage(): number {
    if (this.product.discount_price && this.product.price > this.product.discount_price) {
      return Math.round(((this.product.price - this.product.discount_price) / this.product.price) * 100);
    }
    return 0;
  }

  // Lấy giá hiển thị
  get displayPrice(): number {
    return this.product.discount_price || this.product.price;
  }

  // Check có giảm giá không
  get hasDiscount(): boolean {
    return this.product.discount_price !== undefined && this.product.discount_price < this.product.price;
  }

  // Format category name
  get formattedCategory(): string {
    return this.product.category.charAt(0).toUpperCase() + this.product.category.slice(1);
  }

  // Format wood type
  get formattedWoodType(): string {
    return this.product.wood_type.charAt(0).toUpperCase() + this.product.wood_type.slice(1);
  }
}