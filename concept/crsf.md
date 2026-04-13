# CRSF (CROSS-SITE REQUEST FORGERY)

Serangan yang memaksa user yang sedang login untuk melakukan aksi tanpa sadar di suatu website 

attacker "nebeng" sesi login korban 

Cara kerja CSRF (simple flow)

1. User login ke website 
2. Session/cookie tersimpan di browser 
3. User buka website jahat (attacker)
4. Website jahat kirim request ke website bank 
5. Browser otomatis kirim cookie (karena masih login)
6. Request dianggap valid oleh server 

Ciri website vulnerable CSRF 

- Tidak ada CRSF Token
- Request penting hanya pakai cookie auth
- Tidak ada validasi 
    - Origin / referer
- Tidak pakai SameSite cookie 

## Cara mencegah CSRF 

- CSRF Token 
  
  - Server generate token (random)
  - token disimpan di server (bisa di simpan di session)
  - Token dikirim ke client (form/header)
  - Server validasi token saat request masuk

- SameSite Cookie 


- Validasi Origin / Referer Header
- Jangan gunakan untuk Aksi sensitif 
- Double Submit Cookie
- Gunakan Framework Protection (Built-in CSRF Protection)
- Gunakan Header khusus
- Reauthentication untuk aksi kritis 
  



