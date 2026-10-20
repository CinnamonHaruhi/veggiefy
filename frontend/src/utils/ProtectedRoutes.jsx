import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ user }) => {
    if (parseInt(user.user.role_id) !== 1 || user === null) {
        return <Navigate to={"/login"}/>
    }

    return <Outlet/>;
}

export default ProtectedRoutes
