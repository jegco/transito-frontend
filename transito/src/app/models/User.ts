 export class User {

     constructor(
        public id: string, 
        public nombreDeUsuario: string,
        public correoElectronico: string,
        public password: string,
        public numeroDeTelefono: number,
        public active: boolean,
        public role: string) {}
     
}