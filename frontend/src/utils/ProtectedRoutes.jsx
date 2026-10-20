import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ user }) => {
    if (user === null || parseInt(user.role_id) !== 1) {
        return <Navigate to={"/login"}/>
    }

    return <Outlet/>;
}

export default ProtectedRoutes
