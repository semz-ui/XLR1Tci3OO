require("dotenv").config();
export const PORT = process.env.PORT || 5001;
export const DATABASE_URI: any = process.env.DATABASE_URL;
// export const BASE_URL = process.env.BASE_URL;
export const SECRET_KEY: any = process.env.SECRET_KEY;