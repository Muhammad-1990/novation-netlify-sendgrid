

exports.handler = async (event, context, callback) => {
   const nodemailer = require('nodemailer');
    const data = JSON.parse(event.body)
    const body = Object.keys(data).map((k) => {
        return `${k}: ${data[k]}`
    }).join("<br><br>");

    try {
       const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    auth: {
        user: 'info@louwcooper.co.za',
        pass: process.env.LCR_EMAIL_PASSWORD
    }
});

// send email
await transporter.sendMail({
    from: 'info@louwcooper.co.za',
    to: 'info@louwcooper.co.za',
    subject: 'New Entry from Website',
    text: body
});
       
   //   const transportOptions = {
    //        host: 'smtp.office365.com',
    //        port: '587',
    //        auth: { user: "info@louwcooper.co.za", pass: process.env.LCR_EMAIL_PASSWORD },
    //        secureConnection: true,
    //        tls: { ciphers: 'SSLv3' }
    //    };
    
    //    const mailTransport = nodemailer.createTransport(transportOptions);

     //   await mailTransport.sendMail({
    //        from: email,
     //       to: email,
     //       replyTo: email,
     //       subject: "New Entry from Website",
     //       html:"",
     //       text: "test"
      //  });
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
