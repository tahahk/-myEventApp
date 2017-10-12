var database = firebase.database().ref('/');
var loggedInUser = JSON.parse(localStorage.getItem('user'));
var uid = localStorage.getItem('loggedInUser')
if (uid === null) {
    location = '../index.html'
}
var userName = document.getElementById('username');
var eName = document.getElementById('event');
var date = document.getElementById('input-date');
var city = document.getElementById('city');
var description = document.getElementById('short-description');
var place = document.getElementById('venue');
var price = document.getElementById('price');
var hosts = document.getElementById('hosts');
var div1 = document.getElementById('div1');
var div2 = document.getElementById('allEvents');
var div3 = document.getElementById('user-events');
var dateErrDiv = document.getElementById('wrong-input');
var currentDate = new Date()

//make event to show the hidden form to create a event
function makeEvent() {
    div2.style.display = 'none';
    div1.style.display = 'block';
    div3.style.display = 'none';
    var btn = document.getElementById('near');
}
//Submit event will work when user click create event after filling create event form throughly
function submitEvent() {
    var nDate = new Date(date.value);
    console.log(typeof (nDate))
    // if statements to avoid any blank fields

    if (eName.value == '' || eName.value == ' ' || eName.value === '  ') {
        eName.style.border = '1px solid red';
        return false;
    }
    //Event date should not be before current date
    if (nDate <= currentDate) {
        dateErrDiv.style.display = 'inline'
        dateErrDiv.style.color = 'red';
        dateErrDiv.innerHTML = 'Please Input A Later Date/Time';
        date.style.border = '1px solid red';
        return false;
    }
    //to check if date time field is correctly filled 
    if (isNaN(nDate)) {
        dateErrDiv.style.display = 'inline'
        dateErrDiv.style.color = 'red';
        dateErrDiv.innerHTML = 'Please Enter A valid Year';
        date.style.border = '1px solid red';
        return false;
    }
    if (city.value == '' || city.value == ' ' || city.value === '  ') {
        city.style.border = '1px solid red';
        return false;
    }
    if (description.value == '' || description.value == ' ' || description.value === '  ') {
        description.style.border = '1px solid red';
        return false;
    }
    if (place.value == '' || place.value == ' ' || place.value === '  ') {
        place.style.border = '1px solid red';
        return false;
    }
    if (price.value == '' || price.value == ' ' || price.value === '  ') {
        price.style.border = '1px solid red';
        return false;
    }
    if (hosts.value == '' || hosts.value == ' ' || hosts.value === '  ') {
        hosts.style.border = '1px solid red';
        return false;
    }
    else {

        dateErrDiv.style.display = 'none'
        eName.style.border = 'none';
        date.style.border = 'none';
        city.style.border = 'none';
        description.style.border = 'none';
        place.style.border = 'none';
        price.style.border = 'none';
        hosts.style.border = 'none';
        var hr = nDate.getHours();
        var min = nDate.getMinutes();

        if (hr < 10) {
            hr = '0' + hr
        }
        if (min < 10) {
            min = '0' + min
        }
        var eventObj = {
            eName: eName.value,
            dateTime: nDate.toString(),
            date: nDate.toDateString(),
            time: hr + ' : ' + min,
            city: city.value,
            des: description.value,
            venue: place.value,
            price: price.value,
            hosts: hosts.value,
            going: [0],
            eventPostedBy: loggedInUser.fName,
        }
        database.child('posts').push(eventObj);
    }
    eName.value = '';
    date.value = '';
    city.value = '';
    description.value = '';
    place.value = '';
    price.value = '';
    hosts.value = '';
}
//Every available event created by any user will be shown 
function showEvents() {
    div1.style.display = 'none';
    div2.style.display = 'block';
    div3.style.display = 'none';
}
//only events marked by user as going will be shown
function showGoing() {
    div1.style.display = 'none';
    div2.style.display = 'none';
    div3.style.display = 'block';
}
//to render all events created by any user registered with this app
allEvents();

