import { RequestModel, ResponseData, ListRequestData } from "./base-models";
import { RankType, DisciplineType } from "./constants";

export class RankPositionData {
  position: number;
  dogName: string;
  points: number;

  constructor(position: number, dogName: string, points: number) {
    this.position = position;
    this.dogName = dogName;
    this.points = points;
  }
}

export class RankData {
  rankType: RankType;
  showId: string;
  ranking: RankPositionData[];

  constructor(rankType: RankType, showId: string, ranking: RankPositionData[]) {
    this.rankType = rankType;
    this.showId = showId;
    this.ranking = ranking;
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
    marks: MarkData[],
  ) {
    this.disciplineId = disciplineId;
    this.disciplineType = disciplineType;
    this.dogId = dogId;
    this.showId = showId;
    this.duration = duration;
    this.marks = marks;
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
