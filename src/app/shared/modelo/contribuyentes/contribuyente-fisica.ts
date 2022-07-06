import { Factura } from "../linea-captura/factura";

export class ContribuyenteFisica {

    rfc_contribuyente :string;
    calle :string;
    numero :string;
    colonia :string;
    codigo_postal :string;
    id_contribuyente_fisica:string;
    curp :string;
    nombre :string;
    apellido_p :string;
    apellido_m :string;
    fecha :string;
    facturas:Array<Factura>[]=[]
}
