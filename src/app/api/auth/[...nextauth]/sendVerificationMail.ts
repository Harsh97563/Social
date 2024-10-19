import nodemailer  from 'nodemailer';
interface sendVerificationCode {
    email: string,
    verificationCode: number
}

export async function sendVerificationMail({email, verificationCode}: sendVerificationCode) {

    const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        } 
    });

    const mailOption = {
        from: 'streakified@gmail.com',
        to: email,
        subject: "Verify your email address.",
        text: `Enter the following verification code to verify. ${verificationCode}`,
        html: `<div
      style="
        width: 100vw;
        height: 100vh;
        background-color: #0b8494;
        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
        color: white;
      "
    >
      <h1>Enter this code to verify.</h1>
      <div style="width: fit-content;
        background-color: #e9c46a;
        padding: 10px 20px;
        font-size: 30px;
        border: 2px solid black;
        box-shadow: 4px 4px 0px rgba(0, 0, 0, 1);
        margin-top: 20px;
        color: black;"
        >${verificationCode}</div>
    </div>`
    }

    await transporter.sendMail(mailOption);
}