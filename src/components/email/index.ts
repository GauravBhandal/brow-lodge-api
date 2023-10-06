export default function sendEmail(toemail: string[], emailBody: string, subject: string) {
  const params = {
    Source: "support@carediary.com.au",
    Destination: {
      ToAddresses: toemail,
    },
    ReplyToAddresses: ["support@carediary.com.au"],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailBody,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
  };

  return null;
}


