import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { User } from "./user";

@Entity()
export class Show {
  @PrimaryColumn("uuid")
  id: string;

  @Column("datetime")
  startDate: Date;

  @Column("datetime")
  endDate: Date;

  @ManyToOne(() => User)
  host: Relation<User>;

  @ManyToOne(() => Location)
  location: Relation<Location>;
}
