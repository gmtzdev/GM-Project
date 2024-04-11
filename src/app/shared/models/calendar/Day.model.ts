export class Day {
    day: number;
    today: boolean;
    noDayOfMonth: boolean;

    constructor(day: number) {
        this.day = day;
        this.today = false;
        this.noDayOfMonth = false;
    }
}