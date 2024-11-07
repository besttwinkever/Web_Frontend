import { BrowserRouter, Route, Routes } from "react-router-dom";

import './assets/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import IssuesPage from './pages/IssuesPage'
import MainPage from './pages/MainPage'
import IssuePage from './pages/IssuePage'

import { ROUTES } from './modules/Routes'

function App() {

    return (
      <BrowserRouter basename="/">
        <Routes>
          <Route path={ROUTES.HOME} index element={<MainPage />} />
          <Route path={ROUTES.ISSUES} element={<IssuesPage />} />
          <Route path={ROUTES.ISSUES + "/:id"} element={<IssuePage />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default App;