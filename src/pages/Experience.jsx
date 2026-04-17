import { motion } from 'framer-motion';
import { Server, Shield, Network, Database } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      company: 'Akamai',
      role: 'Network & Security',
      icon: <Network className="w-6 h-6 text-blue-500" />,
      description: 'Worked extensively with CDN and Application-to-Transport layer technologies (HTTP, TCP/IP, DNS, SSL). Gained deep experience configuring edge and security settings, and utilized tools like Wireshark, OpenSSL, and internal Akamai diagnostic tools.',
    },
    {
      company: 'Personal Infrastructure',
      role: 'Private DNS & Storage',
      icon: <Server className="w-6 h-6 text-indigo-500" />,
      description: 'Built and configured a private DNS server from scratch. Also set up a custom simple storage server at home, allowing secure remote connection and file transfer via SFTP.',
    },
    {
      company: 'Freelancing & Projects',
      role: 'Full Stack & Backend',
      icon: <Database className="w-6 h-6 text-teal-500" />,
      description: 'Delivered various personal and freelance software projects spanning backend architecture, AI-powered agents (including crop health and retrieval-augmented generation systems), Docker-based deployments, and building scalable systems on Linux infrastructure.',
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-full w-full pt-28 pb-20 px-6 max-w-4xl mx-auto flex flex-col z-10 relative"
    >
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">Experience & Work</h2>
        <p className="text-lg text-zinc-700 dark:text-zinc-300 font-light max-w-2xl">A summary of my professional journey, from global edge networks to private home infrastructure.</p>
      </div>

      <div className="grid gap-6">
        {experiences.map((exp, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            key={idx} 
            className="glass-panel p-6 md:p-8 hover:shadow-2xl dark:hover:shadow-black/50 transition-shadow duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl rounded-tl-none border border-zinc-200 dark:border-zinc-700/50">
                {exp.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{exp.company}</h3>
                <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">{exp.role}</h4>
                <p className="text-zinc-700 dark:text-zinc-200 leading-relaxed font-light">{exp.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Experience;
