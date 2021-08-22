const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const app = express();
const { rootRouter } = require('./router/index');
var cors = require('cors');
app.use(cors());
app.use(express.json());
<<<<<<< HEAD
=======

>>>>>>> 3f183ba46d27e84b2b528799ae7f7f314f1cbcc9
// cài đặt static file
const publicPathDirectory = path.join(__dirname, "./public");
app.use("/public", express.static(publicPathDirectory));

app.use('/api', rootRouter);

app.listen(4000, async () =>
{
    console.log('suucess localhost:4000');
    try
    {
        await sequelize.authenticate();
        console.log('connect success');
    }
    catch (error)
    {
        console.log(('connect fail', error));
    }
})