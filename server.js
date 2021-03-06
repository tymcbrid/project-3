const express = require("express");
const session = require("express-session")
const mongoose = require("mongoose");
const passport = require("./passport/setup");

const path = require("path");
require("dotenv").config();

const app = express();
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3001;


app.use(express.static(path.join(__dirname, 'client/build')));


// Define middleware here
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/goodearth", { useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
})
.then(console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use(cookieParser());
// Express Session
app.use(
    session({
      secret: "purplemonkeydishwasher",
      resave: true,
      saveUninitialized: true,

    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
const apiRoutes = require("./routes/api-routes.js");
app.use("/api", apiRoutes);
// app.get("/", (req, res) => res.send("Howdy; auth res.send"));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

