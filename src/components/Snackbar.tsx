import React, {PureComponent} from 'react';
import {Snackbar as RNPSnackbar} from 'react-native-paper';
import {ViewStyle} from 'react-native/types';

interface SnackbarProps {
  style?: ViewStyle;
}

interface SnackbarState {
  visible: boolean;
  message: string;
}

export class Snackbar extends PureComponent<SnackbarProps, SnackbarState> {
  constructor(props: SnackbarProps) {
    super(props);
    this.state = {
      visible: false,
      message: '',
    };
  }
  show(message: string) {
    this.setState({
      visible: true,
      message: message,
    });
  }

  render() {
    return (
      <RNPSnackbar
        visible={this.state.visible}
        onDismiss={() => this.setState({visible: false})}
        style={this.props.style}
        action={{
          label: 'Dismiss',
        }}>
        {this.state.message}
      </RNPSnackbar>
    );
  }
}

export default Snackbar;
