const express = require(`express`);
const path = require(`path`);
const bodyParser = require(`body-parser`)
const expressSession = require(`express-session`);
const routes = require(`./routes/routes`);

const app = express();

app.use((req, res, next) => {
	res.header(`Access-Control-Allow-Origin`, `*`);
	res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
	next();
});

let urlencodedParser = bodyParser.urlencoded({
	extended: true
});

const checkAuth = (req, res, next) => {
	if (req.session.user && req.session.user.isAuthenticated) {
		next();
	} else {
		res.redirect(`/`);
	}
}

app.set(`view engine`, `pug`);
app.set(`views`, path.join(__dirname, `/views`));
app.use(express.static(path.join(__dirname, `/public`)));

let pass = process.env.SESSION_PASS;
if (!pass) {
	let secret = require(`./secret`);
	pass = secret["session-pass"];
}

app.use(expressSession({
	secret: pass,
	saveUninitialized: true,
	resave: true
}));

app.get(`/`, routes.index);
app.get(`/signup`, routes.signup);
app.get(`/character`, checkAuth, routes.character);

app.post(`/signin`, urlencodedParser, routes.signin);
app.post(`/signup`, urlencodedParser, routes.signupUser);

let port = process.env.PORT;
if (!port || port == "") {
	port = 8000;
}
app.listen(port);