import { ContribucionAprovechamiento } from "./contribucion-aprovechamiento";

export class ContribucionMEbriedad extends ContribucionAprovechamiento{

    id_apro_ebriedad: string;
    uma_min: number;
    uma_max: number;
    cantidad_alcohol: number;
}
