const express = require("express");

const app = express();

const server = app.listen(
  5001,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
process.on("unhandlesRejection", (err, promise) => {
  console.log(`Unhandles Rejection at:, promise, "Reason", err`.red);
});
