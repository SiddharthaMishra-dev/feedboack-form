import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FeedbackForm from './components/Form'

function App() {
  return (
    <div className='form-container'>
    <h2 className='form-heading'>Feedback Form</h2>
     <FeedbackForm/>
    </div>
  )
}

export default App
