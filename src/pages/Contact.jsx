import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MessageSquare, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // **IMPORTANT**: Replace this URL with your actual deployed Cloudflare Worker URL
    const WORKER_URL = "https://portfolio-contact-api.your-username.workers.dev";
    
    // For development/demonstration before full worker deploy, we mock the success
    if (WORKER_URL.includes("your-username")) {
      setTimeout(() => setStatus('success'), 1500);
      return;
    }

    try {
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.error || "Network error. Please try again.");
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-full w-full pt-28 pb-20 px-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 z-10 relative"
    >
      <div className="flex-1">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">Let's Connect</h2>
        <p className="text-lg text-zinc-700 dark:text-zinc-300 font-light max-w-md mb-8">
          Whether you have a question about infrastructure, a potential project, or just want to say hi, feel free to drop a message.
        </p>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-zinc-700 dark:text-zinc-300">
            <div className="p-3 bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700/50 rounded-full">
              <Mail className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="font-medium text-zinc-900 dark:text-white">Email</p>
              <p className="text-sm">Reach out via LinkedIn or use the form safely.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-zinc-700 dark:text-zinc-300">
            <div className="p-3 bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700/50 rounded-full">
              <MessageSquare className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <p className="font-medium text-zinc-900 dark:text-white">Social</p>
              <a href="https://www.linkedin.com/in/vigneshwaranvic/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors">linkedin.com/in/vigneshwaranvic</a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        <form 
          onSubmit={handleSubmit}
          className="glass-panel p-6 md:p-8 flex flex-col gap-5 relative overflow-hidden"
        >
          <AnimatePresence>
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 bg-white/90 dark:bg-zinc-900/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center rounded-2xl"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6 font-light">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                <button 
                  type="button" 
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 font-medium transition-colors"
                >
                  Send Another
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Full Name</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              value={formData.name}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
              className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white/50 dark:bg-zinc-800/80 text-zinc-900 dark:text-white focus:bg-white dark:focus:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500 disabled:opacity-50"
              placeholder="John Doe"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Email Address</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
              className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white/50 dark:bg-zinc-800/80 text-zinc-900 dark:text-white focus:bg-white dark:focus:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500 disabled:opacity-50"
              placeholder="john@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Message</label>
            <textarea 
              name="message" 
              id="message" 
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              disabled={status === 'loading'}
              className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white/50 dark:bg-zinc-800/80 text-zinc-900 dark:text-white focus:bg-white dark:focus:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 disabled:opacity-50"
              placeholder="How can I help you?"
            ></textarea>
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-500/10 p-3 rounded-lg border border-red-100 dark:border-red-500/20">
              <AlertCircle size={16} />
              <span>{errorMessage || "Failed to send message."}</span>
            </div>
          )}

          <button 
            type="submit"
            disabled={status === 'loading'}
            className="mt-2 w-full px-6 py-3 rounded-xl bg-zinc-900 dark:bg-blue-600 text-white font-medium hover:bg-zinc-800 dark:hover:bg-blue-500 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-zinc-900/20 dark:shadow-black/40 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending securely...
              </>
            ) : (
              <>
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
          
          <p className="text-xs text-center text-zinc-500 dark:text-zinc-400 mt-2">
            Messages are securely encrypted and routed through a private Cloudflare Edge Worker.
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;
