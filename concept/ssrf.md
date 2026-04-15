# SERVER SIDE REQUEST FORGERY

Vuln ketika server melakukan request ke URL yang dikontrol oleh user, tanpa validasi yang aman

Cara Kerja 

Aplikasi punya fitur seperti

```
POST /fetch
{
    "url": "https://example.com/image.jpg"
}
```


Server akan

`request.get(user_input_url)`

Masalah: user bisa ganti URL jadi:

```
http://127.0.0.1:8080
http://localhost/admin
http://169.254.169.254/latest/meta-data
```

Karena server biasanya punya akses ke internal service (private) seperti :
- localhost
- database panel
- internal API
- admin dashboard

