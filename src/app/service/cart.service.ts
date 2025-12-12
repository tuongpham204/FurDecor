// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

// ✅ CartItem extends Product và thêm quantity
export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  addToCart(product: Product): void {
    const currentCart = this.cartItemsSubject.value;
    const existingItem = currentCart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }

    this.cartItemsSubject.next([...currentCart]);
    this.saveCartToStorage();
  }

  updateQuantity(productId: string, quantity: number): void {
    const currentCart = this.cartItemsSubject.value;
    const item = currentCart.find(i => i.id === productId);
    
    if (item && quantity > 0) {
      item.quantity = quantity;
      this.cartItemsSubject.next([...currentCart]);
      this.saveCartToStorage();
    }
  }

  increaseQuantity(productId: string): void {
    const item = this.getCartItems().find(i => i.id === productId);
    if (item) {
      this.updateQuantity(productId, item.quantity + 1);
    }
  }

  decreaseQuantity(productId: string): void {
    const item = this.getCartItems().find(i => i.id === productId);
    if (item && item.quantity > 1) {
      this.updateQuantity(productId, item.quantity - 1);
    }
  }

  removeItem(productId: string): void {
    const currentCart = this.cartItemsSubject.value.filter(
      item => item.id !== productId
    );
    this.cartItemsSubject.next(currentCart);
    this.saveCartToStorage();
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.saveCartToStorage();
  }

  getTotalItems(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + item.quantity, 
      0
    );
  }

  getSubtotal(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );
  }

  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItemsSubject.value));
  }

  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        this.cartItemsSubject.next(cart);
      } catch (e) {
        console.error('Error loading cart from storage', e);
      }
    }
  }
}