import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Skills from "./pages/Skills.jsx";
import Services from "./pages/Services.jsx";
import Projects from "./pages/Projects.jsx";
import Experience from "./pages/Experience.jsx";
import Contact from "./pages/Contact.jsx";

import Navbar from "./components/Navbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { useDarkMode } from "./hooks/useDarkMode.js";

export default function App() {
  const { isDark, toggleTheme } = useDarkMode();

  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-50 text-zinc-900 antialiased dark:bg-[#09090b] dark:text-zinc-100">
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ScrollToTop />
    </div>
  );
}
