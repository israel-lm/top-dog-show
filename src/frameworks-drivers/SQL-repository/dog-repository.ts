import { IRepository } from "../../use-cases/repository-interface";
import { RequestModel, ResponseData } from "../../models/base-models";
import {
  CreateDogResponseData,
  DogData,
  GetDogRequestModel,
  GetDogResponseData,
  ListDogsRequestModel,
  ListDogsResponseData,
  UpdateDogResponseData
} from "../../models/dog-models";

export class DogRepository implements IRepository {
  create(input: RequestModel): ResponseData {
    return new CreateDogResponseData("asdfasfkjasfasfasjfas");
  }

  read(input: RequestModel): ResponseData {
    console.log("repository read");
    const data = {
      dogName: "Apolo",
      ownerFirstName: "Israel",
      ownerLastName: "Marinho",
      gender: "Male",
      weight: 30,
      ageInMonths: 60,
      dogId: "asdasdas"
    };

    const dogData = new DogData(data);
    if (input instanceof ListDogsRequestModel) {
      console.log("Got here");
      return new ListDogsResponseData([dogData], 1);
    } else {
      console.log("Got here2");
      return new GetDogResponseData(dogData);
    }
  }

  update(input: RequestModel): ResponseData {
    return new UpdateDogResponseData("asdfasfkjasfasfasjfas");
  }

  delete(input: RequestModel): ResponseData {
    return null;
  }
}
