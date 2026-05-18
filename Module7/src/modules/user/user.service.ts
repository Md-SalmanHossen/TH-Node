import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, age } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);
  //console.log(hashedPassword);

  const result = await pool.query(
    `
      INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4)
      RETURNING *
      `,
    [name, email, hashedPassword, age],
  );

  delete result.rows[0].password;

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await pool.query(`
      SELECT * FROM users`);
  result.rows.forEach((user) => {
    delete user.password;
    delete user.is_active;
  });

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
  result.rows.forEach((user) => {
    delete user.password;
    delete user.is_active;
  });
  return result;
};

const updateUserIntoDB = async (payload: IUser, id: string) => {
  const { name, password, age, is_Active } = payload;

  let hashedPassword ;
  if(password){
     hashedPassword=await bcrypt.hash(password,10);
  }

  const result = await pool.query(
    `
         UPDATE users 
         SET name=COALESCE($1,name),
         password=COALESCE($2,password)
         ,age=COALESCE($3,age),
         is_Active=COALESCE($4,is_Active)
         WHERE id=$5 RETURNING *`,
    [name, hashedPassword, age, is_Active, id],
  );
  delete result.rows[0].password;

  return result;
};

const userDeleteIntoDB = async (id: string) => {
  const result = await pool.query(
    `
         DELETE FROM users WHERE id=$1`,
    [id],
  );
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  userDeleteIntoDB,
};
