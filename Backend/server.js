require('dotenv').config();

const express =  require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const indexRoute = require("./routes/index.routes");
const { PORT } = require("./configurations/config");
const  { connectDB } = require('./configurations/dbconnection');

const initApp = async () => {

    try {

        /** Method => Connect with database. */
    
        await connectDB();
    
        /** Middleware => Make the "public" folder accessible */
    
        app.use(express.static('public'));
    
        /**  Middleware => Parse url-encoded and json data and append into request body. */
    
        app.use( express.urlencoded({ extended: true }) );
        app.use( express.json() );
    
        /** Middleware => Log the requests from client. */
    
        app.use( morgan('dev') );
    
        /** Middleware => Enable the cors for access the requests from other domains. */
    
        app.use( cors() );
    
        /** Middleware => Use all routes in index file  */
    
        app.use(indexRoute);
    
        /** Create and run the server. */
    
        app.listen( PORT, () => { 
            console.log(`Server is running on ${PORT} port.`) 
        });
    
    }
    catch(err) {
        console.log(`Error - ${err.message}`); 
        process.exit(1);
    }
}

/** Initialize App  */

initApp();





