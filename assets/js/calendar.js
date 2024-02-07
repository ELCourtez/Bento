/**/
const calendar = {};
setCalendar();

function setCalendar() {
	getCalendar(CONFIG.defaultLatitude, CONFIG.defaultLongitude);
	return;
}

function getCalendar() {
            var myHeaders = new Headers();
	    const key = `${CONFIG.calendarKey}`;
	    const uri = `${CONFIG.calendarURI}`;
	    console.log(key);
            myHeaders.append("Authorization", "Basic " + key);
            myHeaders.append("Cookie", "cookie_test=test; __Host-nc_sameSiteCookielax=true; __Host-nc_sameSiteCookiestrict=true; oc_sessionPassphrase=RoJZ1ye9HwatXWr9VaihFKLwPjOGrdlqzRCn7ajz06c5hyKT%2Bc6NhH8AOpLz%2BIkdd6M1A0TJGh9GsNrGbgYJlT5ppNRJUh9LOUJcDWiJKdm4zk7iQLIfo8FBEZDkkWmA; ocjug6sjwdyv=n0nf2t9bpke8o9f31nhjs0uc9v");
            myHeaders.append("Content-Type", "application/json");

            var myHeader = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic amJlbmFyZDoxakJHX3UxNEpvc1Q5QzE='
            };

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
			

	let api = uri;
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
			calendar.events = my_events;
		})
		.then(function(){
			if(CONFIG.bentoLayout === 'bentocalendar'){
				generateFirstListsContainerCalendar();
			}
		});
}
const generateFirstListsContainerCalendar = () => {

	for (let i = 0; i < 4; i++) 
	{
			let item = `
		<div class="card list list__1" id="list_1">
		  <i class="listIcon" icon-name="calendar"></i>
		  <a
		  target="${CONFIG.openInNewTab ? '_blank' : ''}"
		  href="#"
		  class="listItem"
		  >${calendar.events[0].summary}</a>
		  <a
		  target="${CONFIG.openInNewTab ? '_blank' : ''}"
		  href="#"
		  class="listItem"
		  >${calendar.events[1].summary}</a>
		  <a
		  target="${CONFIG.openInNewTab ? '_blank' : ''}"
		  href="#"
		  class="listItem"
		  >${calendar.events[2].summary}</a>
		  <a
		  target="${CONFIG.openInNewTab ? '_blank' : ''}"
		  href="#"
		  class="listItem"
		  >${calendar.events[3].summary}</a>
		</div>
		  `;
	} 

	lists = CONFIG.firstlistsContainer;
		item = item + `
	<div class="card list list__${lists[1].id}" id="list_${lists[1].id}">
	  <i class="listIcon" icon-name="${lists[1].icon}"></i>
	  <a
	  target="${CONFIG.openInNewTab ? '_blank' : ''}"
	  href="${lists[1].links[0].link}"
	  class="listItem"
	  >${lists[1].links[0].name}</a>
	  <a
	  target="${CONFIG.openInNewTab ? '_blank' : ''}"
	  href="${lists[1].links[1].link}"
	  class="listItem"
	  >${lists[1].links[1].name}</a>
	  <a
	  target="${CONFIG.openInNewTab ? '_blank' : ''}"
	  href="${lists[1].links[2].link}"
	  class="listItem"
	  >${lists[1].links[2].name}</a>
	  <a
	  target="${CONFIG.openInNewTab ? '_blank' : ''}"
	  href="${lists[1].links[3].link}"
	  class="listItem"
	  >${lists[1].links[3].name}</a>
	</div>
      `;
		const position = 'beforeend';
		lists_1.insertAdjacentHTML(position, item);
};
