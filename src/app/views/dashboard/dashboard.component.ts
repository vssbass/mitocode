import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/utils/services/categories.service';
import { ProductsService } from 'src/app/utils/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(
    private apiCategories: CategoriesService,
    private apiProducts: ProductsService
  ){}
  

  countCategorias: number;
  countProductos: number;

  CountCategories(){
    this.apiCategories.getCategories()
    .subscribe( resp => {
      this.countCategorias = resp.length;
    },error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
        timer: 4000
      })
    })
  }
  CountProducts(){
    this.apiProducts.getProducts()
    .subscribe( resp => {
      this.countProductos = resp.length;
    },error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
        timer: 4000
      })
    })
  }
 


  ngOnInit() {
    this.CountCategories();
    this.CountProducts();

  }
}
