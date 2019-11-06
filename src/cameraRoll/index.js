import React from 'react'
import { StyleSheet, Text, View, Button, ScrollView, Image, Dimensions, FlatList } from 'react-native';
import ImageBrowser from '../../component/cameraRoll/imageBrowse';
import { getPhotos } from '../../redux/actions/photos'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { FlatGrid } from 'react-native-super-grid';

const numColumns = 3;
const { width } = Dimensions.get('window')

class cameraRoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageBrowserOpen: false,
            photos: []
        }
    }

    formatData = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);

        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
            numberOfElementsLastRow++;
        }
        return data;
    };

    renderItem = ({ item, index }) => {
        console.log(item)
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (
            <View
                style={styles.item}
            >
                <Image
                    source={{ uri: item.file }}
                />
            </View>
        );
    };

    imageBrowserCallback = (callback) => {
        callback.then((photos) => {
            this.setState({
                imageBrowserOpen: false,
                photos
            })
        }).catch((e) => console.log(e))
    }

    renderImage(item, i) {
        return (
            <FlatList
                data={this.formatData(this.state.photos, numColumns)}
                style={styles.container}
                renderItem={this.renderItem()}
                numColumns={numColumns}
            />
        )
    }

    // Uploading image 
    formData() {
        this.props.getPhotos(this.state.photos)
        this.props.navigation.navigate('Address')
    }


    //  Tampilan gambar ketika sudah memilih gambar di choose images
    render() {
        if (this.state.imageBrowserOpen) {
            return (<ImageBrowser callback={this.imageBrowserCallback} />);
        }
        return (
            <View style={styles.container}>
                <View style={{ margin: 10 }}>
                    <Button
                        title="Choose Images"
                        onPress={() => this.setState({ imageBrowserOpen: true })}
                    />
                </View>
                <ScrollView>
                    <FlatGrid
                        itemDimension={130}
                        items={this.state.photos}
                        style={styles.gridView}
                        // staticDimension={300}
                        // fixed
                        // spacing={20}
                        renderItem={({ item, index }) => (
                            <View style={styles.itemContainer}>
                                <Image source={{ uri: item.file }} style={{ width: 100, height: 100 }} />
                            </View>
                        )}
                    />
                </ScrollView>
                {
                    this.state.photos.length == 0 ?
                        null
                        :
                        <View style={{ margin: 10 }}>
                            <Button
                                title="Continue"
                                onPress={() => this.formData()}
                            />
                        </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
    },
    item: {
        // backgroundColor: '#4D243D',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / numColumns, // approximate a square
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemText: {
        color: '#fff',
    },
});

function mapStateToProps(state) {
    return {
        photos: state.photos
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ getPhotos }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(cameraRoll);