

export class Usuario{


    uid:String;
    Tipo:String="";
    email: string="";
    password:string="";
    nombre: string="";
    apellido: string="";
    telefono: number=0;
    direccion: string="";

    constructor(uid:String,email:string,password:string,Nombre:string,apellido:string,Telefono:number,direccion:string,Tipo:string){
        this.uid = uid;
        this.nombre = Nombre;
        this.apellido = apellido;
        this.password = password;
        this.telefono = Telefono;
        this.email = email;
        this.direccion = direccion;
        this.Tipo= Tipo;
    }
    
}