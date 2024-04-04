import { Card } from "../models/database/Card.model";
import { Category } from "../models/database/Category.model";
import { Institution } from "../models/database/Institution.model";
import { Payment } from "../models/database/Payment.model";

export class CreateBillDto {
    concept: string;
    amount: number;
    visible: boolean = true;
    category: Category;
    payment: Payment;
    card: Card;
    institution: Institution;

    constructor(bill: any) {
        this.concept = bill.concept;
        this.amount = bill.amount;
        this.category = bill.category;
        this.payment = bill.payment;
        this.card = bill.card;
        this.institution = bill.institution
    }
}