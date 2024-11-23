import { FC } from 'react'

import BasePage from './BasePage'

const MainPage: FC = () => {

    return (
        <BasePage>
            <div className='container d-flex flex-column justify-content-center mt-5 border shadow shadow-bg p-3 w-100'>
                <h3 className='text-uppercase text-center'>Сервис удаленной поддержки</h3>
                <div className='d-flex flex-column mt-4'>
                    <p>Удаленная поддержка – это подключение через интернет специалиста к персональному компьютеру, ноутбуку, ультрабуку, нетбуку, в ходе которого возможно решение целого ряда технических проблем.</p>
                    <p>Сотрудник поддержки и обслуживаемое им рабочее место могут находиться в абсолютно разных местах, на расстоянии многих километров. Чтобы переустановить систему, очистить компьютер от вирусов, настроить работу периферийного оборудования специалисту нет необходимости тратить время на дорогу. Многие задачи вполне могут быть решены удаленно, в режиме онлайн.</p>
                </div>
            </div>
        </BasePage>
    )
}

export default MainPage