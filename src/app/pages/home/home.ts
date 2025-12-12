import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorySection } from '../../shared/catagory/category-section';
import { Banner } from '../../shared/banner/banner';
import { Contact } from '../../shared/contact/contact';
import { FeatureProduct } from '../../shared/feature-product/feature-product';
import { AboutUs } from '../../shared/about-us/about-us';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CategorySection, Banner, Contact, FeatureProduct, AboutUs],
  templateUrl: './home.html',
})
export class Home {
  title = 'my-ecommerce';
}
