/**/
getCalendar();

function getCalendar(latitude, longitude) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic " + `${CONFIG.calendarKey}`);
            myHeaders.append("Cookie", "cookie_test=test; __Host-nc_sameSiteCookielax=true; __Host-nc_sameSiteCookiestrict=true; oc_sessionPassphrase=RoJZ1ye9HwatXWr9VaihFKLwPjOGrdlqzRCn7ajz06c5hyKT%2Bc6NhH8AOpLz%2BIkdd6M1A0TJGh9GsNrGbgYJlT5ppNRJUh9LOUJcDWiJKdm4zk7iQLIfo8FBEZDkkWmA; ocjug6sjwdyv=n0nf2t9bpke8o9f31nhjs0uc9v");
            myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
			

	let api = `${CONFIG.calendarURI}`;
	fetch(api, requestOptions)
		.then(function(response) {
			let data = response.json();
			return data;
		})
		.then(function(data) {
			let vevents = data[2].filter(element => element[0] === 'vevent' );
			let my_events = [];
			let i = 0;
			vevents.forEach(function (item) {
	    		  my_events[i]=[];
			  item[1].forEach(function(variable){
				if(variable[0] === 'summary' || variable[0] === 'dtstart'){
					my_events[i][variable[0]]=variable[3];
				}
			  });
			i = i+1;
			});
			my_events = my_events.filter(element => Date.parse(element['dtstart']) > Date.now());
			my_events = my_events.sort((alement, blement) => Date.parse(alement['dtstart']) - Date.parse(blement['dtstart']));
		});
}

function displayCalendar() {
	iconElement.innerHTML = `<img src="assets/icons/${CONFIG.weatherIcons}/${weather.iconId}.png"/>`;
	tempElement.innerHTML = `${weather.temperature.value.toFixed(0)}°<span class="darkfg">${tempUnit}</span>`;
	descElement.innerHTML = weather.description;
}
