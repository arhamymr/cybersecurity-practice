# AI Teknis 

## Temperature 

Temperature adalah parameter yang mengukur tingkat keacakan "randomness" dari model output , semakin rendah (mendekati 0) maka prediksi model lebih deterministik (konsistent), fokus pada jawaban yang paling mungkin, lebih stabil dan mudah di prediksi, sedangkan semakin tinggi temperature membuat output menjadi lebih kreative dan lebih bervariasi, lebih banyak kemungkinan jawaban dan lebih sulit diprediksi 

Temperature tinggi membuat model lebih rentan mengikuti instruksi aneh atau injection, sedangkan temperature rendah cenderung lebih patuh pada pola aman, tapi tetap tidak kebal dari injection

## Model Fine-Tuning 

Model fine-tuning adalah proses melatih ulang model yang sudah ada dengan datasets khusus untuk merubah perilaku model pada tugas tertentu, bobot model (weights) diperbarui berdasarkan data baru

Bisa digunakan untuk memperkuat proteksi, tapi bisa juga jika datanya buruk bisa membuka celah baru 

## Prompt Tuning 

Teknik yang digunakan untuk menyesuaikan model untuk melakukan pekerjaan khusus dengan menambahkan prompt khusus di depan input, tanpa mengubah bobot weight utama model

Sering digunakan sebagai guardrails tambahan

