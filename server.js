const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

// var corsOptions = {
//   origin: "http://localhost:3000"
// };


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}

// parse requests of content-type - application/form-data
//app.use(bodyParser.json);
//app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to konteks." });
});


require("./app/routes/user.routes")(app);
require("./app/routes/usercampaign.routes")(app);
require("./app/routes/campaignuser.routes")(app);
require("./app/routes/campaign.routes")(app);
require("./app/routes/campaignnews.routes")(app);
require("./app/routes/news.routes")(app);
require("./app/routes/newscampaign.routes")(app);
require("./app/routes/rule.routes")(app);
require("./app/routes/campaignusermessage.routes")(app);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});