import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
    <main className="App">
      <Outlet />
    </main>
    <Footer />
    </>
  );
}

export default Layout;