# API SECURITY 

OWASP API Security Top 10 

## BROKEN OBJECT LEVEL AUTHORIZATION (BOLA)

BOLA terjadi ketika aplikasi tidak memverifikasi apakah user berhak mengakses object tertentu sehingga user bisa mengakses data milik user lain hanya dengan menganti ID/Parameter 

Contoh:

Request normal 
```
GET /api/user/123
Authorization: Bearer userA_token
```

Server return data user A (milik user A)

Request BOLA
```
GET /api/user/124
Authorization: Bearer userA_token
```

Server return data user id 124(milik user B)

### Berbahaya karena 

- Data Leak (PII, email, password hash)
- Account Takeover (jika bisa modify data)
- Privilege Escalation 
- Full System compromise (di API kompleks)

### Cara mencegah:

- Object-Level Authorization Check
  
- jangan expose ID langsung 
  
  - /api/user/123 <- contoh salah
  - /api/user/me 
  - /api/user/uuid <- uuid adalah random id yang sulit ditebak
  
- Gunakan Access Control Layer 
  
  - RBAC (Role-Based Access Control)
  - ABAC (Attribute-Based Access Control)
  
- Jangan percaya client input
  
  Semua ID harus di verifikasi di backend

- Logging dan Monitoring 

## BROKEN AUTHENTICATION 

Terjadi karena implementasi authentication (login, session, identitas user) tidak diimplementasi dengan benar, sehingga hacker bisa mengambil alih akun user lain

Contoh broken Authentication

1. Password lemah / tanpa proteksi
2. Session Id bisa ditebak
3. Session tidak di invalidate
4. Tidak ada multi-factor authentication (MFA)
5. Credential disimpan tanpa enkripsi


### Cara Mencegah:

- Authentication 
    - Gunakan password hashing (bcrypt/Argon2)
    - Terapkan MFA
- Session Management 
- Proteksi Tambahan
  - Rate limit (anti brute force)
  - HTTPS 
  - Secure Cookie:
    - HttpOnly
    - Secure
    - SameSite

## BROKEN OBJECT PROPERY LEVEL AUTHORIZATION (BOPLA)

User bisa mengakses atau memodifikasi property (field) tertentu dari sebuah object yang seharusnya tidak boleh dia akses 

Perbedaan BOLA vs BOPLA 

- BOLA (Broken Object Level Authorization) akses ke object lain (misal data user lain)
- BOPLA (Property Level) akses field sensitif dalam object yang sama 

Contoh

Misalnya API response 

```
{
  "id": 123,
  "username": "arham",
  "email": "arham@mail.com",
  "role": "user",
  "isAdmin": false 
}
```

User normal hanya boleh liat
- username
- email

Tapi server tetap kirim 

- role
- isAdmin

Contoh lebih berbahaya (Mass Assignment)

**Mass Assignment** maksudnya ORM or Logic di backendnya bisa memasukkan dan menyimpan semua data yang diinputkan tanpa disaring sehingga user bisa menyisipkan data yang seharusnya tidak boleh di masukkan/diubah


```
POST /api/update-profile
{
  "username": "arham",
  "isAdmin": true
}
```

kalau backend:
- Tidak memfilter field
- Langsung assign ke object 

User bisa jadi **Admin**

### Cara mencegah

- Gunakan whitelist field
- Jangan trust input user
- Validasi authorization di setiap property
- Pisahkan response untuk role, setiap role punya response yang berbeda
- Disable Mass assignment (di ORM)


## UNRESTRICTED RESOURCE CONSUPTION