import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper'

class success extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 20 }}>Berhasil Mengupload gambar</Text>
                <View>
                    <Button>
                        Lihat History saya
                    </Button>
                </View>
            </View>
        );
    }
}

export default success;