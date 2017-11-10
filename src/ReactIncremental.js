import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Button,
    AppRegistry,
    AsyncStorage
} from 'react-native';

const initialCount = 11;

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
        'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    welcome: {
        fontSize: 90,
        textAlign: 'center',
        marginBottom: 60,
        color: 'black'
    },
    inputButton: {
        width: 180,
        height: 60,
        elevation: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    clearButton: {
        width: 120,
        height: 40,
        elevation: 1,
        borderRadius: 4,
        marginBottom: 180,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffa8a8'
    },
    inputButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'
    }
});

class ReactIncremental extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            count: 0
        };

        this.state = this.initialState;
    }

    _onInputButtonPressed() {
        let inputValue = this.state.count + 1;

        this.setState({count: inputValue});
        AsyncStorage.setItem('saveState', JSON.stringify({count: inputValue}));
    }

    _onClearButtonPressed() {
        this.setState({count: 0});
        AsyncStorage.removeItem('saveState');
    }

    _loadFromAsyncStorage() {
        AsyncStorage.getItem('saveState').then((value) => {
            let result = JSON.parse(value);
            if(result && result.count) {
                console.log(result)
                this.setState({count: parseInt(result.count) || 0});
            }
        }).done();
    }

    componentDidMount() {
        this._loadFromAsyncStorage();
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.clearButton}
                    underlayColor={'firebrick'}
                    onPress={this._onClearButtonPressed.bind(this)}
                >
                    <Text style={styles.inputButtonText}>{'Clear'}</Text>
                </TouchableHighlight>

                <Text style={styles.welcome}>{this.state.count}</Text>

                <TouchableHighlight
                    style={styles.inputButton}
                    underlayColor={'#fafafa'}
                    onPress={this._onInputButtonPressed.bind(this)}
                >
                    <Text style={styles.inputButtonText}>{'Tap'}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

AppRegistry.registerComponent('ReactIncremental', () => ReactIncremental);