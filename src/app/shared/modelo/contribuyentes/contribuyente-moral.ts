import { Factura } from "../linea-captura/factura";

export class ContribuyenteMoral {
    rfc_contribuyente :string;
    calle :string;
    numero :string;
    colonia :string;
    codigo_postal :string;
    id_contribuyente_moral:string;
    razon_social:string;
    facturas:Array<Factura>[]=[]
}
