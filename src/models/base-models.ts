export class BaseModel {}

export class ResponseData {}

export class RequestModel extends BaseModel {}

export class ResponseModel extends BaseModel {
    status: string;
    data: ResponseData;
    message: string;

    constructor(status: string, data: ResponseData, message: string){
        super();
        this.status = status;
        this.data = data;
        this.message = message;
    }
}


export class ListRequestData {
    limit: number;
    offset: number;
    createdAt?: Date;

    constructor(limit: number, offset: number, createdAt?: Date) {
        this.createdAt = createdAt;
        this.limit = limit;
        this.offset = offset;
    }
}
