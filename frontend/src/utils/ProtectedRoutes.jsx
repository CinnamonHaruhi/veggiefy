import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ user }) => {
    const role_id = user.role_id;
    if (user === null || parseInt(role_id) !== 1) {
        return <Navigate to={"/login"}/>
    }

    return <Outlet/>;
}

export default ProtectedRoutes
