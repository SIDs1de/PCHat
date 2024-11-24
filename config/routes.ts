export const routes = {
  home: '/',
  donate: '/donate',
  feedback: '/feedback',
  about: '/about',
  profile: '/profile',
} as const

export type RouteKey = keyof typeof routes

export interface INavItem {
  key: RouteKey
  label: string
}
