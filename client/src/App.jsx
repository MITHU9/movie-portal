import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="">
      <Navbar />

      <main className="bg-gray-600">
        <div className="">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
