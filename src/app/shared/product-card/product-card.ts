// product-card.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { LucideAngularModule, Flame, TreeDeciduous, ShoppingCart } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './product-card.html',
})
export class ProductCard implements OnInit {
  @Input() product!: Product;

  readonly Flame = Flame;
  readonly TreeDeciduous = TreeDeciduous;
  readonly ShoppingCart = ShoppingCart;

  // ✅ Inject CartService vào constructor
  constructor(private cartService: CartService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    console.log('🎴 ProductCard loaded with product:', this.product);
  }

  // Tính % giảm giá
  get discountPercentage(): number {
    if (this.product.discount_price && this.product.price > this.product.discount_price) {
      return Math.round(
        ((this.product.price - this.product.discount_price) / this.product.price) * 100
      );
    }
    return 0;
  }

  // Lấy giá hiển thị
  get displayPrice(): number {
    return this.product.discount_price || this.product.price;
  }

  // Check có giảm giá không
  get hasDiscount(): boolean {
    return (
      this.product.discount_price !== undefined && this.product.discount_price < this.product.price
    );
  }

  // Format category name
  get formattedCategory(): string {
    return this.product.category.charAt(0).toUpperCase() + this.product.category.slice(1);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.snackBar.open(`${product.name} added to cart!`, 'Close', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['toast-success'],
    });
  }
}
