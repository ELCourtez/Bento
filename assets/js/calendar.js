const calendar = {};
getCalendar();
lucide.createIcons();

function getCalendar() {
	var myHeaders = new Headers();
	const key = `${CONFIG.calendarKey}`;
	const uri = `${CONFIG.calendarURI}`;
	myHeaders.append("Authorization", "Basic " + key);
	myHeaders.append("Content-Type", "application/json");
	
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

		let vtodos = data[2].filter(element => element[0] === 'vtodo' );
		let my_todos = [];		
		console.log(vevents);
		let j = 0;
		vtodos.forEach(function (item) {
			my_todos[j]=[];
			item[1].forEach(function(variable){
				if(variable[0] === 'summary' || variable[0] === 'created' || variable[0] === 'uid' || variable[0] === 'related-to' || variable[0] === 'priority' || variable[0] === 'status'){
					my_todos[j][variable[0]]=variable[3];
				}
			});
			j = j+1;
		});
		let todo_uid = (my_todos.find(element => (element['summary']).toUpperCase() === 'TODO'))['uid'];
		my_todos = my_todos.filter(element => element['related-to'] === todo_uid && element['status']!== 'COMPLETED');
		my_todos = my_todos.sort((alement, blement) => Date.parse(blement['created']) - Date.parse(alement['created']));
		calendar.todos = my_todos;
		console.log(calendar);
	})
	.then(function(){
		if(CONFIG.bentoLayout === 'bentocalendar'){
			generateFirstListsContainerCalendar();
			lucide.createIcons();
		}
	})
	.then(function(){
		lucide.createIcons();
	});
}


const generateFirstListsContainerCalendar = () => {
	let item =`
		<div class="agenda card list list__1" id="list_1">
		<i class="listIcon" data-lucide="calendar"></i>`;
  		for(let i = 0; i < 4; i++){
			item = item + `<a style="display:flex;"
			target="${CONFIG.openInNewTab ? '_blank' : ''}"
			href="#"
			class="listItem">
   			<span class="event-date" style="padding-right:5px;">${(new Date(calendar.events[i].dtstart)).getDate()}/${(new Date(calendar.events[i].dtstart)).getMonth()}</span>
   			<span class="event-name">${(calendar.events[i].summary).substring(0, 20)}</span>
      			</a>`;
  		}
		item = item + `</div>
	`;
	const position = 'beforeend';
	lists_1.insertAdjacentHTML(position, item);
	
	/*lists = CONFIG.firstlistsContainer;
	let item2 = `
		<div class="card list list__${lists[1].id}" id="list_${lists[1].id}">
		<i class="listIcon" data-lucide="${lists[1].icon}"></i>
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
	lists_1.insertAdjacentHTML(position, item2);*/
	let item2 =`
		<div class="agenda card list list__1" id="list_1">
		<i class="listIcon" data-lucide="calendar"></i>`;
  		for(let i = 0; i < 4; i++){
			item2 = item2 + `<a style="display:flex;"
			target="${CONFIG.openInNewTab ? '_blank' : ''}"
			href="#"
			class="listItem">
				<span class="event-name">${(calendar.todos[i].summary).substring(0, 20)}</span>
      		</a>`;
  		}
		item2 = item2 + `</div>
	`;
	const position = 'beforeend';
	lists_1.insertAdjacentHTML(position, item2);
};
