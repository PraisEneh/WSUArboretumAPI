require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT;
// 1-293 is the index range for the trees

// Custom middleware for logging events
app.use(logger);

app.use(cors());

app.use(cookieParser());

// middleware for form data
app.use(express.urlencoded({ extended: false }));

// middleware for json data
app.use(express.json());

app.use('/tree', require('./routes/tree'));

app.get('/help', (req, res) => {
    res.redirect('https://github.com/PraisEneh/WSUArboretumAPI')
})

app.get('/', (req, res) => {
    res.send(process.env.SECRET_MESSAGE)
});

// If route doesn't exist
app.use(errorHandler);

app.listen(PORT, () => {console.log(`Listening on port ${PORT}`);});