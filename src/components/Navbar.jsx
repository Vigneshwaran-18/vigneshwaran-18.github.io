import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-center">
      <div className="glass-panel px-6 py-3 flex items-center justify-between w-full max-w-4xl">
        <Link to="/" className="font-bold text-xl tracking-tight text-zinc-900 group">
          VIC<span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">.</span>
        </Link>
        <div className="flex gap-4 md:gap-8 text-sm font-medium">
          {links.map((link) => (
            <Link key={link.path} to={link.path} className="relative group">
              <span className={`transition-colors duration-300 ${location.pathname === link.path ? 'text-blue-600' : 'text-zinc-500 hover:text-zinc-900'}`}>{link.name}</span>
              {location.pathname === link.path && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
