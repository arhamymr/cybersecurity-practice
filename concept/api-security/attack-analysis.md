# API ATTACK ANALYSIS

Common API Breach , The Top API Breach base on apisec.ai data

- Rate Limit, need to improve bot detection and rate limiting
- Broken Authorization 
- Broken Authentication
- Excess Data Exposure 
- Improper Inventory Management 
- Leakded API Keys 
- Function Authorization
- Security Misconfiguration
  
90% of Breach is OWASP API

# THREAT MODELING 

Framework 

- **Identify**
  Identifikasi :
  - APIs, bisa dengan memapping semua api dan mengkategorikan ke api public dan api internal
  - Alur Bisnis (Business flow)
  - Data, identifikasi data seperti Password, JWT API key, Data User (email, nomor HP), payment info
  - Access Paths, kadang internal API tidak diamankan dengan baik
- **Assess**
  Amati kerentanan yang mungkin terjadi seperti kesalahan logic, akses kontrol, 3rd party risk
- **Probability** 
  Seberapa besar kemungkinan attack terjadi 
- **Impact**
  Jika berhasil di exploitasi bisa terjadi data exposure, takeover akun, financial loss, Akses internal server, atau hilang kepercayaan pengguna
- **Mitigate**
  Mengurangi dan menghilangkan resiko 


## ATTACKER WANT (Apa diinginkan oleh attacker) ?

Gunakan ini sebagai hal pertama yang dilakukan ketika melakukan threat modeling  

- Personal Information (PII), 
- Financial Information: Bangking data, credits cards
- Corporate Data: Sensitif corporate data, research
- Fraud:  Free Use (Akses Gratis), financial Profit
- Critical Infranstructure



