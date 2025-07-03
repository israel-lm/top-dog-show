import { Column, Entity, PrimaryColumn } from "typeorm";
import { UserRole } from "../../constants";

@Entity()
export class ShowUser {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  firstName: string;

  @Column("varchar")
  lastName: string;

  @Column({ type: "enum", enum: UserRole })
  role: UserRole;

  @Column("varchar")
  email: string;

  @Column("varchar")
  password: string;
}
