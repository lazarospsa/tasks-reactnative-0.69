import React, {Component} from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import {colors, fonts} from '../styles';

const initialState = {
  description: '',
  date: new Date(),
  showDatePickerModal: false,
};

export default class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
    };
  }

  getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={this.state.date}
        onChange={(_, date) =>
          this.setState({date, showDatePickerModal: false})
        }
        mode="date"
      />
    );

    const dateString = moment(this.state.date).format('dddd, MMMM D, YYYY');

    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() => this.setState({showDatePickerModal: true})}>
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {this.state.showDatePickerModal && datePicker}
        </View>
      );
    }

    return datePicker;
  };

  onSave = () => {
    const task = {
      id: Math.random(),
      description: this.state.description,
      estimateAt: this.state.date,
      doneAt: null,
    };

    this.props.onSave && this.props.onSave(task);
    this.setState({...initialState});
  };

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animationType={'slide'}>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.overlay}></View>
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <View>
            <Text style={styles.header}>New Task</Text>
            <TextInput
              style={styles.input}
              placeholder={'Description'}
              value={this.state.description}
              onChangeText={text => this.setState({description: text})}
            />
            {this.getDatePicker()}
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={this.props.onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={this.onSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.overlay}></View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    backgroundColor: colors.secondary,
  },
  header: {
    fontFamily: fonts.mainFont,
    fontSize: fonts.subtitleSize,
    textAlign: 'center',
    padding: 15,
    backgroundColor: colors.today,
    color: colors.secondary,
  },
  input: {
    fontFamily: fonts.mainFont,
    fontSize: fonts.subtitleSize,
    width: '90%',
    height: 40,
    margin: 15,
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 6,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  button: {
    width: 120,
    height: 40,
    backgroundColor: colors.today,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: colors.secondary,
    fontFamily: fonts.mainFont,
    fontSize: fonts.buttonTextSize,
  },
  date: {
    fontFamily: fonts.mainFont,
    fontSize: fonts.subtitleSize,
    marginLeft: 15,
  },
});
