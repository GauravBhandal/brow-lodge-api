import config from "../../config/environment";

export const getTemplateContent = (
  title: string,
  subtitle: string,
  contentArray: { label: string; value: string }[],
  url: string,
  name: string,
  isExpiry: boolean = false
) => {
  const getContent = (contentList: { label: string; value: string }[]) => {
    const result: string[] = contentList.map(
      (content) => `<tr>
        <td width="30%" align="left" valign="top" style="font-size: 14px; font-weight: 400; line-height: 130%; border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
        padding-top: 10px;
        color: #000000;
        text-transform: capitalize;
        font-family: sans-serif;" class="paragraph">
        <b style="color: #333333;">
                    ${content.label}</b>
            </td>
            <td width="70%" align="left" valign="top" style="font-size: 14px; font-weight: 400; line-height: 130%; border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
            padding-top: 10px;color: #000000;font-family: sans-serif;" class="paragraph">
                ${content.value}
            </td>
        </tr>`
    );
    const finalDataString = result.reduce(
      (prevVal, curVal) => `${prevVal}${curVal}`,
      ""
    );
    return finalDataString;
  };

  const getRenderUrl = (url: string) => `${config.BASE_URL}${url}`;

  return `<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0;">
    <meta name="format-detection" content="telephone=no" />
    <!-- Responsive Mobile-First Email Template by Konstantin Savchenko, 2015.
         https://github.com/konsav/email-templates/  -->
   <link href='https://fonts.googleapis.com/css?family=Fredoka One' rel='stylesheet'>
    <style>
        /* Reset styles */
        body {
            margin: 0;
            padding: 0;
            min-width: 100%;
            width: 100% !important;
            height: 100% !important;
        }

        body,
        table,
        td,
        div,
        p,
        a {
            -webkit-font-smoothing: antialiased;
            text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            line-height: 100%;
        }

        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse !important;
            border-spacing: 0;
        }

        img {
            border: 0;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        #outlook a {
            padding: 0;
        }

        .ReadMsgBody {
            width: 100%;
        }

        .ExternalClass {
            width: 100%;
        }

        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
            line-height: 100%;
        }

        /* Rounded corners for advanced mail clients only */
        @media all and (min-width: 560px) {
            .container {
                border-radius: 8px;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                -khtml-border-radius: 8px;
            }
        }

        /* Set color for auto links (addresses, dates, etc.) */
        a,
        a:hover {
            color: #127DB3;
        }

        .footer a,
        .footer a:hover {
            color: #999999;
        }
    </style>
    <!-- MESSAGE SUBJECT -->
    <title></title>
</head>
<!-- BODY -->
<!-- Set message background color (twice) and text color (twice) -->

<body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
      background-color: #F0F0F0;
      color: #000000; padding-top:50px;" bgcolor="#F0F0F0" text="#000000">
    <!-- SECTION / BACKGROUND -->
    <!-- Set message background color one again -->
    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0"
        style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background">
        <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;"
                bgcolor="#F0F0F0">
                <!-- WRAPPER / CONTEINER -->
                <!-- Set conteiner background color -->
                <table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#FFFFFF" width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
                  max-width: 560px;" class="container">
                    <!-- HEADER -->
                    <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
                    <tr>
                    <td align="center" valign="top"
                                            style="padding-top: 20px; padding-bottom: 20px; background-color:#017eff;"
                                            class="header">
                        <a target="_blank" style="text-decoration: none;"
                                href=${config.BASE_URL}>
                                <span
                                style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 28px; font-weight: bold; line-height: 130%;
                        color: #FFFFFF;
                        font-family: 'Fredoka One';"
                                >
                                Duty
                                </a>
                        </td>
                        </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 24px; font-weight: bold; line-height: 130%;
                        padding-top: 10px;
                        color: #000000;
                        font-family: sans-serif;" class="header">
                            ${title}
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 87.5%;
                        padding-top: 25px;" class="line">
                            <hr color="#dddddd" align="center" width="100%" size="1" noshade
                                style="margin: 0; padding: 0;" />
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
                        padding-top: 25px; 
                        color: #000000;
                        font-family: sans-serif; font-weight: 600" class="paragraph">
                            ${subtitle}
                        </td>
                    </tr>
                    <!-- LINE -->
                    <!-- Set line color -->
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                        padding-top: 25px;" class="line">
                            <hr color="#E0E0E0" align="center" width="100%" size="1" noshade
                                style="margin: 0; padding: 0;" />
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top"
                            style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%;"
                            class="list-item">
                            <table align="center" border="0" cellspacing="0" cellpadding="0"
                                style="width: 100%; margin: 0; padding: 0; border-collapse: collapse; border-spacing: 0;">
                                <!-- LIST ITEM -->
                                ${getContent(contentArray)}
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                        padding-top: 25px;
                        padding-bottom: 5px;" class="button">
                            <a href=${getRenderUrl(url)} target="_blank"
                                style="text-decoration: none;">
                                <table border="0" cellpadding="0" cellspacing="0" align="center"
                                    style="max-width: 240px; min-width: 80px; border-collapse: collapse; border-spacing: 0; padding: 0;">
                                    <tr>
                                        <td align="center" valign="middle"
                                            style="padding: 12px 12px; margin: 0; text-decoration: none; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
                                            bgcolor="#017eff">
                                            <a target="_blank"
                                                style="text-decoration: none;
                           color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 500; line-height: 120%;"
                                                href=${getRenderUrl(url)}>
                                                View
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </a>
                        </td>
                    </tr>
                    <!-- LINE -->
                    <!-- Set line color -->
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                        padding-top: 25px;" class="line">
                            <hr color="#E0E0E0" align="center" width="100%" size="1" noshade
                                style="margin: 0; padding: 0;" />
                        </td>
                    </tr>
                    <!-- PARAGRAPH -->
                    <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
                        padding-top: 20px;
                        padding-bottom: 25px;
                        color: #000000;
                        font-family: sans-serif;" class="paragraph">
                            Have a&nbsp;question? <a href="mailto:" target="_blank"
                                style="color: #127DB3; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 160%;">support</a>
                        </td>
                    </tr>
                    <!-- End of WRAPPER -->
                </table>
                <!-- WRAPPER -->
                <!-- Set wrapper width (twice) -->
                <table border="0" cellpadding="0" cellspacing="0" align="center" width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
                  max-width: 560px;" class="wrapper">
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 13px; font-weight: 400; line-height: 150%;
                        padding-top: 20px;
                        padding-bottom: 20px;
                        color: #999999;
                        font-family: sans-serif;" class="footer">
                            You have received this email because your email has been listed as recipient email for${
                              isExpiry ? "" : " every new"
                            } ${name} by the Duty admin.
                        </td>
                    </tr>
                    <!-- End of WRAPPER -->
                </table>
                <!-- End of SECTION / BACKGROUND -->
            </td>
        </tr>
    </table>
</body>

    </html>`;
};
