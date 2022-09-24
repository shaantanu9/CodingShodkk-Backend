// connect to the main route
const userRoutes = require("./users.Routes");
const orderRoutes = require("./order.Routes");
const bookmarkRoutes = require("./bookmark.Routes");
// middleware to each main route

module.exports = {
  userRoutes,
  orderRoutes,
  bookmarkRoutes,
};
