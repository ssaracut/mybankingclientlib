
export class Profile {
    constructor(object) {
        this.firstName = object.firstName;
        this.lastName = object.lastName;
    }
}

export class Account {
    constructor(object) {
        this.accountKey = object.accountKey;
        this.description = object.description;
        this.name = object.name;
        this.number = object.number;
        this.classification = object.classification;
        this.balance = object.balance;
        this.currency = object.currency;
        this.detailLink = object.detailLink;
    }
}