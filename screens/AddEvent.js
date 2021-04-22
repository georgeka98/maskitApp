import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Keyboard,
  Switch,
  StyleSheet,
  Alert,
} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import Constants from 'expo-constants';
import DateTimePicker from 'react-native-modal-datetime-picker';
import uuid from 'uuid';
import { Context } from '../components/Context';
import {Task} from '../components/Task';
import { addEventStore} from './helpers';

const { width: vw } = Dimensions.get('window');
// moment().format('YYYY/MM/DD')



export default class CreateTask extends Component {
  state = {
    selectedDay: {
      [`${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
        'DD'
      )}`]: {
        selected: true,
        selectedColor: '#2E66E7',
      },
    },
    currentDay: moment().format(),
    taskText: '',
    notesText: '',
    keyboardHeight: 0,
    visibleHeight: Dimensions.get('window').height,
    isMaskReminderSet: true,
    changeAlarmTime: false,
    alarmTime: moment().add(1, "hour").format(),
    maskReminderTime: moment().add(45, "minutes").format(),
    isDateTimePickerVisible: false,
    timeType: '',
    creatTodo: {},
    createEventAsyncRes: '',
  };

  async componentDidMount() {
    const { createNewCalendar } = this.props.route.params;
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );
  }

  async componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow);
    Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide);
  }

  _keyboardDidShow = e => {
    this.setState({
      keyboardHeight: e.endCoordinates.height,
      visibleHeight:
        Dimensions.get('window').height - e.endCoordinates.height - 30,
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      visibleHeight: Dimensions.get('window').height,
    });
  };

  handleAlarmSet = () => {
    const { isMaskReminderSet } = this.state;
    this.setState({
      isMaskReminderSet: !isMaskReminderSet,
    });
  };

  synchronizeCalendar = async value => {
    const { createNewCalendar } = this.props.route.params;

    const calendarId = await createNewCalendar();
    try {
      const createEventAsyncRes = await this._addEventsToCalendar(calendarId);
      this.setState(
        {
          createEventAsyncRes,
        },
        () => {
          this._handleCreateEventData(value);
        }
      );
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  _addEventsToCalendar = async calendarId => {
    const { taskText, notesText, alarmTime, maskReminderTime } = this.state;
    const event = {
      title: taskText,
      notes: notesText,
      startDate: moment(alarmTime)
        .add(0, 'm')
        .toDate(),
      endDate: moment(alarmTime)
        .add(5, 'm')
        .toDate(),
      timeZone: Localization.timezone,
      maskReminderTime: moment(maskReminderTime),
    };

    try {
      const createEventAsyncRes = await Calendar.createEventAsync(
        calendarId.toString(),
        event
      );

      return createEventAsyncRes;
    } catch (error) {
      console.log(error);
    }
  };

  _showDateTimePicker = (changeAlarmTimeBoolean) => this.setState({ isDateTimePickerVisible: true, changeAlarmTime: changeAlarmTimeBoolean });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false, changeAlarmTime: true });

  _handleCreateEventData = async value => {

    const {
      state: {
        currentDay,
        taskText,
        notesText,
        isMaskReminderSet,
        alarmTime,
        maskReminderTime,
        createEventAsyncRes,
      },
      props: { navigation },
    } = this;

    const creatTodo = {
      key: uuid(),
      date: `${moment(currentDay).format('YYYY')}-${moment(currentDay).format(
        'MM'
      )}-${moment(currentDay).format('DD')}`,
      todoList: [
        {
          key: uuid(),
          title: taskText,
          notes: notesText,
          alarm: {
            time: alarmTime,
            maskReminderTime: maskReminderTime,
            isOn: isMaskReminderSet,
            createEventAsyncRes,
          },
          color: `rgb(${Math.floor(
            Math.random() * Math.floor(256)
          )},${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
            Math.random() * Math.floor(256)
          )})`,
        },
      ],
      markedDot: {
        date: currentDay,
        dots: [
          {
            key: uuid(),
            color: '#2E66E7',
            selectedDotColor: '#2E66E7',
          },
        ],
      },
    };

    // await value.updateTodo(creatTodo);
    addEventStore(creatTodo)
    // await updateCurrentTask(currentDate);
    navigation.navigate('Events');
  };

  _handleDatePicked = date => {
    const {
      state: {
        changeAlarmTime,currentDay
      },
    } = this;
    // const { currentDay } = this.state;
    const selectedDatePicked = currentDay;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    const newModifiedDay = moment(selectedDatePicked)
      .hour(hour)
      .minute(minute);


    if(!changeAlarmTime){
      this.setState({
        alarmTime: newModifiedDay,
        maskReminderTime: moment(newModifiedDay).subtract(15, "minutes"),
      });
    }
    else{
      this.setState({
        maskReminderTime: newModifiedDay,
      });
    }

    this._hideDateTimePicker();
  };

  // _onTimeSet = (event, selectedDate) => {

  //   const {
  //     state: {
  //       changeAlarmTime
  //     },
  //   } = this;

  //   console.log(selectedDate)

  //   const currentDate = selectedDate ;

  //   console.log(changeAlarmTime,currentDate)

  //   if(changeAlarmTime){
  //     this.setState({
  //       maskReminderTime: currentDate,
  //     });
  //   }
  //   else{
  //     this.setState({
  //       alarmTime: currentDate,
  //     });
  //   }
  // }

  render() {
    const {
      state: {
        selectedDay,
        currentDay,
        taskText,
        visibleHeight,
        notesText,
        isMaskReminderSet,
        alarmTime,
        maskReminderTime,
        changeAlarmTime,
        isDateTimePickerVisible,
      },
      props: { navigation },
    } = this;


    return (
      <Context.Consumer>
        {value => (
          <>
{isDateTimePickerVisible && (
            // <Task isModalVisible={isDateTimePickerVisible} style={ {height: 350}}>
            //   <View style={styles.taskContainer}>
            //     <DateTimePicker
            //       // disabled={false}
            //       // onConfirm={this._handleDatePicked}
            //       // onCancel={this._hideDateTimePicker}
            //       // mode="time"
            //       // value={ new Date(alarmTime)}

            //       testID="dateTimePicker"
            //       value={ new Date(!changeAlarmTime ? alarmTime : maskReminderTime)}
            //       mode={"time"}
            //       is24Hour={true}
            //       display="default"
            //       onChange={this._onTimeSet}
            //     />
            //     <TouchableOpacity
            //       onPress={async () => {this.setState({ isDateTimePickerVisible: false })}}
            //       style={styles.updateButton}
            //     >
            //       <Text
            //         style={{
            //           fontSize: 18,
            //           textAlign: 'center',
            //           color: '#fff',
            //         }}
            //       >
            //         CONFIRM
            //       </Text>
            //     </TouchableOpacity>
            //   </View>
            // </Task>
                            <DateTimePicker 
                            isVisible={isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked }
                            onCancel={this._hideDateTimePicker}
                            value={alarmTime}
                            mode="time"
                          />
            )}
            <View style={styles.container}>              
              <View>
                <ScrollView>
                  <View style={styles.calenderContainer}>
                    <CalendarList
                      style={{
                        width: 350,
                        height: 350,
                      }}
                      current={currentDay}
                      minDate={moment().format()}
                      horizontal
                      pastScrollRange={0}
                      pagingEnabled
                      calendarWidth={350}
                      onDayPress={day => {
                        this.setState({
                          selectedDay: {
                            [day.dateString]: {
                              selected: true,
                              selectedColor: '#2E66E7',
                            },
                          },
                          currentDay: day.dateString,
                          alarmTime: day.dateString,
                        });
                      }}
                      monthFormat="yyyy MMMM"
                      hideArrows
                      // markingType="simple"
                      theme={{
                        selectedDayBackgroundColor: '#2E66E7',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#2E66E7',
                        backgroundColor: '#eaeef7',
                        calendarBackground: '#eaeef7',
                        textDisabledColor: '#d9dbe0',
                      }}
                      markedDates={selectedDay}
                    />
                  </View>
                  <View style={styles.taskContainer}>
                    <TextInput
                      style={styles.title}
                      onChangeText={text => this.setState({ taskText: text })}
                      value={taskText}
                      placeholder="Event"
                    />
                    <View style={styles.notesContent} />
                    <View>
                      <TextInput
                        style={{
                          height: 25,
                          fontSize: 19,
                          marginTop: 3,
                        }}
                        onChangeText={text =>
                          this.setState({ notesText: text })
                        }
                        value={notesText}
                        placeholder="Notes"
                      />
                    </View>
                    <View style={styles.seperator} />
                      <View>
                        <Text
                          style={{
                            color: '#9CAAC4',
                            fontSize: 16,
                            fontWeight: '600',
                          }}
                        >
                          Time
                        </Text>
                        <TouchableOpacity
                          onPress={() => this._showDateTimePicker(false)}
                          style={{
                            height: 25,
                            marginTop: 3,
                          }}
                        >
                          <Text style={{ fontSize: 19 }}>
                            {moment(alarmTime).format('h:mm A')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    <View style={styles.seperator} />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            color: '#9CAAC4',
                            fontSize: 16,
                            fontWeight: '600',
                          }}
                        >
                          Wear Mask Reminder
                        </Text>
                        <TouchableOpacity
                          onPress={() => this._showDateTimePicker(true)}
                          style={{
                            height: 25,
                            marginTop: 3,
                          }}
                        >
                          <Text style={{ fontSize: 19 }}>
                            {moment(maskReminderTime).format('h:mm A')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    disabled={taskText === ''}
                    style={[
                      styles.createTaskButton,
                      {
                        backgroundColor:
                          taskText === ''
                            ? 'rgba(46, 102, 231,0.5)'
                            : '#2E66E7',
                      },
                    ]}
                    onPress={async () => {await this.synchronizeCalendar(value);
                    }}
                  >
                    {/* maskReminderTime: moment().subtract(15, "minutes").format(), */}
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}
                    >
                      ADD YOUR TASK
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </>
        )}
      </Context.Consumer>
    );
  }
}


const styles = StyleSheet.create({
  createTaskButton: {
    width: 252,
    height: 48,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 25,
    justifyContent: 'center',
    marginBottom: 40,
  },
  seperator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  notes: {
    color: '#9CAAC4',
    fontSize: 16,
    fontWeight: '600',
  },
  notesContent: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  learn: {
    height: 23,
    width: 51,
    backgroundColor: '#F8D557',
    justifyContent: 'center',
    borderRadius: 5,
  },
  design: {
    height: 23,
    width: 59,
    backgroundColor: '#62CCFB',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  readBook: {
    height: 23,
    width: 83,
    backgroundColor: '#4CD565',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  title: {
    height: 25,
    fontSize: 19,
  },
  taskContainer: {
    height: 330,
    width: 327,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#ffffff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.32,
    elevation: 5,
    padding: 22,
  },
  calenderContainer: {
    marginTop: 30,
    width: 350,
    height: 350,
    alignSelf: 'center',
  },
  newTask: {
    alignSelf: 'center',
    fontSize: 20,
    width: 120,
    height: 25,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    marginTop: 60,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#eaeef7',
  },
  updateButton: {
    backgroundColor: '#2E66E7',
    width: 100,
    height: 38,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
    marginRight: 20,
  },
});