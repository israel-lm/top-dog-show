import { RequestModel, ResponseData, ListRequestData } from "./base-models";
import { DogRegistrationSchema, ShowSchema } from "./validation-schemas";

export class ShowData {
  hostId?: string;
  street?: string;
  city?: string;
  zipCode?: string;
  address?: string;
  startDate?: Date;
  endDate?: Date;

  constructor(data: any) {
    const validatedData = ShowSchema.parse(data);
    this.hostId = validatedData.hostId;
    this.street = validatedData.street;
    this.city = validatedData.city;
    this.zipCode = validatedData.zipCode;
    this.startDate = new Date(validatedData.startDate);
    this.endDate = new Date(validatedData.endDate);
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

  constructor(data: any) {
    super();
    const validatedData = DogRegistrationSchema.parse(data);
    this.dogId = validatedData.dogId;
    this.showId = validatedData.showId;
    this.registerUnregister = validatedData.registerUnregister;
  }
}

export class CreateShowResponseData extends ResponseData {
  showId: string;

  constructor(showId: string) {
    super();
    this.showId = showId;
  }
}

export class UpdateShowResponseData extends ResponseData {
  showId: string;

  constructor(showId: string) {
    super();
    this.showId = showId;
  }
}

export class GetShowResponseData extends ResponseData {
  showData: ShowData;

  constructor(showData: ShowData) {
    super();
    this.showData = showData;
  }
}

export class ListShowsResponseData extends ResponseData {
  items: ShowData[];
  total: number;

  constructor(items: ShowData[], total: number) {
    super();
    this.items = items;
    this.total = total;
  }
}
