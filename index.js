// GPIO requirements and config
// button is attached to pin 17, led attached to pin 18
var GPIO = require('onoff').Gpio;
/*
let buttonPins = [17,22,9,6];
let ledPins = [18,23,25,12];

var GPIObuttons = [];
var GPIOLEDs = [];

for(var i = 0; i<buttonPins.length;i++)
{	
	GPIObuttons[i] = new GPIO(buttonPins[i],'in','both');
	GPIOLEDs[i] = new GPIO(ledPins[i],'out');
}
*/

//var led = new GPIO(ledPins[0],'out'),
//	 button = new GPIO(buttonPins[0],'in','both');

var led = new GPIO(18,'out'),
	button = new GPIO(17,'in','both');

var led1 = new GPIO(23,'out'),
	button1 = new GPIO(22,'in','both');

var led2 = new GPIO(25,'out'),
	button2 = new GPIO(9,'in','both');

var led3 = new GPIO(12,'out'),
	button3 = new GPIO(6,'in','both');

// Firebase requirements and config
var firebase = require('firebase');
var config =
	{
	 apiKey: "AIzaSyAgmgU-8iOlTlEhU5L45i0gK5I5Ys9N5Qs",
	 authDomain: "fir-web-codelab-542e1.firebaseapp.com",
    	 projectId: "fir-web-codelab-542e1",
    	 storageBucket: "fir-web-codelab-542e1.appspot.com",
     	 messagingSenderId: "4156037743",
     	 appId: "1:4156037743:web:3c5adac63340a2c6b08b9a",
     	 measurementId: "G-5HCSHQSQHX"
	};
firebase.initializeApp(config);

console.log("begin LED");




//firebase database ref
var db = firebase.database();
var switchRef = db.ref('ledStates');
/*
var mondayData;
function changeLedStates()
{
	firebase.database().ref('ledStates').once('value').then((snapshot)=>{
		mondayData = (snapshot.val().Monday);

		firebaseSwitch(mondayData);
		console.log(mondayData);
		
	});
	
	
}

changeLedStates();

*/
//define callback function for firebase switch
function firebaseSwitch(state){

	//check the switch value in firebase
	//1 = on
	//0 = off
	if(state == 1)
	{
		led.writeSync(1);
		console.log("LED on(FIREBASE)");
	}
	
	else
	{
		led.writeSync(0);
		console.log("LED off(FIREBASE)");
	}
	
}


//definet he callback function for button press
function buttonPress(err,state)
{
	led.writeSync(1);
	//check the state of the button
	//1 = pressed
	//0 = not pressed
	if (state == 1)
	{
		//turn LED on
		led.writeSync(1);
		firebase.database().ref('ledStates').set({Monday:state});
	}
	
}

function buttonPress1(err,state)
{	
	led.writeSync(1);
	if(state == 1)
	{
		led1.writeSync(1);
		firebase.database().ref('ledStates').set({Monday:state,Tuesday:state});
	}
	
}

function buttonPress2(err,state)
{	led.writeSync(1);
	if (state == 1)
	{
		led2.writeSync(1);
		firebase.database().ref('ledStates').set({Monday:state,Tuesday:state,Wednesday:state});
	}
}

function buttonPress3(err,state)
{	led.writeSync(1);
	if (state == 1)
	{
		led3.writeSync(1);
		firebase.database().ref('ledStates').set({Monday:state,Tuesday:state,Wednesday:state,Thursday:state});
	}
	
}
//firebase key observer
switchRef.on('value', function(snapshot)
	{
		firebaseSwitch(snapshot.val());
	});

//button obserber
//pass the callback function
//as the fire argument to watch()
button.watch(buttonPress);
button1.watch(buttonPress1);
button2.watch(buttonPress2);
button3.watch(buttonPress3);
