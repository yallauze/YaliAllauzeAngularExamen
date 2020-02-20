export class Computer {
    constructor(
        public id: number,
        public modele: string,
        public marque: string,
        public type: string,
        public category: string,
        public prixAchat: number,
        public prixVente: number,
        public dateEntreeStock: Date
    ){}
}
