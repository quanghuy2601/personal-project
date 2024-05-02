const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const authenticationRoute = require('./routes/authenticationRouter');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('common'));
app.use(cookieParser());
app.use(express.json());

app.use('/', express.static(path.join(__dirname + '/views')));

app.use('/api/v1/auth', authenticationRoute);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});
