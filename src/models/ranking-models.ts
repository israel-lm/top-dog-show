import { RequestModel, ResponseData, ListRequestData } from "./base-models";
import { RankType, DisciplineType } from "./constants";

export class RankPositionData {
  position: number;
  dogName: string;
  points: number;

  constructor(data: any) {
    this.position = data.position;
    this.dogName = data.dogName;
    this.points = data.points;
  }
}

export class RankData {
  rankType: RankType;
  showId: string;
  ranking: RankPositionData[];

  constructor(data: any) {
    this.rankType = data.rankType;
    this.showId = data.showId;
    this.ranking = data.ranking;
  }
}

export class MarkData {
  mark: number;
  attempts: number;
  success: boolean;

  constructor(data: any) {
    this.mark = data.mark;
    this.attempts = data.attempts;
    this.success = data.success;
  }
}

export class DisciplineData {
  disciplineId: string;
  disciplineType: DisciplineType;
  dogId: string;
  showId: string;
  duration: number;
  marks: MarkData[];

  constructor(data: any) {
    this.disciplineId = data.disciplineId;
    this.disciplineType = data.disciplineType;
    this.dogId = data.dogId;
    this.showId = data.showId;
    this.duration = data.duration;
    this.marks = data.marks;
  }
}

export class RegisterResultsRequestModel extends RequestModel {
  disciplineData: DisciplineData;

  constructor(disciplineData: DisciplineData) {
    super();
    this.disciplineData = disciplineData;
  }
}

export class EditResultsRequestModel extends RequestModel {
  disciplineData: DisciplineData;

  constructor(disciplineData: DisciplineData) {
    super();
    this.disciplineData = disciplineData;
  }
}

export class DeleteResultsRequestModel extends RequestModel {
  disciplineId: string;

  constructor(disciplineId: string) {
    super();
    this.disciplineId = disciplineId;
  }
}

export class GetResultsRequestModel extends RequestModel {
  disciplineId: string;

  constructor(disciplineId: string) {
    super();
    this.disciplineId = disciplineId;
  }
}

export class GetRankingRequestModel extends RequestModel {
  showId: string;
  disciplineType: DisciplineType;

  constructor(showId: string, disciplineType: DisciplineType) {
    super();
    this.showId = showId;
    this.disciplineType = disciplineType;
  }
}

export class RegisterResultsResponseData extends ResponseData {
  disciplineId: string;

  constructor(disciplineId: string) {
    super();
    this.disciplineId = disciplineId;
  }
}

export class EditResultsResponseData extends ResponseData {
  disciplineId: string;

  constructor(disciplineId: string) {
    super();
    this.disciplineId = disciplineId;
  }
}

export class GetResultsResponseData extends ResponseData {
  disciplineData: DisciplineData;

  constructor(disciplineData: DisciplineData) {
    super();
    this.disciplineData = disciplineData;
  }
}

export class GetRankingResponseData extends ResponseData {
  ranking: RankData;

  constructor(ranking: RankData) {
    super();
    this.ranking = ranking;
  }
}
