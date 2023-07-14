import { NextApiRequest, NextApiResponse } from 'next'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../../firebase/config'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    const user = request.body.user

    const userRef = await addDoc(collection(db, 'users'), {
      data: user,
    })

    response.status(200).json({ userRef })
  } catch (error) {
    response.status(500).json({ message: `Error sending email message ${error}` })
  }
}
