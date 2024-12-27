import { useSelector } from "react-redux";
import IsAdmin from "../utils/Isadmin";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const AdminPermisson = ({ children }) => {
  const user = useSelector((state) => state.user);
  return (
    <>
      {IsAdmin(user.role) ? (
        children
      ) : (
        <Navigate to="/dashboard/profile" replace />
      )}
    </>
  );
};

AdminPermisson.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminPermisson;
