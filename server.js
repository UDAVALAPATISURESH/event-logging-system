const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/dbConfig');
const eventRoutes = require('./routes/eventRoutes');


connectDB();

const app = express();


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); 


app.use('/api', eventRoutes);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
