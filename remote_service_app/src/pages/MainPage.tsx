import { FC } from 'react'
import { Link } from "react-router-dom";

import ServiceNavbar from '../components/ServiceNavbar'
import { Button } from 'react-bootstrap'
import { ROUTES } from "../modules/Routes";


const MainPage: FC = () => {

    return (
        <>
            <ServiceNavbar></ServiceNavbar>
            <div className='container d-flex flex-column justify-content-center mt-5 border shadow shadow-bg p-3 w-50'>
                <h3 className='text-uppercase text-center'>Сервис удаленной поддержки</h3>
                <div className='d-flex flex-column mt-4'>
                    <p>Удаленная поддержка – это подключение через интернет специалиста к персональному компьютеру, ноутбуку, ультрабуку, нетбуку, в ходе которого возможно решение целого ряда технических проблем.</p>
                    <p>Сотрудник поддержки и обслуживаемое им рабочее место могут находиться в абсолютно разных местах, на расстоянии многих километров. Чтобы переустановить систему, очистить компьютер от вирусов, настроить работу периферийного оборудования специалисту нет необходимости тратить время на дорогу. Многие задачи вполне могут быть решены удаленно, в режиме онлайн.</p>
                    <Link className='align-self-center' to={ROUTES.ISSUES}>
                        <Button variant='outline-danger w-100 mt-3'>К видам происшествий</Button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default MainPage