export interface PersonasResponse{
	codigo?		: number;
	name?		: string;
	usuario?	: string;
	nomrol?		: string;
	rol?		: string;
	codrol?		: number;
	password?	: string;
	token?		: string;
	estado?		: number,
	respuesta?	: boolean,
	mensaje?	: string;
}

export interface AdministratorResponse{
	
	codigo?		: number;
    nombre?		: string;
    user?		: string;
    codrol?		: number;
	password?	: string;
    rol?		: string;
    token?		: string;
	estado?		: number,
    respuesta?	: true,
    mensaje?	: string;
}
export interface dataAsideBar{
	codigo?		: number;
	nombres?	: string;
	rol?		: string;
	image?		: string;
}

export interface dataFlag{
	codigo?: number,
	codtip?: number,
	idproc?: number,
	respuesta?: boolean,
	mensaje?: string
}