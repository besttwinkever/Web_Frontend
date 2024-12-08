export const ROUTES = {
    HOME: '/',
    ISSUES: '/issues',
    LOGIN: '/login',
    REGISTER: '/register',
    APPEALS: '/appeals',
    APPEAL: '/appeal',
    PROFILE: '/profile'
}

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: 'Главная',
    ISSUES: 'Неисправности',
    LOGIN: 'Аутентификация',
    REGISTER: 'Регистрация',
    APPEALS: 'Жалобы',
    APPEAL: 'Жалоба',
    PROFILE: 'Профиль'
  };