import { Origin } from "../models/origin.model";

export class CreateIncomeDto {
    concept: string;
    amount: number;
    visible: boolean = true;
    origin: Origin;

    constructor(concept: string, amount: number, origin: Origin) {
        this.concept = concept;
        this.amount = amount;
        this.origin = origin;
    }
}