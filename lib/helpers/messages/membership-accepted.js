const sendEmail = require("../sendmail");

async function sendApplicationAccepted({ email, firstName }) {
  const message = `
   <div> 
     <p>Dear ${firstName},</p>
     <p>
       Your membership form has been accepted ,welcome to the team 
     </p>
     <br>
     <br>
     <p>PBB</p>
   </div>`;
  return sendEmail({
    to: email,
    subject: "Application accepted",
    html: message,
  });
}
module.exports.sendApplicationAccepted = sendApplicationAccepted;
