export interface ESP32 {
    Humedad: number;
    Ph: number;
    'nivel de agua': number;
    Nivel: Number
    DHT11: Array<4>;
}

export interface objNivel{
  nivel:string,
  temperatura:number,
  valor:string
}

/*export interface DHT11 {
  DHT11: Array<4>;
}*/
