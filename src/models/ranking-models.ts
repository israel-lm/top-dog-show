import { RequestModel, ResponseData, ListRequestData} from "./base-models";
import { RankType } from "./constants";


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