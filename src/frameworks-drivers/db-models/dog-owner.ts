import { Column, Entity, OneToMany, PrimaryColumn, Relation } from "typeorm";

import { Dog } from "./dog";

@Entity()
export class DogOwner {
  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Dog, (dog) => dog.owner)
  dogs: Relation<Dog[]>;
}
