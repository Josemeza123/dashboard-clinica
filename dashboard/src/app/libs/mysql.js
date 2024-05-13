import mysql from "serverless-mysql";

export const conn = mysql({
  config: {
    host: "localhost",
    database: "clinica",
    user: "root",
    password: "",
    port: 3306,
  },
});
