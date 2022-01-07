const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = require("./app");

//MongoDB CONECTION
const DB = process.env.DATABASE;
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB Conection successfull!"));

// SERVER
const port = 5000;
app.listen(port, () => {
    console.log(`Shop-Api running on port ${port}`);
});
