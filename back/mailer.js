const nodemailer = require("nodemailer")

const sendEmail = (email_to, email_subject, email_text, email_attachments) => {    
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_SMTP, // adresse smtp, Renseigné dans le .env
        port: process.env.MAIL_PORT, // port, Renseigné dans le .env
        secure: false, // Variable a passer a true si le port utilisé est le 465, Renseigné dans le .env
        auth: {
            user: process.env.MAIL_USER, // Nom d'utilisateur du compte mail. Renseigné dans le .env
            pass: process.env.MAIL_PASSWORD, // Mot de passe du compte mail. Renseigné dans le .env
        },
        })
    
    let mailOption = {
        from: process.env.MAIL_FROM, // adresse email d'envoi
        to: email_to, // Destinataire
        subject: email_subject, // Objet
        text: email_text, // Corps
        attachments: email_attachments // Pièce Jointe
    }
    //fonction d'envoi du mail
    transporter.sendMail(mailOption, (error, info) => {
        if(error) {
            console.log(error)
            return error
        }
        return info
    })

}
module.exports = sendEmail;