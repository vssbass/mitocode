import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { categoriesResponse, comboestado } from '../models/categories.models';
import { AuthService } from '../utils/services/auth.service';
import { CategoriesService } from '../utils/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnDestroy,OnInit {

  listCategoria: categoriesResponse[] = [];
  listComboEstado: comboestado[];
  public userData;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  public selectedSituacion: number;

  public detalleFormUpd: FormGroup = this.fb.group({
    updnomCategoria: ['',[Validators.required, Validators.minLength(4)]],
    updComboSituacion: ['',[Validators.required]],
    updDetallesCategoria: ['',[Validators.required]],
    updCodCategoria: ['']
  })
  public detalleFormNew: FormGroup = this.fb.group({
    newnomCategoria: ['',[Validators.required, Validators.minLength(4)]],
    newComboSituacion: ['',[Validators.required]],
    newDetallesCategoria: ['',[Validators.required]]
  })
  constructor(
    private apiCategories: CategoriesService,
    private fb: FormBuilder,
    private dataUsuarioAuth: AuthService
  ) { }
  listaCategorias(){
 
    $('#tblCategorias').DataTable().destroy();
    this.apiCategories.getCategories()
    .subscribe( resp => {
      this.listCategoria = resp;
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

  detalleCategoria(codigo: number){
    this.selectedSituacion = 0;
    this.apiCategories.getDetCategorie(codigo)
    .subscribe( resp => {
      console.log(resp);
      this.detalleFormUpd.patchValue({
        updnomCategoria: resp.nombre,
        updDetallesCategoria: resp.descripcion,
        updCodCategoria: resp.codigo
      });
      this.selectedSituacion = resp.estado;
    },error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
        timer: 4500
      })
    })
  }
  agregarCategoria(){
    this.userData = this.dataUsuarioAuth.DataUsuario;
    const dataFormNew = this.detalleFormNew.value;   
    const data : categoriesResponse = {
      proceso : 1,
      codigo : 0,
      nombre: dataFormNew.newnomCategoria,
      descripcion: dataFormNew.newDetallesCategoria,
      estado: dataFormNew.newComboSituacion,
      usuario: this.userData.codigo
    }
    
    this.apiCategories.postUpdateCategorie(data)
    .subscribe(resp =>{
      
      if(resp.respuesta == 1){
        Swal.fire({
          icon: 'success',
          title: 'ok',
          text: resp.mensaje,
          timer: 2500
        }).then((result) => {
          this.listaCategorias();
          let element = document.getElementById("modalAgregarCategoria") as any;
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
  guardarDetCategoriaModal()
  {
    this.userData = this.dataUsuarioAuth.DataUsuario;
    const dataFormUpd = this.detalleFormUpd.value;   
    const data : categoriesResponse = {
      proceso : 2,
      codigo: dataFormUpd.updCodCategoria,
      nombre: dataFormUpd.updnomCategoria,
      descripcion: dataFormUpd.updDetallesCategoria,
      estado: dataFormUpd.updComboSituacion,
      usuario: this.userData.codigo
    }

    this.apiCategories.postUpdateCategorie(data)
    .subscribe(resp =>{
 
      if(resp.respuesta == 1){
        Swal.fire({
          icon: 'success',
          title: 'ok',
          text: resp.mensaje,
          timer: 2500
        }).then((result) => {
          this.listaCategorias();
          let element = document.getElementById("modalDetalleCategoria") as any;
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
    this.listaCategorias();
    this.listComboEstado = [
      { flag: 1, descripcion: 'ACTIVO' },
      { flag: 0, descripcion: 'INACTIVO'}];
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
