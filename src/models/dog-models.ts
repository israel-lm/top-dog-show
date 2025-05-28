import { RequestModel, ResponseData, ListRequestData} from "./base-models";

export class DogData {
    dogName: string;
    dogId: string;
    ownerFirstName: string;
    ownerLastName: string;
    gender: string;
    weight: number;
    ageInMonths: number;

    constructor(
        dogName: string,
        dogId: string,
        ownerFirstName: string,
        ownerLastName: string,
        gender: string,
        weight: number,
        ageInMonths: number
    ) {
        this.dogName = dogName;
        this.dogId = dogId;
        this.ownerFirstName = ownerFirstName;
        this.ownerLastName = ownerLastName;
        this.gender = gender;
        this.weight = weight;
        this.ageInMonths = ageInMonths;
    }
}

export class CreateDogRequestModel extends RequestModel {
    dogData: DogData;

    constructor(dogData: DogData) {
        super();
        this.dogData = dogData;
    }
}

export class UpdateDogRequestModel extends RequestModel {
    dogData: DogData;

    constructor(dogData: DogData) {
        super();
        this.dogData = dogData;
    }
}

export class DeleteDogRequestModel extends RequestModel {
    dogId: string;

    constructor(dogId: string) {
        super();
        this.dogId = dogId;
    }
}

export class GetDogRequestModel extends RequestModel {
    dogId: string;

    constructor(dogId: string) {
        super();
        this.dogId = dogId;
    }
}

export class ListDogsRequestModel extends RequestModel {
    listData: ListRequestData;

    constructor(listData: ListRequestData) {
        super();
        this.listData = listData;
    }
}

export class CreateDogResponseData extends ResponseData {
    dogId: string;

    constructor(dogId: string) {
        super();
        this.dogId = dogId;
    }
}

export class UpdateDogResponseData extends ResponseData {
    dogId: string;

    constructor(dogId: string) {
        super();
        this.dogId = dogId;
    }
}

export class GetDogResponseData extends ResponseData {
    dogData: DogData;

    constructor(dogData: DogData) {
        super();
        this.dogData = dogData;
    }
}

export class ListDogssResponseData extends ResponseData {
    items: DogData[];
    total: number;

    constructor(items: DogData[], total: number) {
        super();
        this.items = items;
        this.total = total;
    }
}
