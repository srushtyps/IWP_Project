// const firebaseConfig = {
// 	apiKey: "AIzaSyDjyl9cLRRLKOIc98tcwZeotQJPto79Ssw",
// 	authDomain: "quizzo-e5530.firebaseapp.com",
// 	databaseURL: "https://quizzo-e5530-default-rtdb.asia-southeast1.firebasedatabase.app/",
// 	projectId: "quizzo-e5530",
// 	storageBucket: "quizzo-e5530.appspot.com",
// 	messagingSenderId: "45527319469",
// 	appId: "1:45527319469:web:88e4fbd64cae415c3ad724"
// };

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const form = document.querySelector('.form-container form');
const inputs = document.querySelectorAll('.form-container input');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	inputs.forEach((input) => {
		if (!input.value) {
			input.parentElement.classList.add('error');
		} else {
			input.parentElement.classList.remove('error');
			if (input.type == 'email') {
				if (validateEmail(input.value)) {
					input.parentElement.classList.remove('error');
				} else {
					input.parentElement.classList.add('error');
				}
			}
		}
	});
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
	window.location.href ='../iwp/index.html';
}

function writeUserData(userId, first_name, last_name, email) {
	db.collection("Users").doc(userId).set({
		first_name: first_name,
		last_name: last_name,
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
	first_name= document.getElementById('first-name').value;
	last_name= document.getElementById('last-name').value;
	email= document.getElementById('Email').value;
	password= document.getElementById('password').value;
	popup = document.getElementById('popup');
	
	console.log(first_name);
	console.log(last_name);
	console.log(email);
	console.log(password);
	
	
	if(validateEmail(email) == false || validatePassword(password) ==false){
		alert("Email or Password in wrong format");
		//I'm here na, even though you might not be able to hug me, but I'm always with you;
		return;
	}
	
	if(validateName(first_name) ==false || validateName(last_name)==false){
		alert("Name cannot be empty");
		return;
	}
	
	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then((userCredential) => { 
		const user = userCredential.user;
		console.log("auth done");
		writeUserData(user.uid, first_name, last_name, email);
	})
	.catch((error) => {
		const errorCode = error.code;
    const errorMessage = error.message;
	console.log(errorCode);
	alert(errorMessage);
  });
}
