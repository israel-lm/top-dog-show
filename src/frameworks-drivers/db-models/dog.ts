import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Relation
} from "typeorm";

import { DogOwner } from "./dog-owner";
import { RankAssociation } from "./rank";
import { Category } from "../../constants";

@Entity()
export class Dog {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column("int")
  weight: number;

  @Column({ type: "enum", enum: Category })
  category: Category;

  @Column("varchar")
  gender: string;

  @Column("int")
  ageInMonths: number;

  @ManyToOne(() => DogOwner, (owner) => owner.dogs, {
    cascade: true,
    eager: true
  })
  owner: Relation<DogOwner>;

  // @OneToMany(() => RankAssociation, (association) => association.dog)
  // rankAssociation: Relation<RankAssociation[]>;
}
