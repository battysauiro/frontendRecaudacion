import { FacturasNoPagadasDTO } from "../linea-factura/facturas-no-pagadas-dto";

export class Contribuyente {
  rfc_contribuyente:string;
  nombreContribuyente:string;
  direccion:string;
  contribuciones:FacturasNoPagadasDTO[];
}
