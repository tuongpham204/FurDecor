import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductsResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://furniture-api.fly.dev/v1/products';

  constructor(private http: HttpClient) {}

  // Lấy tất cả sản phẩm
  getAllProducts(): Observable<ProductsResponse> {
    console.log('🌐 ProductService: Making HTTP GET request to:', this.apiUrl);
    return this.http.get<ProductsResponse>(this.apiUrl);
  }

  // Lấy sản phẩm với phân trang
  getProducts(limit: number = 30, offset: number = 0): Observable<ProductsResponse> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());
    
    return this.http.get<ProductsResponse>(this.apiUrl, { params });
  }

  // Lấy sản phẩm theo SKU
  getProductBySku(sku: string): Observable<{ success: boolean; data: Product }> {
    return this.http.get<{ success: boolean; data: Product }>(`${this.apiUrl}/${sku}`);
  }

  // Tìm kiếm sản phẩm
  searchProducts(query: string): Observable<ProductsResponse> {
    const params = new HttpParams().set('name', query);
    return this.http.get<ProductsResponse>(this.apiUrl, { params });
  }

  // Lấy sản phẩm theo danh mục
  getProductsByCategory(category: string): Observable<ProductsResponse> {
    const params = new HttpParams().set('category', category);
    return this.http.get<ProductsResponse>(this.apiUrl, { params });
  }

  // Lọc sản phẩm nâng cao
  filterProducts(filters: {
    limit?: number;
    offset?: number;
    sort?: string;
    name?: string;
    category?: string;
    wood_type?: string;
    finish?: string;
    min_price?: number;
    max_price?: number;
    min_stock?: number;
    max_stock?: number;
    featured?: boolean;
  }): Observable<ProductsResponse> {
    let params = new HttpParams();
    
    Object.keys(filters).forEach(key => {
      const value = filters[key as keyof typeof filters];
      if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<ProductsResponse>(this.apiUrl, { params });
  }

  // Lấy sản phẩm nổi bật
  getFeaturedProducts(limit: number = 10): Observable<ProductsResponse> {
    const params = new HttpParams()
      .set('featured', 'true')
      .set('limit', limit.toString());
    
    return this.http.get<ProductsResponse>(this.apiUrl, { params });
  }

  // Lấy sản phẩm theo loại gỗ
  getProductsByWoodType(woodType: string): Observable<ProductsResponse> {
    const params = new HttpParams().set('wood_type', woodType);
    return this.http.get<ProductsResponse>(this.apiUrl, { params });
  }

  // Lấy sản phẩm theo khoảng giá
  getProductsByPriceRange(minPrice: number, maxPrice: number): Observable<ProductsResponse> {
    const params = new HttpParams()
      .set('min_price', minPrice.toString())
      .set('max_price', maxPrice.toString())
      .set('sort', 'price_asc');
    
    return this.http.get<ProductsResponse>(this.apiUrl, { params });
  }
}