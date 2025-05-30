import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Router from '../router/index'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return <RouterProvider router={Router}/>
}

export default App
