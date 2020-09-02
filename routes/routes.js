const mongoose = require(`mongoose`);

const schema = require(`../modules/schema.js`)

const secret = require(`../secret`);
const character = require(`../character`)

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb+srv://rjames:${secret['mongo-pass']}@comcharacters.ep4vw.mongodb.net/CoMCharacters?retryWrites=true&w=majority`, {
	useUnifiedTopology: true,
	useNewUrlParser: true
});

let mdb = mongoose.connection;
mdb.on(`error`, console.error.bind(console, `connection error`));
mdb.once(`open`, callback => {
	
});

exports.index = (req, res) => {
	res.render(`index`, {
		title: "Home"
	});
};

exports.character = (req, res) => {
	res.render(`character`, {
		character
	});
};

