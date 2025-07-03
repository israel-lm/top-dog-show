import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { ShowUser } from "./user";
import { Location } from "./location";

@Entity()
export class Show {
  @PrimaryColumn("uuid")
  id: string;

  @Column("timestamp")
  startDate: Date;

  @Column("timestamp")
  endDate: Date;

  @ManyToOne(() => ShowUser)
  host: Relation<ShowUser>;

  @ManyToOne(() => Location)
  location: Relation<Location>;
}
