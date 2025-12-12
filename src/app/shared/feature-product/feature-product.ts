import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product.service';
import { ProductCard } from '../../shared/product-card/product-card';
import { Product } from '../../models/product.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule, ProductCard, RouterLink],
  templateUrl: './feature-product.html',
})
export class FeatureProduct implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  error: string = '';
  totalCount: number = 0;

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    this.productService.getAllProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products.slice(0, 6); // Giới hạn 6 sản phẩm cho featured
        this.totalCount = products.length;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: Error) => {
        this.error = 'Không thể tải sản phẩm. Vui lòng thử lại sau.';
        this.loading = false;
        this.cdr.detectChanges();
        console.error('Error loading products:', err);
      },
    });
  }
}
