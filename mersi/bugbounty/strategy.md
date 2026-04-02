# STRATEGY 1

Set goals dulu, exploit belakangan 

- Mini Framework : GOAL -> Assumption -> Test -> Result
- Goal "Aset sensitif apa yang saya incar?"
- Asumption "Apa jalur paling masuk akal untuk mencapai goal itu ?"
- Test "Bagaimana cara membuktikan asumsi ini ?"
- Result "Bagaimana hasilnya? jika gagal, kembali ke asumsi, kembangkan ulang dan explorasi lagi"
  
# STRATEGI 2 

Hindari metodologi pentest, fokus goals 

[wrong] nmap google.com (metodology pentest - scanning menggunakan nmap)
[correct] fokus goals di strategi 1 

jika menggunakan metodologi pentest akan sulit mendapatkan celah, fokus di goals yang ada di strategy 1 

# STRATEGI 3 

Coba serang logic-nya, bukan aplikasinya 

Kalau mindset serang aplikasi, hunter biasa akan cari: 
- xss di kolom komentar
- coba upload file berbahaya

kalau mindsetnya serang logic, hunter justru mikir begini 
Analisa endpoint request? 
- Misalnya, ternyata parameter /ME/ itu melambangkan dirinya sendiri. apakah kita bisa rubah /ME/ menjadi value lain ? 
