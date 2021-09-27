import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { productsResponse } from "src/app/models/products.models";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: 'root',
  })
export class ProductsService {
	private baseUrl: string = environment.baseUrl;

	constructor(private http: HttpClient) {}

	getProducts(){
		const url = `${ this.baseUrl }/products`;
		return this.http.get<[productsResponse]>(url);
	}

	getDetProducts(codigo: number){
		const url = `${ this.baseUrl }/detalleproduct`;
		const data ={
			codigo: codigo
		}
		return this.http.post<productsResponse>(url, data);
	}
	postUpdateProduct(dataprod :productsResponse){
		const url = `${ this.baseUrl }/processproduct`;
		const data =
		{
			proceso:dataprod.proceso,
			codigo:dataprod.codigo,
			codcat: dataprod.codcat,
			nombre:dataprod.nombre,
			precio:dataprod.precio,
			estado:dataprod.estado,
			usuario:dataprod.usuario
		}
		console.log(data);
		return this.http.post<productsResponse>(url,data);
	}

}