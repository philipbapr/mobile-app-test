# Other Module Integration

## 1. React Navigation

    Digunakan untuk membantu navigasi antar halaman di dalam app.

## 2. React Navigation Stack

    Untuk navigasi dalam sebuah App terdapat 4 jenis navigasi berdasarkan React-Navigation.
    Yaitu : 
        1. Stack Navigator
        2. Tab Navigator
        3. Switch Navigator
        4. Drawer Navigator

    didalam App ini menggunakan Stack Navigator. Kenapa ?
    Stack navigator digunakan untuk memberikan navigasi kepada user dalam perpindahan halaman dari Home Page menuju Chat Room. 
    
    Digunakan Stack Navigator dikarenakan butuhnya sebuah shortcut navigation yang dapat mengembalikan tujuan (halaman) dari user. 
    
    Pada App ini hanya diperuntukkan terhadap 2 halaman, dan tidak membutuhkan banyak navigasi. Maka dari itu Stack Navigator merupakan solusi terbaik dan efektif untuk mengakomodir kasus (perpindahan halaman tersebut) yang ada pada App ini.
