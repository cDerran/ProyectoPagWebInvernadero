export class RegSensor{

    
    Uid:String;
    TempAmb:String;
    TempSuelo:String;
    HumAmb:String;
    PH:Number;
    Fecha:String;
    Hora:String;

    constructor(Uid:String,TempAmb:String,Tempsuelo:String,HumAmb:String,PH:Number,FechaReg:String,HoraReg:String){
        this.Uid = Uid;
        this.TempAmb = TempAmb;
        this.TempSuelo = Tempsuelo;
        this.HumAmb = HumAmb;
        this.PH = PH;
        this.Fecha = FechaReg;
        this.Hora = HoraReg;
    }

}