var database = firebase.database().ref('/')
var auth = firebase.auth()

var firstName = document.getElementById('fName')
var lastName = document.getElementById('lName')
var email = document.getElementById('email')
var password = document.getElementById('password')
var cell = document.getElementById('cellNo')
var age = document.getElementById('age') ;

    

function signup(){
    console.log(email)
    var users = {
        fName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        pass: password.value,
        cellNo: cell.value,
        age: age.value
    }

    firebase.auth().createUserWithEmailAndPassword(users.email, users.pass)
        .then(function (res) {
            database.child('users/' + res.uid).set(users)
            // location = 'login/login.html'
            alert('success')

        })
       
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        })
}
// firebase.initializeApp(config);
var database = firebase.database().ref('/')
var userEmail = document.getElementById('user-email');
var pass = document.getElementById('user-password');
document.getElementById("stop").addEventListener("submit", function (event) {
    if (userEmail.value != "" || pass.value != "") {
    event.preventDefault();
    var user = {
        email: userEmail.value,
        password: pass.value
    }
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(function (success) {
            database.child('users/' + success.uid).once("value", function (snapshot) {
               localStorage.setItem("user",JSON.stringify(snapshot.val()))
                location='home/home.html'
                localStorage.setItem('loggedInUser',snapshot.key)

            })
        // console.log(success.uid)
    })    
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode === 'auth/wrong-password') {
    alert('Wrong password.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
});
    }
})


