import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'
import IssuesPage from './pages/IssuesPage'
import MainPage from './pages/MainPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage></MainPage>
  },
  {
    path: '/issues',
    element: <IssuesPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)