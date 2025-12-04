import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/auth/login/login';
import { Signup } from './pages/auth/signup/signup';
export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  {path: 'products', loadComponent: () => import('./pages/products/product-page').then(m => m.ProductPage) },
];
