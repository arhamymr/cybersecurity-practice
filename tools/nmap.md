# NMAP

Nmap adalah tools untuk 
- Scan Port 
- Deteksi Service 
- Identifikasi OS 
- Mapping Network 

Biasanya digunakan untuk 
- Recon (tahap awal hacking)
- Audit security
- Network troubleshooting 

Command 

nmap 192.168.1.1 = Scan 1000 port paling umum 
nmap -p 80,443 192.168.1.1 = Scan spesifik port 80 dan 443 
nmap -p- 192.168.1.1 = Scan semua port 
nmap -sV 192.168.1.1 = Service detection, scan versi service seperti misal Apache 2.4.49
nmap -O 192.168.1.1 = OS Detection
nmap -A 192.168.1.1 = Aggresive scan, sering digunakan pentester 

Scan yang digunakan hacker 

nmap -sS 192.168.1.1 = Stealth scan, tidak full connect 
nmap -sU 192.168.1.1 = UDP Scan, untuk service seperti DNS, SNMP
nmap -sT 192.168.1.1 = TCP Scan, full handshake connection


