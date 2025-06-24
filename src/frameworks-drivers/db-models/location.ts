import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  street: string;

  @Column("varchar")
  city: string;

  @Column("varchar")
  zipCode: string;
}
