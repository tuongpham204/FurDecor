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
  couponCode: string = '';
  appliedCoupon: string = '';
  
  // Price calculations
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
    // Subscribe to cart changes
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  // Increase quantity
  increaseQuantity(productId: string): void {
    this.cartService.increaseQuantity(productId);
  }

  // Decrease quantity
  decreaseQuantity(productId: string): void {
    this.cartService.decreaseQuantity(productId);
  }

  // Remove item from cart
  removeItem(productId: string): void {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      this.cartService.removeItem(productId);
    }
  }

  // Clear entire cart
  clearCart(): void {
    if (confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
      this.cartService.clearCart();
    }
  }

  // Apply coupon
  applyCoupon(): void {
    const code = this.couponCode.toUpperCase();
    if (code === 'DUO10') {
      this.appliedCoupon = code;
      this.calculateTotals();
      alert('Mã giảm giá đã được áp dụng thành công!');
    } else if (code === '') {
      alert('Vui lòng nhập mã giảm giá!');
    } else {
      alert('Mã giảm giá không hợp lệ!');
    }
  }

  // Calculate all totals
  calculateTotals(): void {
    this.subtotal = this.cartService.getSubtotal();
    
    // Free shipping if subtotal > $1000
    this.shipping = this.subtotal > 1000 ? 0 : 49;
    
    // Apply discount if coupon is applied
    if (this.appliedCoupon === 'DUO10') {
      this.discount = this.subtotal * 0.1; // 10% off
    } else {
      this.discount = 0;
    }
    
    // Calculate tax (8%)
    this.tax = (this.subtotal - this.discount) * 0.08;
    
    // Calculate total
    this.total = this.subtotal - this.discount + this.shipping + this.tax;
  }

  // Get total items count
  get totalItems(): number {
    return this.cartService.getTotalItems();
  }

  // Get item total price
  getItemTotal(item: CartItem): number {
    return item.price * item.quantity;
  }
}