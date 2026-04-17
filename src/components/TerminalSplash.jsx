import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TerminalSplash = ({ onUnlock }) => {
  const navigate = useNavigate();
  // AUTH STATES: 'user', 'pass', 'terminal'
  const [authState, setAuthState] = useState('user');
  const [currentUser, setCurrentUser] = useState('');
  const [publicIp, setPublicIp] = useState('192.168.1.100');
  
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'VicOS Kernel v1.0.0 (tty1)' },
    { type: 'output', text: 'Unauthorized access is prohibited.' },
  ]);
  
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input on load
    inputRef.current?.focus();
    const handleClick = () => inputRef.current?.focus();
    window.addEventListener('click', handleClick);
    
    // Silently fetch IP address for the hacker illusion
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        if(data.ip) setPublicIp(data.ip);
      })
      .catch(() => {});

    return () => window.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const getPrompt = () => {
    if (authState === 'user') return 'vishneshwaran-os login: ';
    if (authState === 'pass') return 'Password: ';
    return `${currentUser}@vic-server:~$ `;
  };

  const processAuth = (inputValue) => {
    if (authState === 'user') {
      const u = inputValue.trim() || 'guest';
      setCurrentUser(u);
      setHistory(prev => [
        ...prev,
        { type: 'command', text: `vishneshwaran-os login: ${u}` }
      ]);
      setAuthState('pass');
    } else if (authState === 'pass') {
      setHistory(prev => [
        ...prev,
        { type: 'command', text: `Password: ` }, // Hide actual pass
        { type: 'output', text: `Authenticating... [OK]` },
        { type: 'output', text: `Session provisioned for ${currentUser}. Tracking IP: ${publicIp}...` },
        { type: 'output', text: `Welcome to VicOS. Type 'help' or 'man' to begin.` }
      ]);
      setAuthState('terminal');
    }
  };

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
  
  ./boot       - [CRITICAL] Execute portfolio initialization sequence`;
        break;
      case 'whoami':
        output = `${currentUser}\nRole: Network & Security Specialist / Software Engineer\nAccess Level: Transient Guest`;
        break;
      case 'ls':
        output = 'access_logs.gz\ncore_dump\nboot\nnetwork_config.json\nresume.pdf';
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
 1  gateway (${publicIp})  2.134 ms
 2  edge-router.isp.net (10.14.22.1)  14.566 ms
 3  vic-fw-core (172.16.0.4)  19.221 ms
 4  ${trTarget} (10.0.0.1)  21.990 ms - SECURE ENDPOINT REACHED`;
        break;
      case 'ifconfig':
      case 'ip':
        output = `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet ${publicIp}  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::a00:27ff:fe4e:66a1  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:4e:66:a1  txqueuelen 1000  (Ethernet)
        RX packets 45312  bytes 62143000 (62.1 MB)
        TX packets 12341  bytes 1432000 (1.4 MB)

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1000  (Local Loopback)`;
        break;
      case './boot':
      case 'boot':
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
      { type: 'command', text: `${getPrompt()}${cmdStr}` },
      ...(output ? [{ type: 'output', text: output }] : []),
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (authState !== 'terminal') {
        processAuth(input);
      } else {
        handleCommand(input);
      }
      setInput('');
    } else if (e.key === 'c' && e.ctrlKey && authState === 'terminal') {
      setHistory((prev) => [...prev, { type: 'command', text: `${getPrompt()}${input}^C` }]);
      setInput('');
    }
  };

  const isPassword = authState === 'pass';

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
          <span className="text-zinc-300 mr-2 shrink-0">{getPrompt()}</span>
          <input
            ref={inputRef}
            type={isPassword ? 'password' : 'text'}
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
