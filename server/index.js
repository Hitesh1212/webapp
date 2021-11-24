const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();

dotenv.config({ path: './config.env' });

require('./db/conn');

app.use(express.json());
app.use(cookieParser());
app.use(require('./router/auth'));


// server port
const PORT = process.env.PORT;

app.listen(PORT, ()=> {
    console.log(`server is running at ${PORT} `);
})
