export default function sendEmail(
  toemail: string[],
  emailBody: string,
  subject: string
) {
  const params = {
    Source: "support",
    Destination: {
      ToAddresses: toemail,
    },
    ReplyToAddresses: ["support"],
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
