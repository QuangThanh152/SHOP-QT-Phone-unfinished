import { useSelector } from "react-redux";

// Show trạng thái khi Login
const ShowOnLogin = ({ children  }) => {
    const { isLoggedIn } = useSelector(
        (state) => state.auth
    );
    if (isLoggedIn) {
        return children 
    }
    return null;
};

// Show trạng thái khi Logout
export const ShowOnLogout = ({ children  }) => {
    const { isLoggedIn } = useSelector(
        (state) => state.auth
    );
    if (!isLoggedIn) {
        return children 
    }
    return null;
};

export default ShowOnLogin;