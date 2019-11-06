import React from 'react'
import { View, Text, ActivityIndicator, RefreshControl, ScrollView, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchHistory } from '../../redux/actions/getHistory';
import { Appbar, Button } from 'react-native-paper';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }
    componentDidMount() {
        this.props.fetchHistory()
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.props.fetchHistory().then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        const { history, isFetching } = this.props.history

        if (isFetching) {
            return (
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={'large'} />
                </View>
            )
        } else {
            return (
                <View>
                    <Appbar.Header style={{ backgroundColor: '#fff' }}>
                        <Appbar.BackAction
                            onPress={() => this.props.navigation.goBack()}
                        />
                        <Appbar.Content
                            title="History"
                        />
                    </Appbar.Header>
                    <ScrollView refreshControl={<RefreshControl
                        refreshing={false}
                        onRefresh={() => this._onRefresh()} />}>
                        {
                            history.map((data, i) => {
                                return (
                                    <View style={styles.container} key={i}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 13, fontWeight: 'bold', flex: 0.5 }}>Nama :</Text>
                                            <Text style={{ fontSize: 13, fontWeight: 'bold', flex: 0.5 }}>
                                                {data.name}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 13, fontWeight: 'bold', flex: 0.5 }}>Nomor Hp :</Text>
                                            <Text style={{ fontSize: 13, fontWeight: 'bold', flex: 0.5 }}>
                                                {data.phone}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 13, fontWeight: 'bold', flex: 0.5 }}>Alamat :</Text>
                                            <Text style={{ fontSize: 13, fontWeight: 'bold', flex: 0.5 }}>
                                                {data.alamat}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        history: state.history
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchHistory }, dispatch)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 5,
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        borderWidth: 0.1,
        borderRadius: 10
    },
    textCartBeforeLogin: {
        textAlign: "center",
        textAlignVertical: "center",
        marginTop: 110,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(index);