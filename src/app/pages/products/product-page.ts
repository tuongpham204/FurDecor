import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { ProductCard } from '../../shared/product-card/product-card';
import { Product } from '../../models/product.model';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCard, LucideAngularModule],
  templateUrl: './product-page.html',
})
export class ProductPage implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];


  loading: boolean = true;
  error: string = '';
  selectedCategory: string = 'All';
  searchText: string = '';

 
  pageSize: number = 10;
  currentPage: number = 1;
  totalCount: number = 0;
  totalPages: number = 0;
  totalPagesArray: number[] = [];

  readonly Search = Search;
  categories: string[] = ['All', 'Chair', 'Table', 'Sofa', 'Bed', 'Lamp'];
  categorySlug: string = '';

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.route.queryParams.subscribe((params) => {
      const slug = params['category'];
      if (slug) {
        this.categorySlug = slug;
        this.selectedCategory = this.formatCategoryName(slug); 
        this.currentPage = 1;
        this.applyFilters(); 
      } else {
        this.categorySlug = '';
        this.selectedCategory = 'All';
      }
    });
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    this.productService.getAllProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.loading = false;

        this.applyFilters();
        this.cdr.detectChanges();
      },
      error: (err: Error) => {
        this.error = 'Unable to load products.';
        this.loading = false;
        console.error(err);
      },
    });
  }

  onCategorySelected(category: string) {
    this.selectedCategory = category;
    this.categorySlug = category.toLowerCase(); 
    if (category === 'All') {
      this.categorySlug = '';
    }
    this.currentPage = 1;
    this.applyFilters();
  }

  onSearch() {
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters() {
    let result = [...this.products];
    if (this.categorySlug) {
      result = result.filter((p) => p.category?.toLowerCase() === this.categorySlug.toLowerCase());
    }

    // Search filter
    if (this.searchText.trim()) {
      result = result.filter((p) => p.name.toLowerCase().includes(this.searchText.toLowerCase()));
    }

    this.totalCount = result.length;
    this.generatePagination();
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.filteredProducts = result.slice(start, end);
  }

  generatePagination() {
    this.totalPages = Math.ceil(this.totalCount / this.pageSize);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.applyFilters();
  }
  formatCategoryName(slug: string): string {
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
