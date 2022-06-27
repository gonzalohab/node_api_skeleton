require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8081;
const { validateJWT } = require('./middlewares/validateJWT');

const database = require('./config/db');

(async () => {
    await database.createTables();
})();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/healthcheck', validateJWT, (req, res) => {
    res.json({ msg: 'ok' });
});

app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
});
