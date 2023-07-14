export const sendEmail = async (toEmail: string, subjectEmail: string, bodyEmail: string) => {
  const url = '/api/email/sendEmail'
  const data = {
    toEmail: toEmail,
    subjectEmail: subjectEmail,
    bodyEmail: bodyEmail,
  }
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log('Error while sending email ', error)
    })
}
