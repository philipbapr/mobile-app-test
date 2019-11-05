import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    Image,
    Text,
    TouchableOpacity,
    PermissionsAndroid,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

class AddingMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: true,
            marker: {
            },
            coords: {},
            search: false,
            streetName: '',
            region: [],
            alamat: ''
        };
    }


    //---------------> component with functions that must be run first <------------------
    componentDidMount() {
        this.getLocation();
        this.getMap();
        // console.log(this.props.photos)
    }


    //-----------------> Getting permission for access your location from phone <-----------------------
    async requestLocationPermission() {
        const chckLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
            alert("You've access for the location");
        } else {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        'title': 'Cool Location App required Location permission',
                        'message': 'We required Location permission in order to get device location ' +
                            'Please grant us.'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    alert("You've access for the location");
                } else {
                    alert("You don't have access for the location");
                }
            } catch (err) {
                alert(err)
            }
        }
    };

    //--------------> Getting google maps API using fetch metode by region, and then changed to response to be converted to json file <--------------------
    async getMap() {
        if (this.state.region != null) {
            await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='
                + '-6.14705004' + ',' + "106.70887032" + '&key=AIzaSyCKBajmrs9UYvtbVAcEMaWaHA7XX1bo7wY')
                .then((response) => response.json())
                .then((responseJson) => {
                    // console.log(responseJson)
                    // console.log(responseJson.results[0].formatted_address)
                    this.setNewParams(responseJson.results[0].formatted_address)
                })
                .catch((error) => {
                    console.error(error);
                }).done();
        }
    }


    //-----------------> Get value for alamat, because in the function there is a response and it is changed to json file, 
    // we cannot create a state in it, so we need one more function to retrieve the value from the response <---------
    setNewParams(value) {
        var dataMap = {
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
            alamat: value
        };
        // this.props.navigation.navigate('AddMerchant', dataMap);
    }


    //---------------> Function for get location by coords from google maps API <--------------------
    async getLocation() {
        await Geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
                this.setState({
                    coords: position.coords,
                    error: null
                });
                this.getStore();
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 2000, maximumAge: 0 },
        );
    }


    //--------------> Getting google maps API using fetch metode , and then changed to response to be converted to json file <--------------------
    async getStore() {
        if (this.state.coords != null) {
            await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='
                + this.state.coords.latitude + ',' + this.state.coords.longitude + '&key=AIzaSyCKBajmrs9UYvtbVAcEMaWaHA7XX1bo7wY')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        streetName: responseJson.results[0].formatted_address,
                        latitude: responseJson.results[0].geometry.location.lat,
                        longitude: responseJson.results[0].geometry.location.lng,
                        loading: false
                    });
                })
                .catch((error) => {
                    console.error(error);
                }).done();
        }
    }


    //---------------------> this function is inherited from react native, the meaning of the region is a red pin that we can move, <------------------
    onRegionChange(region) {
    }
    onRegionChangeComplete(region) {
        this.setState({ region: region })
    }


    render() {

        const { width, height } = Dimensions.get('window');
        const ratio = width / height;
        //------------> If loading true, then ActivityIndicator will display, but if data already obtained then maps will display <-----------------------------
        return (
            <View style={{ flex: 1 }}>

                <MapView
                    provider={PROVIDER_GOOGLE}
                    followsUserLocation={true}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsCompass={true}
                    toolbarEnabled={true}
                    zoomEnabled={true}
                    style={styles.map}
                    initialRegion={{
                        latitude: -6.14705004,
                        longitude: 106.70887032,
                        latitudeDelta: 0.03 * ratio,
                        longitudeDelta: 0.03 * ratio
                    }}
                    onRegionChange={this.onRegionChange}
                    onRegionChangeComplete={(region) => { this.onRegionChangeComplete(region) }}
                />
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    radius: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,122,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0,112,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    marker: {
        height: 20,
        width: 20,
        borderRadius: 20 / 2,
        overflow: 'hidden',
        backgroundColor: '#007AFF',
        borderWidth: 1,
        borderColor: 'white'
    },
    calloutView: {
        // position: 'absolute',
        justifyContent: "center",
        alignItems: 'center',
        //alignItems: "center",
        // marginLeft: "50%",
        // marginRight: "50%",
        marginTop: "85%",
        //marginBottom:50
    },
    btn_pickMap: {
        backgroundColor: '#5CA2FF'
    },
    txt_pickMap: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 12,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffff'
    }
});

const mapStateToProps = state => ({
    ...state,
    photos: state.photos,
});

export default connect(mapStateToProps)(AddingMap);
