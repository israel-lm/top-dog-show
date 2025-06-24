import { Entity, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { Dog } from "./dog";
import { Show } from "./show";

@Entity()
export class Participation {
  @PrimaryColumn("uuid")
  id: string;

  @ManyToOne(() => Dog)
  dog: Relation<Dog>;

  @ManyToOne(() => Show)
  show: Relation<Show>;
}
