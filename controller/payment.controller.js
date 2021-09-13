var paypal = require('paypal-rest-sdk'); //
const SECRET_KEY = "sk_test_51I0TT8HjF02vcO1sT2TLp7lEvfl5pMUTqmP2TvM8BgXrxur8XmD4rSe5DVHDN63zXUketgJfk51rfwmYZqIveFRg00ORCMPmzj"; // payment stripe
const stripe = require("stripe")(SECRET_KEY);

// payment Stripe
const payMoneyStripe = async (req,res) =>{
    stripe.charges.create({
        amount: 2000,
        currency: 'USD',
        source: 'tok_mastercard',
        metadata: {'order_id': '6736'}
    })
    .then((charges)=>{
        res.send(charges)
    })
    .catch((err) =>{
        res.send(err)
    })
};
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'ASoOGTRYUC8YWPXfLeA9q-KG4m6aG0XmV7SOismiWHv72MTh0mvPEapDIqLLjnQqpEa_fCQpRB2dc_4U',
    'client_secret': 'ENGKXtoVVm4mcviwtkJ4H-EripcLnUdsxga1wjpCDfjbS6v6jtkK4bgHPbpR1bRjD7jlnZtXLhSY9WUG'
}); // payment paypal
// payment Paypal
const payMentPaypal = async(req,res) =>{
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://localhost:4000//success",
            "cancel_url": "https://localhost:4000//cancel"
        },
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "This is the payment description."
        }]
    };
    
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            //sau khi thành công sẽ chuyển tời đường link cho người dùng thanh toán như sau

            //     href: 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-2BG204548V0357134',
            //     rel: 'approval_url',
            //     method: 'REDIRECT'
        }
    });
};
// payment Momo



module.exports = {payMoneyStripe,payMentPaypal}