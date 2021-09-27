import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { categoriesResponse } from "src/app/models/categories.models";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: 'root',
  })
export class CategoriesService {
	private baseUrl: string = environment.baseUrl;

	constructor(private http: HttpClient) {}

	getCategories(){
		const url = `${ this.baseUrl }/categories`;
		return this.http.get<[categoriesResponse]>(url);
	}

	getDetCategorie(codigo: number){
		const url = `${ this.baseUrl }/detallecategorie`;
		const data ={
			codigo: codigo
		}
		return this.http.post<categoriesResponse>(url, data);
	}
	postUpdateCategorie(datacat :categoriesResponse){
		const url = `${ this.baseUrl }/processcategorie`;
		const data =
		{
			proceso:datacat.proceso,
			codigo:datacat.codigo,
			nombre:datacat.nombre,
			descripcion:datacat.descripcion,
			estado:datacat.estado,
			usuario:datacat.usuario
		}
		return this.http.post<categoriesResponse>(url,data);
	}

}