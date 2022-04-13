const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const passport = require("passport");
const localStratigy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { ConnectionPoolClosedEvent } = require("mongodb");
const axios = require('axios');
const app = express();

var Scount = 0;

mongoose.connect("mongodb://localhost:27017/login-auth", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const User = mongoose.model("User", {
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//Middleware
app.engine("hbs", hbs({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/static"));
app.use(session({
    secret:"secret",
    resave: false,
    saveUninitialized: true
}));


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//Passport.js
app.use(passport.initialize());
app.use(passport.session())


passport.serializeUser(function (user, done){
    done(null, user.id);
});

passport.deserializeUser(function (id, done){
    User.findById(id, function (err, user){
        done(err, user);
    });
});

passport.use(new localStratigy(function (username, password, done){
    User.findOne({ username: username }, function (err, user){
        if (err)  return done(err); 
        if (!user) return done(null, false, {message: "Incorrect Username"}); 

        bcrypt.compare(password, user.password, function (err, res){
            if (err) return done(err);
            if (res === false) return done(null, false, { message: "Incorrect Password" });

            return done(null, user);
        });
    });
}));

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

function isLoggedOut(req, res, next){
    if (!req.isAuthenticated()) return next();
    res.redirect("/");
}

app.get("/", isLoggedIn, (req, res) => {
    
    res.render("index", { title: "Home"});
});

app.get("/contact", isLoggedIn, (req, res) =>{
    res.render("contact", { title: "Contact Us"})
});

app.get("/about", isLoggedIn, (req, res) => {
    
    res.render("about", { title: "Home"});
});

app.get("/login", isLoggedOut, (req, res) => {

    const response = {
        title: "Login",
        error: req.query.error
    }

    res.render("login", response)
});

app.get("/forgotpass", isLoggedOut, (req, res) => {
    
    res.render("forgotpass", { title: "Forgot Pass"});
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?error=true"
}));

app.get("/logout", function (req, res) { 
    req.logout();
    res.redirect("/");
});
  

// Setup user 
app.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const exists = await User.exists({ username: username });
    Scount++;

    if (exists) {

        app.get('/message' + Scount, (req, res) => {
            res.json({ text: 'Email Already Exists' });
        });

		res.redirect('/login');
		return;
	}else{

    bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash(password, salt, function (err, hash) {
			if (err) return next(err);

			const newAdmin = new User({
				username: username,
				password: hash
			});

			newAdmin.save();

		    res.redirect('/login');
		});
	});
}
    
});

app.listen(3000, () => {
    console.log("Server up at 3000");
})