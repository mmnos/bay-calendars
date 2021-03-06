require("dotenv").config();
const express     = require("express"),
      exphbs      = require("express-handlebars"),
      passport    = require("./config/passport"),
      session     = require("express-session"),
      bodyParser  = require("body-parser"),
      authRoutes  = require("./routes/authRoutes.js"),
      profRoutes  = require("./routes/profileRoutes.js"),
      nodemailer  = require("nodemailer"),
      hbs         = require("nodemailer-express-handlebars"),
      { google }  = require("googleapis"),
      OAuth2      = google.auth.OAuth2;

// requiring models route
const db = require("./models");

let app = express();
const PORT = process.env.PORT || 3000;

// Middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(session({ 
  secret: "dogs are great", 
  resave: true, 
  saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
