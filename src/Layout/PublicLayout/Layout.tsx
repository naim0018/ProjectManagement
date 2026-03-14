import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
