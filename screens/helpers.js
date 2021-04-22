import AsyncStorage from '@react-native-async-storage/async-storage';

export function dateFormat(date) {

  const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June",
  "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."
  ];

  const dayFormat = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"]

  const d = new Date(date);

  let date_formatted = dayFormat[d.getDate()-1] + " "+ monthNames[d.getMonth()] + " " + d.getFullYear();

  return date_formatted; 
}

export function durationFormat(date){

  let hours = Math.floor(date / (60 * 60));
  let minutes = Math.floor((date % (60 * 60)) / 60);

  return hours + "h " + minutes + "m"; 

}

export async function addEventStore(obj){
  let todoList = await AsyncStorage.getItem("TODO");

  if(todoList === null)
  {
    AsyncStorage.setItem("TODO", JSON.stringify([obj]));
  }
  else{
    todoList = JSON.parse(todoList);
    todoList.push(obj)

    AsyncStorage.setItem("TODO", JSON.stringify(todoList));
  }
}

export async function UpdateEvent(date, ){
  try{
    let todoList = await AsyncStorage.getItem("TODO");

    if(todoList === null)
    {
      AsyncStorage.setItem("TODO", JSON.stringify([obj]));
    }
    else{
      todoList = JSON.parse(todoList);
      todoList.push(obj)
  
      AsyncStorage.setItem("TODO", JSON.stringify(todoList));
    }
  }
  catch(e){
    // throw error
  }
}

export async function storeData(){

  try {
    // setWelcomeScreen({"welcomeScreen": '1'})
    await AsyncStorage.setItem( 'auth', '1' );

  } catch (error) {
    // Error saving data
    alert(error)
  }

  return true;
}