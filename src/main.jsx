import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './views/Home.jsx'
import Profile from './views/Profile.jsx'
import Post from './views/Post.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/posts/:postId" element={<Post />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
