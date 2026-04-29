import React from 'react'
import Navbar from './Navbar'

const RateLimitedUI = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="p-8 bg-red-50 text-red-600 rounded-lg shadow-md border border-red-200 text-center">
        <h2 className="text-2xl font-bold mb-2">Rate Limit Exceeded</h2>
        <p>You have made too many requests. Please try again later.</p>
      </div>
    </div>
  )
}

export default RateLimitedUI
