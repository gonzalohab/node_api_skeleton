require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
});
