const sendEmail = require("../sendmail");

async function sendApplicationRejected({ email, firstName }) {
  const message = `
   <div> 
     <p>Dear ${firstName},</p>
     <p>
      We are sorry to inform you that you did not meet the requirements to become a memeber, feel free to apply again later 
     </p>
     <br>
     <br>
     <p>PBB</p>
   </div>`;
  return sendEmail({
    to: email,
    subject: "Application rejected",
    html: message,
  });
}
module.exports.sendApplicationRejected = sendApplicationRejected;
