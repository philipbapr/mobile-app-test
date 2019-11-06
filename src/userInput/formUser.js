import React from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { Appbar, Button, Dialog, Portal, TextInput } from 'react-native-paper'
import { connect } from 'react-redux'

class formUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            address: ''
        };
    }

    locationNow() {
        this.setState({ address: this.props.location.location })
    }

    async formData() {

        if (this.state.name == '' && this.state.phone == '' && this.state.address == '') {
            alert(`Anda tidak memasukan suatu karakter`)
        }
        else {
            let fcmToken = await AsyncStorage.getItem('fcmToken');
            var formData = new FormData();
            this.props.photos.photos.forEach((item, i) => {
                formData.append("filename[]", {
                    uri: item.file,
                    type: "image/jpeg",
                    name: `filename${i}.jpg`,
                });
            });
            var reqData = {
                name: this.state.name,
                phone: this.state.phone,
                alamat: this.state.address
            }
            for (var k in reqData) {
                formData.append(k, reqData[k]);
            };
            fetch("https://images.funtravia.com/api/images/store", {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            }).then(response => {
                if (response) {
                    fetch("https://fcm.googleapis.com/fcm/send", {
                        method: 'POST',
                        headers: {
                            'Authorization': 'key=AAAA5b479Hk:APA91bFbE2NvumdBTeJ1tXJaHwWKkusrgvalS53GG3O5pAB89Fpi9Kg4GyYfgC6DnPb4NSXxrwV5MQ1uvuygiMqpxMtB9MObmVS1nf155JO-kgY3609nQtjVj6IShmF1l5Sswza0ehdO',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "to": fcmToken,
                            "notification": {
                                "title": "Yeay berhasil menambahkan",
                                "body": "Kamu berhasil menambahkan suatu gambar disini"
                            },
                            "priority": "high"
                        })
                    })
                    this.props.navigation.navigate('Test')
                }
            }).catch(_ => {
                console.log('error: ', _)
            })
        }
    }

    render() {
        return (
            <View>
                <Appbar.Header style={styles.headerStyle}>
                    <Appbar.BackAction
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content
                        title="Masukan detail alamat"
                    />
                </Appbar.Header>
                <View>
                    <View style={styles.input}>
                        <TextInput
                            label='Nama'
                            mode='outlined'
                            value={this.state.name}
                            style={{ backgroundColor: '#fff' }}
                            onChangeText={text => this.setState({ name: text })}
                        />
                    </View>
                    <View style={styles.input}>
                        <TextInput
                            label='No.handphone'
                            mode='outlined'
                            keyboardType='phone-pad'
                            value={this.state.phone}
                            style={{ backgroundColor: '#fff' }}
                            onChangeText={text => this.setState({ phone: text })}
                        />
                    </View>
                    <View style={styles.input}>
                        <TextInput
                            label='Alamat Pengiriman'
                            mode='outlined'
                            multiline={true}
                            value={this.state.address}
                            style={{ backgroundColor: '#fff' }}
                            onChangeText={text => this.setState({ address: text })}
                        />
                    </View>

                    <View style={styles.button}>
                        <Button icon='map-marker' mode='outlined' onPress={() => this.locationNow()}>
                            Gunakan Lokasi Sekarang
                        </Button>
                    </View>
                    <View style={styles.button}>
                        <Button mode='contained' onPress={() => this.formData()}>
                            Submit
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
        shadowColor: '#f1f1f1',
    },
    input: {
        margin: 10
    },
    button: {
        margin: 10
    },
    lokasiNow: {
        marginLeft: 'auto',
        marginRight: 10,
        marginBottom: -10
    }
})

function mapStateToProps(state) {
    return {
        location: state.location,
        photos: state.photos
    }
}

export default connect(mapStateToProps)(formUser);