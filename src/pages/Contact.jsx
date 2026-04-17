import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [status, setStatus] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-full w-full pt-28 pb-20 px-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 z-10 relative"
    >
      <div className="flex-1">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">Let's Connect</h2>
        <p className="text-lg text-zinc-600 font-light max-w-md mb-8">
          Whether you have a question about infrastructure, a potential project, or just want to say hi, feel free to drop a message.
        </p>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-zinc-600">
            <div className="p-3 bg-white shadow-sm border border-zinc-100 rounded-full">
              <Mail className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="font-medium text-zinc-900">Email</p>
              <p className="text-sm">Reach out via LinkedIn or use the form.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-zinc-600">
            <div className="p-3 bg-white shadow-sm border border-zinc-100 rounded-full">
              <MessageSquare className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <p className="font-medium text-zinc-900">Social</p>
              <a href="https://www.linkedin.com/in/vigneshwaranvic/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-blue-600 transition-colors">linkedin.com/in/vigneshwaranvic</a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <form 
          action="https://formsubmit.co/YOUR_EMAIL_HERE@example.com" 
          method="POST"
          className="glass-panel p-6 md:p-8 flex flex-col gap-5"
        >
          {/* FormSubmit Configuration (Hidden) */}
          <input type="hidden" name="_subject" value="New Contact Form Submission from Portfolio!" />
          <input type="hidden" name="_captcha" value="false" />
          {/* Replace this with your URL later or remove to use FormSubmit default thanks page */}
          <input type="hidden" name="_next" value={window.location.href} />

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-zinc-700">Full Name</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              required
              className="px-4 py-3 rounded-xl border border-zinc-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-zinc-400"
              placeholder="John Doe"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-zinc-700">Email Address</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              required
              className="px-4 py-3 rounded-xl border border-zinc-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-zinc-400"
              placeholder="john@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-zinc-700">Message</label>
            <textarea 
              name="message" 
              id="message" 
              rows={4}
              required
              className="px-4 py-3 rounded-xl border border-zinc-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none placeholder:text-zinc-400"
              placeholder="How can I help you?"
            ></textarea>
          </div>

          <button 
            type="submit"
            className="mt-2 w-full px-6 py-3 rounded-xl bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-zinc-900/20"
          >
            Send Message
            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
          
          <p className="text-xs text-center text-zinc-500 mt-2">
            Note to Vic: Change 'YOUR_EMAIL_HERE@example.com' in the form action to your real email to receive submissions.
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;
