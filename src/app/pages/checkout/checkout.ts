// checkout.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../service/cart.service';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule],
  templateUrl: './checkout.html',
})
export class Checkout implements OnInit {
  cartItems: CartItem[] = [];
  loadingCheckout: boolean = true;

  // Price calculations
  subtotal: number = 0;
  shipping: number = 0;
  tax: number = 0;
  discount: number = 0;
  total: number = 0;

  // Billing information
  billing = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    newsletter: false,
    sameAddress: true,
  };

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to cart items from CartService
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
      this.loadingCheckout = false;
    });
  }

  // Calculate all totals (same logic as cart component)
  calculateTotals(): void {
    this.subtotal = this.cartService.getSubtotal();
    
    // Free shipping if subtotal > $1000
    this.shipping = this.subtotal > 1000 ? 0 : 49;
    
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

  // Handle form submission
  onSubmit(): void {
    if (this.validateForm()) {
      
      alert(`Order placed successfully!\n\nTotal: $${this.total.toFixed(2)}\nItems: ${this.totalItems}`);
    } else {
      alert('Please fill in all required fields');
    }
  }

  // Validate form
  validateForm(): boolean {
    return !!(
      this.billing.firstName &&
      this.billing.lastName &&
      this.billing.email &&
      this.billing.phone &&
      this.billing.address &&
      this.billing.city &&
      this.billing.country
    );
  }
}