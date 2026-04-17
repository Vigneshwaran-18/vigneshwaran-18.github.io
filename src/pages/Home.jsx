import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Scene3D from '../components/Scene3D';
import TerminalSplash from '../components/TerminalSplash';
import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('terminal_unlocked') === 'true';
  });

  const handleUnlock = () => {
    sessionStorage.setItem('terminal_unlocked', 'true');
    setIsUnlocked(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full relative flex items-center justify-center pt-20"
    >
      <AnimatePresence>
        {!isUnlocked && <TerminalSplash key="terminal" onUnlock={handleUnlock} />}
      </AnimatePresence>
      
      <Scene3D />
      
      <div className="z-10 text-center px-6 max-w-3xl flex flex-col items-center">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-zinc-800/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-600 text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-6 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Available for new opportunities
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 drop-shadow-sm dark:drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
        >
          I'm <span className="pt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Vic</span>.
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-zinc-700 dark:text-zinc-200 mb-10 max-w-2xl leading-relaxed font-light drop-shadow-sm dark:drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] bg-white/30 dark:bg-black/30 p-4 rounded-xl backdrop-blur-sm shadow-sm border border-white/20 dark:border-zinc-800/50"
        >
          Helping businesses build and scale using modern technology. I specialize in building secure infrastructure, writing robust software, and navigating everything from the CDN edge to the transport layer.
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link to="/experience" className="px-6 py-3 rounded-xl bg-zinc-900 dark:bg-blue-600 text-white font-medium hover:bg-zinc-800 dark:hover:bg-blue-500 transition-colors flex items-center gap-2 group w-full sm:w-auto shadow-lg shadow-zinc-900/20 dark:shadow-black/40">
            View My Experience
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white" />
          </Link>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <a href="https://www.linkedin.com/in/vigneshwaranvic/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-zinc-200 dark:border-zinc-600 backdrop-blur-sm shadow-sm group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://github.com/vigneshwaran-18" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-colors border border-zinc-200 dark:border-zinc-600 backdrop-blur-sm shadow-sm group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </a>
            <Link to="/contact" className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border border-zinc-200 dark:border-zinc-600 backdrop-blur-sm shadow-sm group">
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
