
const express = require("express");
const router = express.Router();
const authRouter = require("./auth.routes");
const catRouter = require("./categories.routes");

/** Middleware => We use all auth routes  */

router.use( '/auth', authRouter );
router.use( '/category', catRouter );

/** Middleware => When no routes found. */

router.use((req,res) => {
    res.status(404).json({
        error: {
            message: "Invalid request.",
            status: false,
            statusCode: 404
        }
    })
});

module.exports = router;