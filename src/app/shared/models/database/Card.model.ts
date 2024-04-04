export class Card {
    id: number;
    name: string;
    owner: number;
    reference: string;
    type: number;

    constructor(id: number, name: string, owner: number, reference: string, type: number) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.reference = reference;
        this.type = type;
    }
}