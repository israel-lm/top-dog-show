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
import { Category, ErrorCode } from "../../constants";
import { buildErrorReponseData, getUuid } from "../../commons";

export class DogRepository implements IRepository {
  async create(request: RequestModel): Promise<ResponseData> {
    let dogId = "";
    const dog = this.instantiateDog(request);
    try {
      await dataManager.upsert(DogOwner, dog.owner, {
        conflictPaths: ["id"],
        skipUpdateIfNoValuesChanged: true
      });
      await dataManager.insert(Dog, dog);
      dogId = dog.id;
    } catch (err) {
      console.error(`Create dog failed: ${err.detail}`);
      return buildErrorReponseData(
        ErrorCode.UnknownErr,
        "Failed to register dog"
      );
    }
    return new CreateDogResponseData(dogId);
  }

  async read(request: RequestModel): Promise<ResponseData> {
    if (request instanceof ListDogsRequestModel) {
      const listData = request.listData;
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
        return buildErrorReponseData(
          ErrorCode.UnknownErr,
          "Failed to get dog information"
        );
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
        dog = await dataManager.findOneBy(Dog, { id: request.dogId });
        if (!dog) {
          return buildErrorReponseData(ErrorCode.NotFoundErr, "Dog not found");
        }
      } catch (err) {
        console.error(err);
        return buildErrorReponseData(
          ErrorCode.UnknownErr,
          "Failed to get dog information"
        );
      }
      return new GetDogResponseData(dog);
    }
  }

  async update(request: RequestModel): Promise<ResponseData> {
    let dog;
    const dogId = request.dogData.dogId;
    try {
      //Check whether the dog exists in DB
      dog = await dataManager.findOne(Dog, {
        where: { id: dogId },
        relations: { owner: true }
      });
      if (!dog) {
        return buildErrorReponseData(ErrorCode.NotFoundErr, "Dog not found");
      }
    } catch (err) {
      console.error(err);
      return buildErrorReponseData(
        ErrorCode.UnknownErr,
        "Failed to update dog information"
      );
    }

    // Check whether should update the owner
    if (
      request.dogData.ownerFirstName != dog.owner.firstName &&
      request.dogData.ownerLastName != dog.owner.lastName
    ) {
      try {
        const dogOwner = this.instantiateOwner(request);
        await dataManager.upsert(DogOwner, dogOwner, {
          conflictPaths: ["id"],
          skipUpdateIfNoValuesChanged: true
        });
      } catch (err) {
        console.error(err);
        return buildErrorReponseData(
          ErrorCode.UnknownErr,
          "Failed to update dog owner information"
        );
      }
    }
    const newDog = this.instantiateDog(request);
    try {
      // Update the dog
      await dataManager.update(Dog, { id: dogId }, newDog);
    } catch (err) {
      console.error(err);
      return buildErrorReponseData(
        ErrorCode.UnknownErr,
        "Failed to update dog information"
      );
    }
    return new UpdateDogResponseData(newDog.id);
  }

  async delete(request: RequestModel): Promise<ResponseData> {
    try {
      const result = await dataManager.delete(Dog, request.dogId);
      if (result.affected == 0) {
        return buildErrorReponseData(ErrorCode.NotFoundErr, "Dog not found");
      }
    } catch (err) {
      console.error(err);
      return buildErrorReponseData(
        ErrorCode.UnknownErr,
        "Failed to delete dog information"
      );
    }
    return null;
  }

  getCategory(weight: number): Category | undefined {
    let category = undefined;
    if (weight && weight > 0) {
      if (weight < 20) {
        category = Category.Lightweight;
      } else if (weight < 25) {
        category = Category.Medium;
      } else {
        category = Category.Heavy;
      }
    }
    return category;
  }

  instantiateDog(request: RequestModel): Dog {
    const dogData = request.dogData;
    const dog = new Dog();
    dog.name = dogData?.dogName;
    dog.ageInMonths = dogData?.ageInMonths;
    dog.weight = dogData?.weight;
    dog.gender = dogData?.gender;
    dog.category = this.getCategory(dogData?.weight);
    if (dogData.ownerFirstName) {
      const dogOwner = this.instantiateOwner(request);
      dog.id = getUuid([dogData?.dogName, dogOwner.id]);
      dog.owner = this.instantiateOwner(request);
    }
    return dog;
  }

  instantiateOwner(request: RequestModel): DogOwner {
    const dogOwner = new DogOwner();
    const dogData = request.dogData;
    dogOwner.firstName = dogData.ownerFirstName;
    dogOwner.lastName = dogData.ownerLastName;
    dogOwner.id = getUuid([dogData.ownerFirstName, dogData.ownerLastName]);
    return dogOwner;
  }
}
