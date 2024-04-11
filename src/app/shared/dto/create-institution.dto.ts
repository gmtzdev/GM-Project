export class CreateInstitutionDto {
    name: string;
    location: string;

    constructor(name: string) {
        this.name = name;
        this.location = '';
    }
}
