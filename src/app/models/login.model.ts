export interface AuthResponse{
	codigo		: number;
	usuario		: string;
	nombres		: string;
	descripcion : string;
	estado 		: number;
	situacion	: string;
	mensaje		: string;
	respuesta	: boolean;
	token		: string;
}

export interface UsuarioResponse{
	iduser		: number;
	usuario		: string;
	nombres		: string;
	descripcion	: string;
}

export interface PersonasResposeLogin{
	codigo: number;
	name: string;
	
}

