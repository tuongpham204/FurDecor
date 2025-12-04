import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product.service';
import { ProductCard } from '../../shared/product-card/product-card';
import { Product } from '../../models/product.model';
import { LucideAngularModule, Search, Plus } from 'lucide-angular';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ProductCard, LucideAngularModule],
  templateUrl: './product-page.html',
})
export class ProductPage implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  error: string = '';
  totalCount: number = 0;

  // ✅ Đăng ký icons
  readonly Search = Search;
  readonly Plus = Plus;

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {
    console.log('🔵 ProductList constructor called');
  }

  ngOnInit(): void {
    console.log('🟢 ProductList ngOnInit called');
    this.loadProducts();
  }

  loadProducts(): void {
    console.log('🟡 loadProducts() called - Starting API call...');
    this.loading = true;

    this.productService.getProducts(30, 0).subscribe({
      next: (response) => {
        console.log('✅ API SUCCESS! Response:', response);
        console.log('📦 Number of products:', response.data?.length);
        console.log('📊 Total count:', response.count);

        if (response.success) {
          this.products = response.data;
          this.totalCount = response.count;
          console.log('📋 Products assigned to component:', this.products.length);
          console.log('🎯 First product:', this.products[0]);
        } else {
          console.error('❌ API returned success: false');
          this.error = 'Không thể tải sản phẩm.';
        }

        this.loading = false;
        this.cdr.detectChanges();
        console.log('🟢 Loading set to FALSE');
      },
      error: (err: any) => {
        console.error('❌ API ERROR:', err);
        this.error = 'Không thể tải sản phẩm. Vui lòng thử lại sau.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  onAddProduct(): void {
    console.log('➕ Add new product clicked');
    // TODO: Navigate to add product page or open modal
    // this.router.navigate(['/admin/products/add']);
  }
}