const mongoose = require("mongoose");
//const { DB_USER, DB_PASS, DB_NAME } = require("../");

mongoose.set('strictQuery', true);
mongoose.connect(
	`mongodb+srv://owaisyameen:Owais786123@cluster0.jfaucq0.mongodb.net/?retryWrites=true&w=majority`

);

module.exports = mongoose;

