const express = require('express');
const EmailRouter = express.Router();
const { sendEmail } = require('../controller/mail.controller');
const { authenticate } = require("../middlewares/Authenticate/authenticate");

EmailRouter.post('/end-email',authenticate,sendEmail);

module.exports = { EmailRouter }