import React from 'react';
import Modal from 'react-native-modal';
import {
  TouchableOpacity,
  WebView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class App extends React.Component {
  state = {
    isModalVisible: false,
    re_captcha: '',
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  _onVerify = async evt => {
    this.setState({
      re_captcha: evt.nativeEvent.data,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>recaptcha</Text>
        <Text>{this.state.re_captcha}</Text>
        <TouchableOpacity style={styles.modal} onPress={this._toggleModal}>
          <Text>열기</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1 }}>
            <WebView
              javaScriptEnabled={true}
              domStorageEnabled={true}
              scalesPageToFit={true}
              source={{
                uri: 'http://trashking.net/reCAPTCHA.html',
              }}
              onMessage={this._onVerify}
            />
            <TouchableOpacity onPress={this._toggleModal}>
              <Text>닫기</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    marginTop: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
