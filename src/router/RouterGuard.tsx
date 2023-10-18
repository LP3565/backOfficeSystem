import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const RouterGuard = ({ allowedRoles }: { allowedRoles?: number[] }) => {
  const { auth } = useAuth()
  const location = useLocation()

  return (
    auth?.roles?.find(role => allowedRoles?.includes(role)) ? <Outlet />
      : auth.token
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location.pathname }} replace />
  )
}