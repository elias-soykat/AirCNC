const router = require('express').Router();

router.use('/users', require('./users.route'));

// ------- YOU CAN EXTEND ANY ROUTE FROM BELLOW ------
// router.use("/api/v2/users", require("./users.route"));
// router.use("/api/v2/profiles", require("./profiles.route"));

module.exports = router;
