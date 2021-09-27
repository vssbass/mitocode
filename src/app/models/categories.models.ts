export interface categoriesResponse{
	proceso		: number;
	codigo?		: number;
	nombre 		: string;
	descripcion : string;
	estado		: number;
	situacion?	: string;
	mensaje?	: string;
	respuesta?	: number;
	usuario		: number;
}
export interface comboestado{
	flag: number;
	descripcion: string;
}