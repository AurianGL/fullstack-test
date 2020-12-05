import React, { useEffect, useState } from 'react'
import { getFeedbacksIndex } from '../utils/api'

interface HomeProps {

}

type feedbacks = {
  content: string,
  id: string
  info: {
    email: string
  }
}[]

export const Home: React.FC<HomeProps> = () => {
  const [feedbacks, setFeedbacks] = useState<feedbacks>([])
  useEffect(() => {
    getFeedbacksIndex()
      .then(data =>{
        setFeedbacks(data)
      }) 
  }, [])

    return (
      <div  className='container mx-auto p-10 flex flex-col items-left '>
        <div className="text-left text-2xl p-5 max-w-3xl">
          <h1>Feedbacks from Middle Earth</h1>
        </div>
        {feedbacks.length > 0 && feedbacks.map((feedback) => 
         <div key={feedback.id} className="rounded bg-gray-600 mb-3 p-3 max-w-3xl">
            <div >
              {feedback.content}
            </div>
            <div className="text-pink-400 text-right">
              {feedback.info.email}
            </div>
         </div>
        )}
      </div>
    );
}