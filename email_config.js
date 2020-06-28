const nodemailer = require('nodemailer');

const cocovoitMail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cocovoitevry@gmail.com',
        pass: '*******'
    }
});

var mailOptions = {
    from: 'cocovoitevry@gmail.com',
    to: "",
    subject: "CocoVoit - Réponse - Candidature",
    text: "",
};

module.exports = cocovoitMail;
module.exports = mailOptions;
