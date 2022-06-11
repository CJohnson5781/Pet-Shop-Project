import { Sequelize } from "sequelize";
import { petFactory } from "./pet";

const dbName = 'petDB';
const username = 'newuser';
const password = 'Password1!';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

petFactory(sequelize);

export const db = sequelize;