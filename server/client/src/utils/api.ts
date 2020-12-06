import { FeedbackType } from "../pages/Feedback"
export const getFeedbacksIndex = async () => {
  const query = await fetch("http://localhost:3001/feedbacks")
  console.log(query)
  const res = await query.json()
  console.log(res)
  return res
  // return res
}

export const sendFeedack = async (values: FeedbackType) => {
  const {lastName, firstName, email, content} = values
  const data = {
    info: {lastname: lastName, firstname: firstName, email: email},
    message: {content: content}
  }
  const query = await fetch("http://localhost:3001/feedbacks/new", {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({...data})
  })
  const res = await query.json()
  return res
}