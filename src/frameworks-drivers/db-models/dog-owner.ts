import { Column, Entity, OneToMany, PrimaryColumn, Relation } from "typeorm";

import { Dog } from "./dog";

@Entity()
export class DogOwner {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  firstName: string;

  @Column("varchar")
  lastName: string;

  @OneToMany(() => Dog, (dog) => dog.owner)
  dogs: Relation<Dog[]>;
}