function allEvents() {
    var child = database.child('posts');
    child.on('child_added', function (snap) {
        var eventObj = snap.val();
        eventObj.id = snap.key;

        /*if a user clicks going than that event will be excluded in all events 
        and its div will not be created*/

        var userGoing = 0;
        var dbTime = new Date(eventObj.dateTime)
        for (var i = 0; i < eventObj.going.length; i++) {
            if (uid == eventObj.going[i] || dbTime < currentDate) {
                userGoing = 1;
                // return false;
            }
            else {
                userGoing = 0;
            }
        }

        //if userGoing for any event will be 0 that event will be excluded from all events list 
        if (userGoing === 0) {
            //initializing Divs
            var mainDiv = document.createElement('DIV');
            var divBody = document.createElement('DIV');
            divBody.className = 'card-body';
            var ekOrDiv = document.createElement('Div');
            ekOrDiv.classList.add('card', 'card1', 'text-white', 'bg-info', 'col-10');
            var btnsDiv = document.createElement('DIV');
            mainDiv.className = 'for-background';
            mainDiv.setAttribute('id', eventObj.id);
            //Event Name
            var head = document.createElement('H4');
            var nameSpan = document.createElement('SPAN');
            var nameText = document.createTextNode(eventObj.eName);
            nameSpan.appendChild(nameText);
            head.classList.add('bg-transparet', 'border-bottom', 'card-title', 'name');
            nameSpan.className = 'head'
            head.appendChild(nameSpan);
            //For Date And Time
            var dateHead = document.createElement('H4');
            var eventDate = document.createTextNode('Date: ')
            var dateSpan = document.createElement('SPAN');
            var dateText = document.createTextNode(eventObj.date);
            dateSpan.appendChild(dateText);
            dateSpan.classList.add('date', 'small-font');
            dateHead.appendChild(eventDate);
            dateHead.appendChild(dateSpan);
            //time
            var timeHead = document.createElement('H4');
            var eventTime = document.createTextNode('Time: ');
            var timeSpan = document.createElement('SPAN');
            var time = document.createTextNode(eventObj.time);
            timeSpan.appendChild(time);
            timeSpan.classList.add('time', 'small-font');
            timeHead.appendChild(eventTime);
            timeHead.appendChild(timeSpan);
            //For venue
            var venueHead = document.createElement('h5');
            var venueText = document.createTextNode('Venue: ');
            var venueSpan = document.createElement('SPAN');
            var venueName = document.createTextNode(eventObj.venue);
            venueSpan.classList.add('small-font', 'venue');
            venueHead.appendChild(venueText);
            venueSpan.appendChild(venueName);
            venueHead.appendChild(venueSpan);
            // for city
            var cityHead = document.createElement('H4');
            var eventCity = document.createTextNode('City: ');
            var citySpan = document.createElement('SPAN');
            var cityText = document.createTextNode(eventObj.city);
            citySpan.classList.add('small-font', 'city');
            citySpan.appendChild(cityText);
            cityHead.appendChild(eventCity);
            cityHead.appendChild(citySpan);
            // For price
            var priceHead = document.createElement('H4');
            var passPrice = document.createTextNode('Price: ');
            var priceSpan = document.createElement('SPAN');
            var priceText = document.createTextNode(eventObj.price);
            priceSpan.classList.add('small-font', 'price');
            priceSpan.appendChild(priceText);
            priceHead.appendChild(passPrice);
            priceHead.appendChild(priceSpan);
            //for description
            var desHead = document.createElement('H4');
            var eventDes = document.createTextNode('Description: ');
            var desSpan = document.createElement('SPAN');
            var desText = document.createTextNode(eventObj.des);
            desSpan.classList.add('small-font', 'event-des');
            desSpan.appendChild(desText);
            desHead.appendChild(eventDes);
            desHead.appendChild(desSpan);
            //for buttons
            var btn1 = document.createElement('BUTTON');
            var btn2 = document.createElement('BUTTON');
            btn1.classList.add('btn', 'btn-lg', 'btn-success', 'lt-position');
            btn2.classList.add('btn', 'btn-lg', 'btn-danger', 'rt-position');
            btn1.textContent = 'Going';
            btn2.textContent = 'Not Going';
            btnsDiv.className = 'btn-div';

            //appending childs of Each div
            ekOrDiv.appendChild(divBody);
            div2.appendChild(mainDiv);
            divBody.appendChild(head);
            divBody.appendChild(dateHead);
            divBody.appendChild(timeHead);
            divBody.appendChild(venueHead);
            divBody.appendChild(cityHead);
            divBody.appendChild(priceHead);
            divBody.appendChild(desHead);
            divBody.appendChild(btn1);
            mainDiv.appendChild(ekOrDiv);

            btn1.onclick = function () {
                eventObj.going.push(uid);
                database.child('posts/' + eventObj.id).update(eventObj);
                goingEvents(eventObj, eventObj.id);
            }

        }
    })
}

function goingEvents(going, id) {
    database.child('goingEvents/' + uid).push(going);
    var removeGoingEvent = document.getElementById(id);
    div2.removeChild(removeGoingEvent);
}

