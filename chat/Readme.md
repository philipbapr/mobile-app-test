
# INTRODUCING CHAT APPLICATION

## 1. Landing Page
<img style="width : 50%;" src="./src/assets/landing page.png"></img>

    Landing Page pada halaman App merupakan halaman awal saat menggunakan App. 
    - Masukan identifier menggunakan username.
    - Tekan Tombol login (saat loading, tombol akan disabled hingga berhasil masuk kedalam app)


## 2. Home Page
<img style="width : 50%;" src="./src/assets/home page.png"></img>

    Home Page, yang berisi list dari seluruh user (online) dari app tsb.
    - tekan nama user pada list tersebut untuk memulai chat

    ps : Apabila tidak muncul sama sekali, maka tidak ada satupun user yang online pada saat itu.

## 3. Chat Room
<img style="width : 50%;" src="./src/assets/chat room.png"></img>

    Chat Room, merupakan halaman chat setelah menekan nama user di home page.

    sesudah mengirimkan chat di kolom input, username dan isi chat terbaru anda akan mucul di bagian kanan bawah halaman dengan warna abu.

    username dan isi chat terbaru dari lawan bicara akan muncul dibagian kiri bawah berwarna hijau.

    ps : untuk kembali ke home page, gunakan tombol navigasi pada halaman chat atau tombol back yang ada di device

# How To Install The App ?

1. clone The repository
2. get in to 'chat' folder
3. install all the package 
        
        $ npm install

4. start metro bundler

        $ react-native start

5. run App on your android device

        $ react-native run-android

    - if there any problems like

            error Failed to install the app. Make sure you have an Android emulator running or a device connected.
        
    - make sure you have access to your android device or android emulator.

    - and check the list of devices

            $ adb devices
    
    - example response :

            $ adb devices

            List of devices attached
            adb server version (41) doesn't match this client (39); killing...
            * daemon started successfully
            emulator-5554   device

    - then go to step 5 to install the app on your devices

    - if there are many devices on list
    - example response : 

            $ adb devices

            List of devices attached
            adb server version (41) doesn't match this client (39); killing...
            * daemon started successfully
            emulator-5554   device
            emulator-5937   device
    
    - type this to install the App on selected devices

            $ react-native run-android emulator-5937



