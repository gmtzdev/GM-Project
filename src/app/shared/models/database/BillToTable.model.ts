import { Bill } from "./Bill.model"


export class BillToTable extends Bill {
    public paymentColumn: string;

    constructor(bill: Bill) {
        super(bill);
        this.paymentColumn = bill.payment.name;
    }
}