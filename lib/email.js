var nodemailer = require('nodemailer');

module.exports = function(options) {
  if (!options) return null;
  return new MailSender(options);
};

function MailSender (options) {
  if (!(this instanceof MailSender)) return new MailSender(options);
  this.options = options;
  this._smtpTransport = nodemailer.createTransport(this.options);
}

MailSender.prototype.send = function(options, body, cb) {
  var mailOptions = {
    from: options.from,
    replyTo: options.replyTo,
    to: options.to,
    subject: options.subject,
    html: body,
    generateTextFromHTML: true
  };
  console.log('event=sendHtmlEmail reply=%s', mailOptions.to);
  this._smtpTransport.sendMail(mailOptions, function(error, response){
    if (error) {
      console.log('event=smtpError message=%s', error.message);
      cb(error);
    } else {
      console.log('event=smtpSuccess sent: %s', response.message);
      cb(null, response);
    }
  });
};
