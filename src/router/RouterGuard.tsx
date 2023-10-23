import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const RouterGuard = ({ allowedRoles }: { allowedRoles?: number[] }) => {
  const { auth } = useAuth()
  const location = useLocation()
  const newRoles = sessionStorage.length === 0 ? [] : auth.roles
  const newToken = sessionStorage.length === 0 ? '' : auth?.token


  return (
    newRoles?.find(role => allowedRoles?.includes(role)) ? <Outlet />
      : newToken
        ? <Outlet />
        : <Navigate to="/" state={{ from: location.pathname }} replace />
  )
}