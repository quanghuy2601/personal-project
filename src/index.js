const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan('common'));
app.use(cookieParser());
app.use(express.json());

app.get('/hello', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});
