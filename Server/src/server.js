const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const renderError = require("./middlewere/renderError");
const { readdirSync } = require("fs");
require("dotenv/config");

//middlewere
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json({ limit: "2mb" }));
app.use(renderError);

//routes
readdirSync("./src/routes").map((r) =>
  app.use("/api", require("./routes/" + r))
);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server Is running in ${PORT}`));
