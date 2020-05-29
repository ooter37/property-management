require('dotenv').config()
const {SENDGRID_API_KEY } = process.env
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = {
  // singleEmail: async (req, res) => {
  //   try {
  //     const {to,subject,message} = req.body
  //     console.log('single',req.body)
  //     const msg = {
  //       to: to,
  //       from: 'dsl35@nau.edu',
  //       subject: subject,
  //       text: message,
  //     };
  //     const email = await sgMail.send(msg)
  //     res.status(200).send(email)
  //   } catch (error) {
  //     console.log('Error sending single email.', error)
  //     res.status(500).send(error)
  //   }
  // },
  sendEmail: async (req,res) => {
    try {
      const {to,subject,message} = req.body
      // console.log(req.body)
      // console.log(SENDGRID_API_KEY)
      const msg = {
        to: to,
        from: 'dsl35@nau.edu',
        subject: subject,
        text: message,
      };
      const email = await sgMail.send(msg)
      res.status(200).send(email)
    } catch (error) {
      console.log('Error sending email(s).', error)
      res.status(500).send(error)
    }
  }
}
