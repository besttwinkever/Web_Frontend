export const ROUTES = {
    HOME: '/',
    ISSUES: '/issues'
}

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: 'Главная',
    ISSUES: 'Виды происшествий',
  };