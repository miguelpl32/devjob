const mongoose = require("mongoose");
require("./config/db");

const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const passport = require("./config/passport");

require("dotenv").config({ path: "variables.env" });

const app = express();

// habilitar leer los datos del formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Validacion de campos instalar esta version npm install express-validator@5.3.1
app.use(expressValidator());

//habilar handlebars como view
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "layout",
        helpers: require("./helpers/handlebars"),
    })
);

app.set("view engine", "handlebars");

// static files
app.use(express.static(path.join(__dirname, "public")));

// Acceder  a la configuracion cookies y sesion
app.use(cookieParser());

app.use(
    session({
        secret: process.env.SECRETO,
        key: process.env.KEY,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DATABASE }),
    })
);

// Inicializar passport
app.use(passport.initialize());
app.use(passport.session());

// Alertas y flash messages
app.use(flash());

// Crear nuestro middleware
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    next();
});

app.use("/", router());

app.listen(process.env.PUERTO);
