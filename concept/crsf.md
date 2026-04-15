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
  
  Set cookie dengan attribute 

  `Set-Cookie: session=abc123; SameSite=Strict`

  Mode: 
  - Strict -> Paling Aman
  - Lax -> Cukup aman (default modern browser)
  - None -> harus pakai HTTPS

- Validasi Origin / Referer Header
  
  Server cek request berasal dari domain sendiri 
  `Origin: https://yourwebsite.com`

- Jangan gunakan untuk Aksi sensitif 
  
  `GET /transfer?amount=1000&to=attacker`

  Gunakan:
  - POST
  - PUT
  - DELETE 
  
  GET bisa dipicu dari `<img>` atau `<a>`
  
- Gunakan Framework Protection (Built-in CSRF Protection)
  - Laravel -> @crsf 
  - Django -> CRSF Middleware 
  - Spring -> CSRF Protection
- Gunakan Header khusus
  
  `X-CSRF-Token: abc123`
- Reauthentication untuk aksi kritis 
  - Input password lagi
  - OTP
  - 2FA
  



