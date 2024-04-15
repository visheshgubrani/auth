import { connectDB } from "./db/connectDB.js";
import { app } from "./app.js";
import dotenv from 'dotenv'

dotenv.config()

connectDB().then(() => {
    const port = process.env.PORT || 7000
    app.listen(port, () => {
        console.log(`The Server is listening on port: ${port}`);
    })
}).catch((error) => {
    console.log(error);
}) 