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
  messageRoutes,
} = require("./routes/routes-index");
const accesslogs = require("./lib/middleware/accesslogs");
const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());
app.use(cookieParser(process.env.JWT_PRIVATE_KEY));

app.use("/member", accesslogs, memberRoutes);
app.use("/charity", accesslogs, charityRoutes);
app.use("/donation", accesslogs, donationRoutes);
app.use("/", accesslogs, messageRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on ${port}...`);
});


// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Models synchronized with database");
// });
