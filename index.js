const express = require("express"); // require express
const app = express(); // create express app
const connect = require("./config/db"); // require database connection
app.use(express.json()); // parse requests of content-type - application/json

const { userRoutes, orderRoutes, bookmarkRoutes } = require("./routes");

// cors is a middleware to allow cross origin resource sharing
const cors = require("cors");
app.use(cors());

// middleware to each main route
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
app.use("/bookmarks", bookmarkRoutes);

// app.listen is a method to start the server
app.listen(3000, async () => {
  await connect();
  console.log("Server is running on port 3000");
});
