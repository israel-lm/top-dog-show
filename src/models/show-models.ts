import { RequestModel, ResponseData, ListRequestData } from "./base-models";

export class ShowData {
  hostId: string;
  address: string;
  startDate: Date;
  endDate: Date;

  constructor(hostId: string, address: string, startDate: Date, endDate: Date) {
    this.hostId = hostId;
    this.address = address;
    this.startDate = startDate;
    this.endDate = endDate;
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
