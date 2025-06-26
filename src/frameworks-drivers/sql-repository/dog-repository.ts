import { IRepository } from "../../use-cases/repository-interface";
import { RequestModel, ResponseData } from "../../models/base-models";
import {
  CreateDogRequestModel,
  CreateDogResponseData,
  DogData,
  GetDogRequestModel,
  GetDogResponseData,
  ListDogsRequestModel,
  ListDogsResponseData,
  UpdateDogResponseData
} from "../../models/dog-models";

import { dataManager } from "./data-source";
import { Dog } from "../db-models/dog";
import { DogOwner } from "../db-models/dog-owner";
import { Category } from "../../constants";
import { getUuid } from "../../commons";

function getCategory(weight: number): Category {
  let category;
  if (weight < 20) {
    category = Category.Lightweight;
  } else if (weight < 25) {
    category = Category.Medium;
  } else {
    category = Category.Heavy;
  }

  return category;
}

export class DogRepository implements IRepository {
  async create(input: RequestModel): Promise<ResponseData> {
    let dogId = "";
    if (input instanceof CreateDogRequestModel) {
      const dogOwner = new DogOwner();
      const dogData = input.dogData;
      dogOwner.firstName = dogData.ownerFirstName;
      dogOwner.lastName = dogData.ownerLastName;
      dogOwner.id = getUuid([dogData.ownerFirstName, dogData.ownerLastName]);

      const dog = new Dog();
      dog.name = dogData.dogName;
      dog.ageInMonths = dogData.ageInMonths;
      dog.weight = dogData.weight;
      dog.gender = dogData.gender;
      dog.category = getCategory(dogData.weight);
      dog.id = getUuid([dogData.dogName, dogOwner.id]);
      dog.owner = dogOwner;

      try {
        await dataManager.save(dog);
        dogId = dog.id;
      } catch (err) {
        console.error(err);
      }
    }
    return new CreateDogResponseData(dogId);
  }

  async read(input: RequestModel): Promise<ResponseData> {
    if (input instanceof ListDogsRequestModel) {
      const listData = input.listData;
      let dogs;
      try {
        dogs = await dataManager
          .createQueryBuilder(Dog, "dog")
          .innerJoinAndSelect("dog.owner", "dogOwner")
          .limit(listData.limit)
          .offset(listData.offset)
          .getMany();
      } catch (err) {
        console.error(err);
      }

      let count = 0;
      let dogDataList = [];
      for (const dog of dogs) {
        console.log(dog);
        count++;
        const dogData = new DogData({
          dogName: dog.name,
          dogId: dog.id,
          ownerFirstName: dog.owner.firstName,
          ownerLastName: dog.owner.lastName,
          gender: dog.gender,
          weight: dog.weight,
          ageInMonths: dog.ageInMonths
        });
        dogDataList.push(dogData);
      }
      return new ListDogsResponseData(dogDataList, count);
    } else {
      let dog;
      try {
        dog = await dataManager.findOneBy(Dog, { id: input.dogId });
      } catch (err) {
        console.error(err);
      }
      return new GetDogResponseData(dog);
    }
  }

  async update(input: RequestModel): Promise<ResponseData> {
    return new UpdateDogResponseData("asdfasfkjasfasfasjfas");
  }

  async delete(input: RequestModel): Promise<ResponseData> {
    return null;
  }
}
