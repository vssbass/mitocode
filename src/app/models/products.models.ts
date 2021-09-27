export interface productsResponse{
	proceso		: number;
	codcat?		: number;
	codigo?		: number;
	nombre 		: string;
	categoria?  : string;
	precio		: number;
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