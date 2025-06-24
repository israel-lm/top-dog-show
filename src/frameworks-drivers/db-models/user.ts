import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  firstName: string;

  @Column("varchar")
  lastName: string;
}
