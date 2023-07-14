export const addUser = async (user: User) => {
  const url = '/api/user/addUser'
  const data = {
    user: user,
  }
  debugger
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  debugger

  return response
}
