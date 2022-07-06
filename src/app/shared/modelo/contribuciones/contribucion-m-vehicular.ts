import { ContribucionAprovechamiento } from "./contribucion-aprovechamiento";

export class ContribucionMVehicular extends ContribucionAprovechamiento{
    id_multa_vehicular: string;
    descripcion_articulo: string;
    uma_min: number;
    uma_max: number;
    tipo_vehiculo: number;
    svehiculo:string;
}
