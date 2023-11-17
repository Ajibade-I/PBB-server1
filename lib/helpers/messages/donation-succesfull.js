const sendEmail = require("../sendmail");

async function sendSuccessfulDonation({ email, firstName }) {
  const message = `
   <div> 
     <p>Dear ${firstName},</p>
     <p>
       Your donation has been received thank you very much for your patronage 
     </p>
     <br>
     <br>
     <p>PBB</p>
   </div>`;
  return sendEmail({
    to: email,
    subject: "Donation succesfull",
    html: message,
  });
}
module.exports.sendSuccessfulDonation = sendSuccessfulDonation;
