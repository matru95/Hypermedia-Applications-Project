const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sqlDbFactory = require("knex");
const process = require("process");
let sqlDb;

/* Init DB with SqLite3 OR PostgreSQL */
function initSqlDB() {
  //process.env.TEST = true;
  if (process.env.TEST) {
    sqlDb = sqlDbFactory({
      client: "sqlite3"
      , debug: true
      , connection: {
        filename: "./database.sqlite"
      }
      , useNullAsDefault: true
    });
  }
  else {
    sqlDb = sqlDbFactory({
      debug: true
      , client: "pg"
      , connection: process.env.DATABASE_URL
      , ssl: true
    });
  }
}

/* Initialize locations on DB from json*/
function initLocations() {
  return sqlDb.schema.hasTable("locations").then(exists => {
    if (!exists) {
      sqlDb.schema.createTable("locations", table => {
        table.increments();
        table.text("name");
        table.text("address");
        table.string("cap");
        table.string("city");
        table.string("phone");
        table.text("openingdays");
        table.text("openingtime");
        table.string("services");
        table.text("map");
      }).then(() => {
        return Promise.all(_.map(locationsList, l => {
          return sqlDb("locations").insert(l);
        }));
      });
    }
    else {
      return true;
    }
  });
}

/* Initialize doctors on DB from json*/
function initDoctors() {
  return sqlDb.schema.hasTable("doctors").then(exists => {
    if (!exists) {
      sqlDb.schema.createTable("doctors", table => {
        table.increments();
        table.string("name");
        table.string("surname");
        table.string("email");
        table.string("phone");
        table.string("cv");
        table.string("location");
        table.string("picture");
        table.string("service");
        table.string("isResponsible");
      }).then(() => {
        return Promise.all(_.map(doctorsList, d => {
          return sqlDb("doctors").insert(d);
        }));
      });
    }
    else {
      return true;
    }
  });
}

/* Initialize services on DB from json*/
function initServices() {
  return sqlDb.schema.hasTable("services").then(exists => {
    if (!exists) {
      sqlDb.schema.createTable("services", table => {
        table.increments();
        table.string("name");
        table.string("extname");
        table.string("picture");
        table.text("title");
        table.text("description");
        table.text("doctors");
      }).then(() => {
        return Promise.all(_.map(servicesList, d => {
          return sqlDb("services").insert(d);
        }));
      });
    }
    else {
      return true;
    }
  });
}

const _ = require("lodash");
let serverPort = process.env.PORT || 5000;
let locationsList = require("./jsons/locations.json");
let doctorsList = require("./jsons/doctors.json");
let servicesList = require("./jsons/services.json");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/* Register REST entry point */

/* REST's GET for the locations (as json) */
app.get("/locations", function (req, res) {
  let myData = sqlDb("locations");
  let myQuery = req.query;
  myData.where(myQuery).then(result => {
    res.json(result);
  });
});

/* REST's GET for the doctors (as json) */
app.get("/doctors", function (req, res) {
  let myData = sqlDb("doctors");
  let myQuery = req.query;
  myData.where(myQuery).then(result => {
    res.json(result);
  });
});

/* REST's GET for the doctors (as json) */
app.get("/services", function (req, res) {
  let myData = sqlDb("services");
  let myQuery = req.query;
  myData.where(myQuery).then(result => {
    res.json(result);
  });
});

app.set("port", serverPort);
initSqlDB();
initLocations();
initDoctors();
initServices();

/* Start the server on port 3000 */
app.listen(serverPort, function () {
  console.log(`Your app is ready at port ${serverPort}`);
});