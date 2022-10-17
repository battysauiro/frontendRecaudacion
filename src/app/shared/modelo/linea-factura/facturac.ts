import { ContribucionFactura } from "./contribucion-factura";

export class Facturac {
  folio: number;
  usuario_id:string;
  contribuyente_id: string;
  domicilio: string;
  rmc: string;
  fecha: Date;
  descuento:number;
  total: number;
  items:ContribucionFactura [];
  estado_pago: boolean;
}
