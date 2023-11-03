require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const { errorHandler, notFound } = require("./lib/middleware/error-middleware");
const db = require("./models");
const {
  memberRoutes,
  charityRoutes,
  donationRoutes,
} = require("./routes/routes-index");
const app = express();
const port = 6000;

app.use(express.json());
app.use(cookieParser(process.env.JWT_PRIVATE_KEY));

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Models synchronized with database");
// });

app.use("/member", memberRoutes);
app.use("/charity", charityRoutes);
app.use("/donation", donationRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on ${port}...`);
});

//ignore the config file
