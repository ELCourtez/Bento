const calendar = {};
getCalendar();


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
		console.log(vtodos);
		let j = 0;
		vtodos.forEach(function (item) {
			my_todos[j]=[];
			item[1].forEach(function(variable){
				if(variable[0] === 'summary' || variable[0] === 'created' || variable[0] === 'uid' || variable[0] === 'related-to' || variable[0] === 'priority'){
					my_todos[j][variable[0]]=variable[3];
				}
			});
			j = j+1;
		});
		todo_uid = my_todos.filter(element => (element['summary']).toUpperCase() === 'TODO');
		console.log(todo_uid);
		my_todos = my_todos.sort((alement, blement) => Date.parse(blement['created']) - Date.parse(alement['created']));
		calendar.todos = my_todos;
		console.log(calendar);
	})
	.then(function(){
		if(CONFIG.bentoLayout === 'bentocalendar'){
			generateFirstListsContainerCalendar();
		}
	});
}


const generateFirstListsContainerCalendar = () => {
	let item =`
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
	const position = 'beforeend';
	lists_1.insertAdjacentHTML(position, item);
	
	lists = CONFIG.firstlistsContainer;
	let item2 = `
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
	lists_1.insertAdjacentHTML(position, item2);
};
