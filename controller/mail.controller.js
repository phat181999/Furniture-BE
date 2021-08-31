var nodemailer =  require('nodemailer'); 
const sendEmail =  (req, res, next) => {
    const {user} = req;
    var transporter =  nodemailer.createTransport({ // config mail server
        service: 'Gmail',
        auth: {
            user: `${user.email}`,
            pass: `${user.password}`
        }
    });
    console.log(transporter,"transporter")
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: `${user.email}`,
        to: 'hotanphat.htp99@gmail.com',
        subject: `${user.name}`,
        text: 'test',  
    }
    console.log(mainOptions,"mainOptions");
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            console.log('Message sent: ' +  info.response);
            res.redirect('/');
        }
    });
};

module.exports = {sendEmail}