export const getFeedbacksIndex = async () => {
  const query = await fetch("http://localhost:3001/feedbacks")
  console.log(query)
  const res = await query.json()
  console.log(res)
  return res
  // return res
}