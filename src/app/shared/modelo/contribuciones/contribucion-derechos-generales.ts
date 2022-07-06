import { ContribucionDerechos } from "./contribucion-derechos";

export class ContribucionDerechosGenerales extends ContribucionDerechos{
    id_derecho_general: string;
    cantidad: number;
    id_periodicidad: number;
    periodicidad: string;
}
