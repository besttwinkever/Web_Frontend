import { BrowserRouter, Route, Routes } from "react-router-dom";

import './assets/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import IssuesPage from './pages/IssuesPage'
import MainPage from './pages/MainPage'
import IssuePage from './pages/IssuePage'
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPager";

import { ROUTES } from './modules/Routes'

function App() {
    return (
      <>
        <BrowserRouter basename="/Web_Frontend">
          <Routes>
            <Route path={ROUTES.HOME} index element={<MainPage />} />
            <Route path={ROUTES.ISSUES} element={<IssuesPage />} />
            <Route path={ROUTES.ISSUES + "/:id"} element={<IssuePage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
  
  export default App;