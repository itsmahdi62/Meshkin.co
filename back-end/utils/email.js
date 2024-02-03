const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Mahdi Almasi <${process.env.Email_FROMM}>`;
  }
  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return 1;
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  // Send the actual Email
  async send(template, subject) {
    // 1)  Render Html
    const html = pug.renderFile(`${__dirname}/..views/emails/${template.pug}`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: options.to,
      subject,
      html,
      text: htmlToText.fromString(html),
      // html: options.
    };
    await this.newTransport().sendMail(mailOptions);
  }
  async sendWelcome() {
   await this.send("Welcome", "Welcome to the Meshkin family !");
  }
};

// new Email(user, url).sendWelcome();
