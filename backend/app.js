const express = require('express');
const cors = require('cors')
require('dotenv/config')

const app = express();

const CORSOptions ={
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(CORSOptions));
app.use(express.json());

const PORT = process.env.PORT || 3000;

const userRouter = require('./routes/Users')

app.get('/', (req, res) => {
    res.status(200).send("<h1>Welcome!</h1>");
});

app.use('/Users', userRouter);

app.listen(PORT, () => {
    console.log(`server listening at http://localhost:${PORT}`);
});