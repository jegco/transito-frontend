import { Documento } from './Documento';
import { Menu } from './Menu';

export class PreferenciasDeUsuario {
    constructor(
        public id: string,
        public colorPrimario: string,
        public colorSecundario: string,
        public icono: Documento,
        public menu: Menu
    ) { }
}