import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Relation
} from "typeorm";

import { Dog } from "./dog";
import { Show } from "./show";

@Entity()
export class Rank {
  @PrimaryColumn("varchar")
  id: string;

  @PrimaryColumn("uuid")
  showId: string;

  @ManyToOne(() => Show)
  show: Relation<Show>;

  @OneToMany(() => RankAssociation, (association) => association.rank)
  associations: Relation<RankAssociation[]>;
}

@Entity()
export class RankAssociation {
  @PrimaryColumn("uuid")
  rankId: string;

  @ManyToOne(() => Rank, (rank) => rank.associations)
  rank: Relation<Rank>;

  @PrimaryColumn("uuid")
  dogId: string;

  @ManyToOne(() => Dog)
  dog: Relation<Dog>;

  @Column("int")
  position: number;
}
