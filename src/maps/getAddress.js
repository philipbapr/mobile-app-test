import React from 'react'
import { View, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { getLocation } from '../../redux/actions/getLocation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class getAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coords: {}
        };
    }

    componentDidMount() {
        this.getLocation()
    }

    async getLocation() {
        await Geolocation.watchPosition(
            (position) => {
                // console.log(position)
                this.setState({
                    coords: position.coords,
                    error: null
                });
                this.getStore();
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000 },
        );
    }
    getStore() {
        if (this.state.coords != null) {
            fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.state.coords.latitude + ',' + this.state.coords.longitude + '&key=AIzaSyCKBajmrs9UYvtbVAcEMaWaHA7XX1bo7wY')
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson) {
                        this.setState({
                            streetName: responseJson.results[0].formatted_address,
                            latitude: responseJson.results[0].geometry.location.lat,
                            longitude: responseJson.results[0].geometry.location.lng,
                            loading: false
                        });
                        this.props.getLocation(responseJson.results[0].formatted_address)
                        this.props.navigation.navigate('Form')
                    }
                })
                .catch((error) => {
                    console.error(error);
                }).done();
        }
    }

    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Icon name='map-marker' style={{ fontSize: 50 }} />
                <View>
                    <Text>Mencari Lokasi Anda</Text>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        location: state.location
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ getLocation }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(getAddress);