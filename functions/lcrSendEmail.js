const nodemailer = require('nodemailer');

exports.handler = async (event, context, callback) => {
    const data = JSON.parse(event.body)
    var email = "info@louwcooper.co.za";
    const body = Object.keys(data).map((k) => {
        return `${k}: ${data[k]}`
    }).join("<br><br>");

    try {
      const transportOptions = {
            host: 'smtp.office365.com',
            port: '587',
            auth: { user: "info@louwcooper.co.za", pass: process.env.LCR_EMAIL_PASSWORD },
            secureConnection: true,
            tls: { ciphers: 'SSLv3' }
        };
    
        const mailTransport = nodemailer.createTransport(transportOptions);
    
        await mailTransport.sendMail({
            from: email,
            to: email,
            replyTo: email,
            subject: "New Entry from Website",
            html:"",
            text: body
        });
      
        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: "Thank you. We have recieved your request and will be in touch soon."
        }
    } catch (e) {
        return {
            statusCode: e.code,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: e.message
        }
    }
};
