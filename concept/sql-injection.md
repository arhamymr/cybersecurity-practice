# SQL INJECTION

SQL Injection adalah teknik serangan yang memasukkan sql query ke input aplikasi (form, url path)

contoh sederhana 

`SELECT * FROM users WHERE username = 'admin' AND password = '123';`

Jika input tidak aman 

username: admin
password: ' OR 1=1 --

`SELECT * FROM users WHERE username = 'admin' AND password = '123' OR 1=1 -- ';`

Karene 1=1 selalu true -> login bypass