database.child('goingEvents/' + uid).on('child_added', function (snapshot) {
    var renderGoingEvent = snapshot.val();
    var goingEventKey = snapshot.key
    userEvents(renderGoingEvent, goingEventKey)
})
/*------------------>Funtion-For-Events-Marked-By-User-As-Going<-----------------*/
function userEvents(goingObj, goingId) {
    //initializing Divs
    var mainDiv = document.createElement('DIV');
    var divBody = document.createElement('DIV');
    divBody.className = 'card-body';
    var ekOrDiv = document.createElement('Div');
    ekOrDiv.classList.add('card', 'card1', 'text-white', 'bg-info', 'col-10');
    var btnsDiv = document.createElement('DIV');
    mainDiv.className = 'for-background';
    mainDiv.setAttribute('id', goingId)
    //Event Name
    var head = document.createElement('H4');
    // var eventName = document.createTextNode('Event Name: ');
    var nameSpan = document.createElement('SPAN');
    var nameText = document.createTextNode(goingObj.eName);
    nameSpan.appendChild(nameText);
    head.classList.add('bg-transparet', 'border-bottom', 'card-title', 'name');
    nameSpan.className = 'head'
    head.appendChild(nameSpan);
    //For Date And Time
    var dateHead = document.createElement('H4');
    var eventDate = document.createTextNode('Date: ')
    var dateSpan = document.createElement('SPAN');
    var dateText = document.createTextNode(goingObj.date);
    dateSpan.appendChild(dateText);
    dateSpan.classList.add('date', 'small-font');
    dateHead.appendChild(eventDate);
    dateHead.appendChild(dateSpan);
    //time
    var timeHead = document.createElement('H4');
    var eventTime = document.createTextNode('Time: ');
    var timeSpan = document.createElement('SPAN');
    var time = document.createTextNode(goingObj.time);
    timeSpan.appendChild(time);
    timeSpan.classList.add('time', 'small-font');
    timeHead.appendChild(eventTime);
    timeHead.appendChild(timeSpan);
    //For venue
    var venueHead = document.createElement('h5');
    var venueText = document.createTextNode('Venue: ');
    var venueSpan = document.createElement('SPAN');
    var venueName = document.createTextNode(goingObj.venue);
    venueSpan.classList.add('small-font', 'venue');
    venueHead.appendChild(venueText);
    venueSpan.appendChild(venueName);
    venueHead.appendChild(venueSpan);
    // for city
    var cityHead = document.createElement('H4');
    var eventCity = document.createTextNode('City: ');
    var citySpan = document.createElement('SPAN');
    var cityText = document.createTextNode(goingObj.city);
    citySpan.classList.add('small-font', 'city');
    citySpan.appendChild(cityText);
    cityHead.appendChild(eventCity);
    cityHead.appendChild(citySpan);
    // For price
    var priceHead = document.createElement('H4');
    var passPrice = document.createTextNode('Price: ');
    var priceSpan = document.createElement('SPAN');
    var priceText = document.createTextNode(goingObj.price);
    priceSpan.classList.add('small-font', 'price');
    priceSpan.appendChild(priceText);
    priceHead.appendChild(passPrice);
    priceHead.appendChild(priceSpan);
    //for description
    var desHead = document.createElement('H4');
    var eventDes = document.createTextNode('Description: ');
    var desSpan = document.createElement('SPAN');
    var desText = document.createTextNode(goingObj.des);
    desSpan.classList.add('small-font', 'event-des');
    desSpan.appendChild(desText);
    desHead.appendChild(eventDes);
    desHead.appendChild(desSpan);
    //for buttons
    var btn2 = document.createElement('BUTTON');
    btn2.classList.add('btn', 'btn-lg', 'btn-danger', 'not-going');
    btn2.textContent = 'Not Going';

    btn2.onclick = function () {
        database.child('posts/' + goingObj.id).once('value', function (snapS) {
            var goingUsers = snapS.val();
            var goingArr = goingUsers.going;
            //not going button will also delete uid from going array from database        
            for (var i = 0; i < goingArr.length; i++) {
                if (goingArr[i] == uid) {
                    goingArr.splice(i, 1);
                }
            }
            //for firebase .push method is not used for pushing existing arrays so .set method is used here.
            database.child('posts/' + goingObj.id + '/' + 'going/').set(goingArr)
            database.child('goingEvents/' + uid + '/' + goingId).remove()
            var removeGoingEvent = document.getElementById(goingId);
            div3.removeChild(removeGoingEvent);
            div2.innerHTML = ''
            allEvents()
        })
    }
    // appending childs of respective divs
    ekOrDiv.appendChild(divBody);
    div3.appendChild(mainDiv);
    divBody.appendChild(head);
    divBody.appendChild(dateHead);
    divBody.appendChild(timeHead);
    divBody.appendChild(venueHead);
    divBody.appendChild(cityHead);
    divBody.appendChild(priceHead);
    divBody.appendChild(desHead);
    divBody.appendChild(btn2)
    mainDiv.appendChild(ekOrDiv);
}
function logOut() {
    localStorage.clear('user');
    localStorage.clear('loggedInUser');
    window.location = '../index.html';
}