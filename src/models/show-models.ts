import { RequestModel, ResponseData, ListRequestData} from "./base-models";
import { DisciplineType } from "./constants";

export class ShowData {
    hostId: string;
    address: string;
    startDate: Date;
    endDate: Date;

    constructor(
        hostId: string,
        address: string,
        startDate: Date,
        endDate: Date
    ) {
        this.hostId = hostId;
        this.address = address;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

export class MarkData {
    mark: number;
    attempts: number;
    success: boolean;

    constructor(mark: number, attempts: number, success: boolean) {
        this.mark = mark;
        this.attempts = attempts;
        this.success = success;
    }
}

export class DisciplineData {
    disciplineId: string;
    disciplineType: DisciplineType;
    dogId: string;
    showId: string;
    duration: number;
    marks: MarkData[];

    constructor(
        disciplineId: string,
        disciplineType: DisciplineType,
        dogId: string,
        showId: string,
        duration: number,
        marks: MarkData[]
    ) {
        this.disciplineId = disciplineId;
        this.disciplineType = disciplineType;
        this.dogId = dogId;
        this.showId = showId;
        this.duration = duration;
        this.marks = marks;
    }
}

export class CreateShowRequestModel extends RequestModel {
    showData: ShowData;

    constructor(showData: ShowData) {
        super();
        this.showData = showData;
    }
}

export class UpdateShowRequestModel extends RequestModel {
    showData: ShowData;

    constructor(showData: ShowData) {
        super();
        this.showData = showData;
    }
}

export class DeleteShowRequestModel extends RequestModel {
    showId: string;

    constructor(showId: string) {
        super();
        this.showId = showId;
    }
}

export class GetShowRequestModel extends RequestModel {
    showId: string;

    constructor(showId: string) {
        super();
        this.showId = showId;
    }
}

export class ListShowsRequestModel extends RequestModel {
    listData: ListRequestData;

    constructor(listData: ListRequestData) {
        super();
        this.listData = listData;
    }
}

export class RegisterDogRequestModel extends RequestModel {
    dogId: string;
    showId: string;
    registerUnregister: boolean;

    constructor(dogId: string, showId: string, registerUnregister: boolean) {
        super();
        this.dogId = dogId; 
        this.showId = showId; 
        this.registerUnregister = registerUnregister; 
    }
}