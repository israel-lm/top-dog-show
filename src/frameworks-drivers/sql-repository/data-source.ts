import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "topdog",
  password: "M1nh@senh@topdog",
  database: "top_dog_show",
  synchronize: true,
  logging: true,
  entities: ["src/frameworks-drivers/db-models/*.ts"],
  subscribers: [],
  migrations: [],
  namingStrategy: new SnakeNamingStrategy()
});

export const dataManager = appDataSource.manager;
