import Sidebar from "./Sidebar";
import MainContent from "../../modules/MainContent";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-layout">
      <Sidebar />

      <div className="flex flex-col pb-16 overflow-hidden lg:col-start-2 lg:col-end-3">
        <AdminNavbar />
        <div className="wrapper lg:px-10">
          <MainContent>{children}</MainContent>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
