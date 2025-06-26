import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { User } from "./user";
import { Location } from "./location";

@Entity()
export class Show {
  @PrimaryColumn("uuid")
  id: string;

  @Column("timestamp")
  startDate: Date;

  @Column("timestamp")
  endDate: Date;

  @ManyToOne(() => User)
  host: Relation<User>;

  @ManyToOne(() => Location)
  location: Relation<Location>;
}
