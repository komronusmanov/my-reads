import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import './index.css'

ReactDOM.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>,
   document.getElementById('root'))
