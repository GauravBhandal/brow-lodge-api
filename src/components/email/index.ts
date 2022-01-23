import SES from "aws-sdk/clients/ses";

import config from "../../config/environment";

const region = config.AWS_REGION;
const accessKeyId = config.AWS_ACCESS_KEY;
const secretAccessKey = config.AWS_SECRET_KEY;

// Amazon SES configuration
const SESConfig = {
  apiVersion: "2022-01-20",
  accessKeyId,
  secretAccessKey,
  region,
};

const ses = new SES(SESConfig);

export default function sendEmail(toemail: string, emailBody: string) {
  const params = {
    Source: "pavi@carediary.com.au", // TODO: Update the source email
    Destination: {
      ToAddresses: [toemail],
    },
    ReplyToAddresses: ["pavi@carediary.com.au"],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailBody,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Reset your Care Diary password",
      },
    },
  };

  return ses.sendEmail(params).promise();
}
