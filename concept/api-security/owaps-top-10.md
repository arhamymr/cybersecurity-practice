# API SECURITY 

## Table of Contents

- [Broken Object Level Authorization (BOLA)](#broken-object-level-authorization-bola)
- [Broken Authentication](#broken-authentication)
- [Broken Object Property Level Authorization (BOPLA)](#broken-object-propery-level-authorization-bopla)
- [Unrestricted Resource Consumption](#unrestricted-resource-consuption)
- [Unrestricted Access to Sensitive Business Flows](#unrestricted-access-to-sensitive-business-flows)
- [Server Side Request Forgery](#server-side-request-forgery)
- [Server Misconfiguration](#server-misconfiguration)

## Prevention Methods

- [BOLA Prevention](#cara-mencegah)
- [Broken Authentication Prevention](#cara-mencegah-1)
- [BOPLA Prevention](#cara-mencegah-2)
- [Resource Consumption Prevention](#cara-mencegah-3)
- [Business Flows Prevention](#cara-mencegah-4)
- [SSRF Prevention](#cara-mencegah-5)

## Key Concepts

- [BOLA Dangers](#berbahaya-karena)
- [BOLA vs BOPLA Difference](#perbedaan-bola-vs-bopla)
- [Mass Assignment Example](#contoh-lebih-bahaya-mass-assignment)
- [Sensitive Business Flow Examples](#sensitive-business-flow-contohnya-seperti)
- [SSRF Simple Example](#contoh-sederhana)



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

Kerentanan ketika aplikasi tidak membatasi penggunaan resource (CPU, RAM, Bandwith, disk, atau API Calls), sehingga attacker bisa "menguras" resource sampai sistem jadi lambat atau bahkan down

Contohnya ada api yang tidak membatasi jumlah inputan yang masuk ke server, Peretas bisa mengirim payload/query berat yang bisa membuat server memproses data terlalu besar sehingga bisa membuat server crash atau tidak bisa melayani pengguna lain 

### Cara Mencegah

- **Rate Limit** batasi request per IP/user, contoh 100 request/menit
- **Input Validation** batasi ukuran file, panjang input , jika api berbentuk pagination validation batasi maksimal data yang bisa di request, contohnya 100 data per request 
- **Timeout / Trottling** hentikan proses yang terlalu lama
- **Caching** Kurangi beban server 
- **User Type Rate Limit** Setiap type user punya reate limit yang berbeda contohnya type pengguna `guest` dan `registered` mempunyai rate limit yang berbeda, type `registered` memiliki limit yang lebih besar karena sudah teridentifikasi dibanding type `guest`

## UNRESTRICTED ACCESS TO SENSITIVE BUSINESS FLOWS

Kerentanan ketika alur bisnis penting (Business Logic) bisa diakses oleh siapa saja tanpa kontrol yang tepat, aksi tersebut tidak dilindungi

Sensitive business flow contohnya seperti 
- Pembayaran
- Refund
- Transfer Uang 
- Reset Password 
- Upgrade Akun 
- Verifikasi identitas
- Order / Checkout

Contohnya e-commerce yang memiliki fitur refund uang, namun karena ada bug user biasa (unauthorized) bisa akses endpoint refund 

### Cara Mencegah 

- **Access Control (RBAC/ABAC)**
  
  Implementasi Role Base Access Control/Attribute Base Access Control untuk semua endpoint, pastikan setiap request selalu ada pengecekan cek role sebelum di proses ke tahap selanjutnya 
- **Validasi dan Authorization Backend**
  
  Validasi setiap request dan lakukan pengecekan authorization setiap request 


## SERVER SIDE REQUEST FORGERY

Kerentanan dimana server aplikasi bisa dipaksa untuk mengirim request ke lokasi lain yang seharusnya tidak boleh diakses oleh user 

Biasanya aplikasi selalu punya fitur seperti fetch URL, import file dari URL dan Webhook / callback, kalau input URL dari user tidak di validasi dengan baik attacker bisa mengubah URL tersebut 

Contoh sederhana 

Aplikasi

`GET /fetch?url=https://example.com/data`

Attacker bisa mengubah jadi 

`GET /fetch?url=http://localhost/admin`

Server akan request ke dirinya sendiri (localhost), padahal ketika akses dari luar kita tidak bisa mengakses localhost, jadi semacam relay yang menhubungkan ke internal services

### Cara Mencegah 

- **Validasi URL** gunakan allow list (domain yang boleh saja) dan hindari blacklist 
- **Block IP internal** tolak request ke 127.0.0.1, 169.254.169.254 (alamat khusus biasanya metadata server), Private IP (10.x.x.x, 192.168.x.x)
- **Gunakan Network Firewall** batasi server agak tidak bisa akses Internal service tertentu dan Metadata endpoint jika tidak diperlukan
- **Gunakan Proxy / Gateway** 
Semua outbound request lewat kontrol 

## SERVER MISCONFIGURATION

Kesalahan setting yang membuat endpoint API menjadi terlalu terbuka, contoh:
- Tidak ada Rate Limit
- Patch Keamanan belum diperbarui
- Tidak ada TLS (Transport Layer Security)
- misconfigurasi pada api response api terlalu detail 

  ```
  {
    "error": "SQL error",
    "trace": "...",
    "db_user": "root"
  }
  ```
  bocor informasi sensitif
- CORS salah configurasi
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
```
Website lain bisa akses API pakai session user
- Endpoint Internal terbuka 
  - /api/admin
  - /api/debug
  - /api/test
  tidak ada Authentication


## IMPROPER INVENTORY MANAGEMENT

Kerentanan ini terjadi karena organisasi tidak punya daftar yang jelas dan terkelola dengan baik tentang semua API yang mereka miliki

Sehingga:

- Ada API yang "terlupakan"
- Ada versi lama (deprecated) masih aktif
- Ada endpoint yang tidak terdokumentasi (shadow API)

# Cara Mencegah 
- Inventory semua API
- Versioning yang jelas, v1, v2, v3 dan hapus versi lama 
- Monitoring & logging, track semua endpoint yang diakses
- Gunakan API Gateway
- Security testing rutin, VAPT/Scanning

## UNSAFE CONSUMPTION of APIs

Kerentanan ini dapat terjadi jika sistem kamu percaya begitu saja pada API lain (third-party/external API) tanpa validasi atau kontrol yang cukup, jadi bukan API kamu yang diserang langsung tapi API yang dikonsumsi menjadi titik lemah

Contoh 