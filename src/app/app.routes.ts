import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: Login,
  },
  {
    path: 'signup',
    component: Signup,
  },

  {
    path: 'products',
    loadComponent: () => import('./pages/products/product-page').then((m) => m.ProductPage),
    data: { breadcrumb: 'Products' },
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail').then((m) => m.ProductDetail),
    data: { breadcrumb: 'Product Detail' },
  },

  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then((m) => m.Cart),
    data: { breadcrumb: 'Cart' },
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/wishlist/wishlist').then((m) => m.Wishlist),
    data: { breadcrumb: 'Wishlist' },
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then((m) => m.Checkout),
    data: { breadcrumb: 'Checkout' },
  },

  {
    path: 'blog',
    loadComponent: () => import('./shared/blog/blog').then((m) => m.Blog),
    data: { breadcrumb: 'Blog' },
  },
  {
    path: 'aboutus',
    loadComponent: () => import('./shared/about-us/about-us').then((m) => m.AboutUs),
    data: { breadcrumb: 'About Us' },
  },
  {
    path: 'contactus',
    loadComponent: () => import('./shared/contact/contact').then((m) => m.Contact),
    data: { breadcrumb: 'Contact Us' },
  },
];
