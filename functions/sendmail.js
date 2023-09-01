const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
exports.handler = async (event, context, callback) => {
    const data = JSON.parse(event.body)
    var email = "info@novationtech.co.za";
    if(data["Subject"].includes("LouwCooperRasool")){
        email = "info@louwcooper.co.za"
    }
    const body = Object.keys(data).map((k) => {
        return `${k}: ${data[k]}`
    }).join("<br><br>");
    const mail_to_send = {
        to: email,
        from: "info@novationtech.co.za",
        subject: 'New Entry from Website',
        html: body,
    };
    try {
        await sgMail.send(mail_to_send)
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
