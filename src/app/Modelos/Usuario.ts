

export class Usuario{


    Uid:number;
    Nombre: string="";
    Correo: string="";
    Clave:string="";
    Telefono: number=0;

    constructor(Id:number,Nombre:string,Correo:string,Clave:string,Telefono:number){
        this.Uid = Id;
        this.Nombre = Nombre;
        this.Clave = Clave;
        this.Telefono = Telefono;
        this.Correo = Correo;
    }
    
}