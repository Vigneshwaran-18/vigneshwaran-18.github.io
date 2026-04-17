import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TerminalSplash = ({ onUnlock }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'VicOS v1.0.0 (tty1)' },
    { type: 'output', text: 'Type "help" or "man" for available commands. System locked.' },
  ]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const prompt = 'guest@vic-server:~$ ';

  useEffect(() => {
    // Focus input on load and any click
    inputRef.current?.focus();
    const handleClick = () => inputRef.current?.focus();
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr) => {
    const trimmedArgs = cmdStr.trim().split(' ');
    const cmd = trimmedArgs[0].toLowerCase();
    
    let output = '';

    switch (cmd) {
      case 'help':
      case 'man':
        output = `Available commands:
  help / man   - Show this manual
  whoami       - Display current user information
  ls           - List directory contents
  clear        - Clear the terminal screen
  mail         - Open secure transmission protocol (Contact page)
  ping         - Send ICMP ECHO_REQUEST to network hosts
  ifconfig     - Configure a network interface
  traceroute   - Print the route packets trace to network host
  
  ./enter_portfolio.sh  - [CRITICAL] Execute portfolio initialization sequence`;
        break;
      case 'whoami':
        output = 'vic\nRole: Network & Security Specialist / Software Engineer';
        break;
      case 'ls':
        output = 'access_logs.gz\ncore_dump\nenter_portfolio.sh\nnetwork_config.json\nresume.pdf';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'mail':
      case 'contact':
        output = 'Routing external transmission protocol to /contact...';
        setTimeout(() => navigate('/contact'), 800);
        break;
      case 'ping':
        const target = trimmedArgs[1] || '8.8.8.8';
        output = `PING ${target} (${target}): 56 data bytes
64 bytes from ${target}: icmp_seq=0 ttl=116 time=12.043 ms
64 bytes from ${target}: icmp_seq=1 ttl=116 time=14.102 ms
64 bytes from ${target}: icmp_seq=2 ttl=116 time=11.398 ms
--- ${target} ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss`;
        break;
      case 'traceroute':
        const trTarget = trimmedArgs[1] || 'vic-routing-edge.local';
        output = `traceroute to ${trTarget} (10.0.0.1), 30 hops max, 60 byte packets
 1  gateway (192.168.1.1)  2.134 ms
 2  edge-router.isp.net (10.14.22.1)  14.566 ms
 3  vic-fw-core (172.16.0.4)  19.221 ms
 4  ${trTarget} (10.0.0.1)  21.990 ms - SECURE ENDPOINT REACHED`;
        break;
      case 'ifconfig':
        output = `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::a00:27ff:fe4e:66a1  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:4e:66:a1  txqueuelen 1000  (Ethernet)
        RX packets 45312  bytes 62143000 (62.1 MB)
        TX packets 12341  bytes 1432000 (1.4 MB)

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1000  (Local Loopback)`;
        break;
      case './enter_portfolio.sh':
      case 'start':
        output = 'Executing boot sequence...\nLoading UI layers...\nBypassing firewall rules... [OK]\nUnlocking Home Page...';
        setTimeout(() => {
          onUnlock();
        }, 1200);
        break;
      case '':
        output = '';
        break;
      default:
        output = `bash: ${cmd}: command not found`;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'command', text: `${prompt}${cmdStr}` },
      ...(output ? [{ type: 'output', text: output }] : []),
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'c' && e.ctrlKey) {
      setHistory((prev) => [...prev, { type: 'command', text: `${prompt}${input}^C` }]);
      setInput('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[200] bg-zinc-950 text-green-500 font-mono p-4 md:p-8 flex flex-col overflow-y-auto selection:bg-green-500/30 selection:text-green-900"
    >
      <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col">
        {history.map((entry, i) => (
          <div key={i} className="mb-1 whitespace-pre-wrap">
            {entry.type === 'command' ? (
              <span className="text-zinc-300">{entry.text}</span>
            ) : (
              <span className="text-green-400">{entry.text}</span>
            )}
          </div>
        ))}
        
        <div className="flex items-center mt-1">
          <span className="text-zinc-300 mr-2 shrink-0">{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-zinc-300 caret-green-500"
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />
        </div>
        <div ref={bottomRef} className="h-4" />
      </div>
    </motion.div>
  );
};

export default TerminalSplash;
