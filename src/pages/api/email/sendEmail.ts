import { NextApiRequest, NextApiResponse } from 'next'

let postmark = require('postmark')
let client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN)

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    console.log('API email')
    client.sendEmail({
      From: 'derb@recklesslabs.co',
      To: request.body.toEmail,
      Subject: request.body.subjectEmail,
      HtmlBody: request.body.bodyEmail,
    })

    response.status(200).json({ message: `Email message sent to ${request.body.toEmail}` })
  } catch (error) {
    response.status(500).json({ message: `Error sending email message ${error}` })
  }
}
