import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catagory } from '../../shared/catagory/catagory';
import { Banner } from '../../shared/banner/banner';
import { Arrivals } from '../../shared/new-arrivals/arrivals';
import { ProductList } from '../product-list/product-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Catagory, Banner, Arrivals, ProductList],
  templateUrl: './home.html',
})
export class Home {
  title = 'my-ecommerce';
}
