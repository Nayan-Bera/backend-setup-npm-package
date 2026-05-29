import dotenv from "dotenv";
dotenv.config();
export const config = {
	PORT: Number(process.env.PORT) || 8000,
	DB_URL: process.env.DB_URL,
	NODE_ENV: process.env.NODE_ENV || "development",
	ORIGIN_FRONTEND: process.env.ORIGIN_FRONTEND,
	BASE_URL: process.env.BASE_URL,
	APP_NAME: process.env.APP_NAME,
	REFRESH_SECRET: process.env.REFRESH_SECRET,
	ACCESS_SECRET: process.env.ACCESS_SECRET,
	SALT: process.env.SALT,

};
