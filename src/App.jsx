import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Contact from './pages/Contact';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col w-full overflow-hidden absolute inset-0">
      <Navbar />
      <main className="flex-1 w-full relative h-full">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
