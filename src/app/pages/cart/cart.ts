// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../service/cart.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule ,Minus, Plus, Trash } from 'lucide-angular';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule ,LucideAngularModule],
  templateUrl: './cart.html',
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];
  loadingCart: boolean = true;
  subtotal: number = 0;
  shipping: number = 0;
  tax: number = 0;
  discount: number = 0;
  total: number = 0;

  Minus = Minus;
  Plus = Plus;
  Trash  = Trash;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
  this.cartService.cartItems$.subscribe(items => {
    this.cartItems = items;
    this.calculateTotals();
    this.loadingCart = false; 
  });
}

  increaseQuantity(productId: string): void {
    this.cartService.increaseQuantity(productId);
  }
  decreaseQuantity(productId: string): void {
    this.cartService.decreaseQuantity(productId);
  }

  removeItem(productId: string): void {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      this.cartService.removeItem(productId);
    }
  }

  clearCart(): void {
    if (confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
      this.cartService.clearCart();
    }
  }

  calculateTotals(): void {
    this.subtotal = this.cartService.getSubtotal();
    this.shipping = this.subtotal > 1000 ? 0 : 49;
  
    this.tax = (this.subtotal - this.discount) * 0.08;
    
    this.total = this.subtotal - this.discount + this.shipping + this.tax;
  }
  get totalItems(): number {
    return this.cartService.getTotalItems();
  }
  getItemTotal(item: CartItem): number {
    return item.price * item.quantity;
  }
}