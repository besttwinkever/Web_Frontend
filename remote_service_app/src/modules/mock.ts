import { IResult } from "./serviceApi";

function convertPathToAbsolute(path: string) {
    let absolutePath = '/Web_Frontend'
    return absolutePath + path
}

export const ISSUES_MOCK: IResult = {
    active_appeal: {
        id: 0,
        count: 0
    },
    issues: [
        {
            id: 2,
            name: "Неисправность компьютера",
            description: "Компьютер не включается, зависает или работает с перебоями. Требуется диагностика для выявления аппаратных или программных проблем, которые могут включать перегрев, сбой компонентов или конфликты программного обеспечения.",
            image: convertPathToAbsolute("/img/mock-issues/2.jpg")
        },
        {
            id: 3,
            name: "Сбой в установке программы",
            description: "Во время установки программного обеспечения возникают ошибки, или программа после установки не работает корректно. Это может быть связано с несовместимостью ПО, нехваткой системных ресурсов или конфликтом с другими установленными приложениями.",
            image: convertPathToAbsolute("/img/mock-issues/3.jpg")
        },
        {
            id: 4,
            name: "Обнаружение вредоносного ПО",
            description: "На устройстве обнаружены вирусы, трояны, рекламное ПО или другие вредоносные программы, которые могут угрожать безопасности данных или замедлять работу системы. Необходима услуга по их удалению и защите системы.",
            image: convertPathToAbsolute("/img/mock-issues/4.jpg")
        }
    ]
}