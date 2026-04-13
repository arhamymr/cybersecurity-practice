# CROSS-SITE SCRIPTING 

XSS (Cross-Site Scripting) adalah celah keamanan di website dimana attacker bisa menyisipkan javascript berbahaya ke halaman web, lalu script itu dijalankan di browser korban 

XSS = Inject JS -> dijalankan di browser korban -> ambil alih akun/data

Script yang disisipkan bisa berupa 
- Ambil cookie/session login 
- Mengambil data user 
- melakukan aksi atas nama user (misalnya post, transfer, dll)
  
Macam macam XSS

1. Reflected XSS (Non Persistent)
   Payload langsung dikirim lewat request (URL, form, dll), lalu langsung di pantulkan oleh server ke response 

   Ciri ciri:
   - Tidak disimpan di database 
   - Biasanya lewat parameter URL 
   
   Contohnya:

   ```(https://example.com/search?q=<script>alert(1)</script>)```

   jika server tidak sanitize -> script langsung jalan
  
   Real Attack 
   - Phising Link
   - Cookie stealing via crafted URL 
  
   Tentang Cookie 

   - Jika data cookie ingin aman simpan di cookie dengan flag HttpOnly, karena javascript tidak bisa mengakses cookie tersebut, sehingga aman dari XSS
   - Cookie dengan flag secure, hanya bisa dikirim via https tapi masih bisa di baca oleh js, 
   - Cookie dengan flag SameSite, mencegah CSRF tapi tidak mencegah XSS
   - Cookie dengan flag HttpOnly adalah cookie yang paling aman dari XSS

2. Stored XSS (Persistent)
3. DOM Based XSS
4. Blind XSS 
5. Self XSS (Low Impact)
6. Mutation XSS 
7. SVG XSS
8. Event-Based XSS 

## Contoh kasus di React/Next.js App