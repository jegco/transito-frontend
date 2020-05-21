import { Animacion } from './Animacion';

export class PreferenciasDeUsuario {
    constructor(
        public id: string,
        public colorPrimario: string,
        public colorSecundario: string,
        public animacion: Animacion
    ) { }
}