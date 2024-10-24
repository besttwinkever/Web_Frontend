import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import './assets/css/index.css'
import IssuesPage from './pages/IssuesPage'
import MainPage from './pages/MainPage'
import IssuePage from './pages/IssuePage'

import { ROUTES } from './modules/Routes'

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainPage></MainPage>
  },
  {
    path: ROUTES.ISSUES,
    element: <IssuesPage />
  },
  {
    path: `${ROUTES.ISSUES}/:id`,
    element: <IssuePage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)