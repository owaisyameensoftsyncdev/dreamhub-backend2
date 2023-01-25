const mongoose = require("mongoose");
const { DB_USER, DB_PASS, DB_NAME } = require("../");

mongoose.set('strictQuery', true);
mongoose.connect(
	// "mongodb://localhost:27017"
	"mongodb://localhost:27017/test2",{
		useNewUrlParser: true,
	//	useFindAndModify: false,
		useUnifiedTopology: true
	  }
	// `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.eoppj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
);

module.exports = mongoose;

