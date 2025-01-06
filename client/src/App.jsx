import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: true, // Ensure animation happens only once
  });
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
