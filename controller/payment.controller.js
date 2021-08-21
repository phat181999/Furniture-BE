
// const stripe = require("stripe")(SECRET_KEY);
const PUBLISHABLE_KEY = "pk_test_51I0TT8HjF02vcO1sn09k8ZYy3NdOil1vEuUW2xSJmwCDMIDktH4487DVzgt6sSsN3giGOvGx3GYkQDzxNPy6h3zc00i6NAuuoh";
const SECRET_KEY = "sk_test_51I0TT8HjF02vcO1sT2TLp7lEvfl5pMUTqmP2TvM8BgXrxur8XmD4rSe5DVHDN63zXUketgJfk51rfwmYZqIveFRg00ORCMPmzj";

const payMoney = async (req,res) =>{
    const {email} = req.body;
    const paymentIntent = await stripe.paymentIntent.create({
        amount: 5000,
        currency: 'usd',
        metadata: {integration_check: 'accept_a_payment'},
        receipt_email: email,
    });

    res.json({'client_secret': paymentIntent['client_secret']})
};

module.exports = {payMoney}