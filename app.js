//Create server Express
const express = require('express');

const app = express();

app.listen(process.env.PORT, () => {
    console.log('Movies API running!');
})
