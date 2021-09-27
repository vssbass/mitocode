import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { categoriesResponse } from '../models/categories.models';
import { comboestado, productsResponse } from '../models/products.models';
import { AuthService } from '../utils/services/auth.service';
import { CategoriesService } from '../utils/services/categories.service';
import { ProductsService } from '../utils/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  listCategoria: categoriesResponse[] = [];
  listProducto: productsResponse[]=[];
  listComboEstado: comboestado[];
  
  public userData;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  public selectedSituacion: number;
  public selectedCategoria: number;

  public detalleFormUpd: FormGroup = this.fb.group({
    updnombreProducto: ['',[Validators.required, Validators.minLength(4)]],
    updcomboCategoria: ['',[Validators.required]],
    updDetallesPrecio: [0,[Validators.required]],
    updComboSituacion: ['',[Validators.required]],
    updCodProducto: ['']
  })
  public detalleFormNew: FormGroup = this.fb.group({
    newnomProducto: ['',[Validators.required, Validators.minLength(4)]],
    newComboCategoria: ['',[Validators.required]],
    newComboSituacion: ['',[Validators.required]],
    newDetallesPrecio: [0,[Validators.required]]
  })
  constructor(
    private apiCategories: CategoriesService,
    private apiProdcts: ProductsService,
    private fb: FormBuilder,
    private dataUsuarioAuth: AuthService
  ) { }
  listaProductos(){
 
    $('#tblProductos').DataTable().destroy();
    this.apiProdcts.getProducts()
    .subscribe( resp => {
      console.log(resp);
      this.listProducto = resp;
      this.dtTrigger.next();
    },error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
        timer: 4000
      })
    })
  }

  detalleProducto(codigo: number){
    this.selectedCategoria = 1;
    this.apiProdcts.getDetProducts(codigo)
    .subscribe( resp => {
      console.log(resp);
      this.detalleFormUpd.patchValue({
        updnombreProducto: resp.nombre,
        updCodProducto: resp.codigo,
        updnomCategoria: resp.categoria,
        updComboSituacion: resp.estado,
        updDetallesPrecio: resp.precio,
        updCodCategoria: resp.codigo,
        updcomboCategoria : resp.codcat
      });
      
      this.selectedSituacion = resp.estado;
      this.selectedCategoria = resp.codcat;
    },error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
        timer: 4500
      })
    })
  }
  listaCategorias(){
    this.apiCategories.getCategories()
    .subscribe(resp=>{
      this.listCategoria = resp;
    },error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        timer: 4000
      })
    })
  }

  agregarProducto(){
    this.userData = this.dataUsuarioAuth.DataUsuario;
    const dataFormNew = this.detalleFormNew.value;   
    const data : productsResponse = {
      proceso : 1,
      codigo : 0,
      nombre: dataFormNew.newnomProducto,
      codcat: dataFormNew.newComboCategoria,
      precio: dataFormNew.newDetallesPrecio,
      estado: dataFormNew.newComboSituacion,
      usuario: this.userData.codigo
    }
    
    this.apiProdcts.postUpdateProduct(data)
    .subscribe(resp =>{
      
      if(resp.respuesta == 1){
        Swal.fire({
          icon: 'success',
          title: 'ok',
          text: resp.mensaje,
          timer: 2500
        }).then((result) => {
          this.listaProductos();
          let element = document.getElementById("modalAgregarProducto") as any;
          element.click();
        })
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: resp.mensaje,
          timer: 4500
        })
      }
    })
  }
  guardarDetProductoModal()
  {
    this.userData = this.dataUsuarioAuth.DataUsuario;
    const dataFormUpd = this.detalleFormUpd.value;   
    const data : productsResponse = {
      proceso : 2,
      codigo: dataFormUpd.updCodProducto,
      nombre: dataFormUpd.updnombreProducto,
      precio: dataFormUpd.updDetallesPrecio,
      codcat: dataFormUpd.updcomboCategoria,
      estado: dataFormUpd.updComboSituacion,
      usuario: this.userData.codigo
    }
    console.log(data);
    this.apiProdcts.postUpdateProduct(data)
    .subscribe(resp =>{
      console.log(resp);
      if(resp.respuesta == 1){
        Swal.fire({
          icon: 'success',
          title: 'ok',
          text: resp.mensaje,
          timer: 2500
        }).then((result) => {
          this.listaProductos();
          let element = document.getElementById("modalDetalleProducto") as any;
          element.click();
        })
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: resp.mensaje,
          timer: 4500
        })
      }
    })

  }
  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu : [15, 30, 50],
      order: [0,'asc'],
      processing: true,
      dom: 'Bfrtip',
      buttons: [
      'pdf',
      'print',
      'excel'
      ]
    }
    this.listaProductos();
    this.listComboEstado = [
      { flag: 1, descripcion: 'ACTIVO' },
      { flag: 0, descripcion: 'INACTIVO'}];
      this.listaCategorias(); 
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
