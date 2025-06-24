import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, Relation } from "typeorm";
import { Participation } from "./participation";
import { DisciplineType } from "../../models/constants";

@Entity()
export class Treadmill {
  @PrimaryColumn("uuid")
  participationId: string;

  @OneToOne(() => Participation)
  @JoinColumn()
  participation: Relation<Participation>;

  @Column("int")
  distance: number;
}

@Entity()
export class LongJump {
  @PrimaryColumn("uuid")
  participationId: string;

  @OneToOne(() => Participation)
  @JoinColumn()
  participation: Relation<Participation>;

  @Column("int")
  executionTime: number;

  @Column("int")
  distance1: number;

  @Column("int")
  distance2: number;

  @Column("int")
  distance3: number;

  @Column("int")
  distance4: number;

  @Column("int")
  distance5: number;
}

@Entity()
export class WallClimbHighJump {
  @PrimaryColumn("uuid")
  id: string;

  @OneToOne(() => Participation)
  @JoinColumn()
  participation: Relation<Participation>;

  @Column("int")
  executionTime: number;

  @Column("enum")
  type: DisciplineType;
}

@Entity()
export class Attempt {
  @PrimaryColumn("int")
  id: number;

  @Column("int")
  numberAttempts: number;

  @Column("boolean")
  result: boolean;
}

@Entity()
export class AttemptsAssocation {
  @PrimaryColumn("uuid")
  disciplineId: string;

  @ManyToOne(() => WallClimbHighJump)
  discipline: Relation<WallClimbHighJump>;

  @PrimaryColumn("int")
  attemptId: number;

  @ManyToOne(() => Attempt)
  attempt: Relation<Attempt>;
}
