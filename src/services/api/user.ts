export const addUser = async (user: User) => {
  const url = '/api/user/addUser'
  const data = {
    user: user,
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response
}
