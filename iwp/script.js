
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBRAQ5m5ixVOFGRpHyOGovApBUYk7tPowk",
    authDomain: "iwpproject-b4c68.firebaseapp.com",
    projectId: "iwpproject-b4c68",
	databaseURL: "https://iwpproject-b4c68-default-rtdb.asia-northeast3.firebasedatabase.app/",
    storageBucket: "iwpproject-b4c68.appspot.com",
    messagingSenderId: "646628849069",
    appId: "1:646628849069:web:807b400f9a6eed7f0fdd24"
  };
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const form = document.querySelector('.sign-up-container form');
const inputs = document.querySelectorAll('.sign-up-container input');

form.addEventListener('signup', (e) => {
	e.preventDefault();
	// inputs.forEach((input) => {
	// 	if (!input.value) {
	// 		input.parentElement.classList.add('error');
	// 	} else {
	// 		input.parentElement.classList.remove('error');
	// 		if (input.type == 'email') {
	// 			if (validateEmail(input.value)) {
	// 				input.parentElement.classList.remove('error');
	// 			} else {
	// 				input.parentElement.classList.add('error');
	// 			}
	// 		}
	// 	}
	// });
	signUp();
});

function validateEmail (email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}
function validatePassword(password){
	if(password <6){
		return false;
	}
	else{
		return true;
	}
}
function validateName(name){
	if(!name){
		return false;
	}
	else{
		return true;
	}
}

function changeWindow(){
	window.location.href ='./main.html';
}

function writeUserData(name, email) {
	db.collection("Users").doc(email).set({
		// first_name: first_name,
		// last_name: last_name,
		name : name,
		email: email
	}).then(() => {
		console.log("data written");
		setTimeout(function(){
			popup.classList.toggle("popupShow");
		}, 800);
	})
}

function signUp(){
	console.log("signUp called");
	_name= document.getElementById('name').value;
	//last_name= document.getElementById('last-name').value;
	email= document.getElementById('email').value;
	password= document.getElementById('password').value;
	popup = document.getElementById('popup');
	
	console.log(_name);
	//console.log(last_name);
	console.log(email);
	//console.log(password);
	
	
	if(validateEmail(email) == false || validatePassword(password) ==false){
		alert("Email or Password in wrong format");
		
		return;
	}
	
	if(validateName(_name) ==false ){
		alert("Name cannot be empty");
		return;
	}
	
	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then((userCredential) => { 
		const user = userCredential.user;
		console.log("auth done");
		writeUserData(_name, email);
	})
	.catch((error) => {
		const errorCode = error.code;
    const errorMessage = error.message;
	console.log(errorCode);
	alert(errorMessage);
  });
}
