

export function sendMail(email,link){
    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 587, // Use port 465 for SSL
        secure: false,
        auth: {
            user: 'no-reply@miniwebx.com',
            pass: 'No@#341R'
        }
    });
    console.log(email)
    var mailOptions = {
        from: 'no-reply@miniwebx.com',
        to: email,
        subject: "Link of Digital Visting Card",
        body:`link of you Digital Visiting Card is ${link}`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}