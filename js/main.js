/* --- FUNCTIONS ---*/


function addContentToTable(table, columns, ...data) {
	
	let cells = data;
	let cellCount = 0;

	while (cellCount < cells.length) {
		// create and append a row:
		let tr = document.createElement('tr');
		table.tBodies[0].append(tr);
		// for every column create a cell on that row:
		for (i = 1; i <= columns; i++) {
			let td = document.createElement('td');
			td.textContent = cells[cellCount];
			tr.append(td);
			cellCount++
		}
	}
}
// TEST!!
function queryTableGetRow(table, query) {
	for (row of table.tBodies[0].children) {
		for (cell of row.children) {
			if (cell.textContent === query) {
				return row;
			}
		}
	}
}

function getLastStorageItem(storage) {
	let keys = Object.keys(deEnStorage);
}

// EVENT HANDLER

function handleInputFields(table) {
	return function(evt) {
		if (evt.key === "Enter") {
			try {
				let deIn = document.getElementById('de').value;
				let enIn = document.getElementById('en').value;
				deEnStorage.setItem(deIn, enIn);
				//document.getElementById('mirror-in').textContent = `added: ${deIn} = ${enIn}`;
				addContentToTable(table, 2, deIn, enIn);
			} catch(err) {
				//console.warn(err.name);
				//console.warn(err.message);
				console.warn(err.stack);
			}
		}
	}
}

function handleQueryField(table) {
	return function(evt) {
		if (evt.key === "Enter") {
			try {
				let query = evt.target.value;
				// --- search keys for query
				let result = deEnStorage.getItem(query);
				if (result) {
					//addContentToTable(table, 2, query, result);
					let cellMatch = queryTableGetRow(table, query);
					cellMatch.style.backgroundColor = "orange";
				} else {
					// --- search values if no matching key found
					for (key in deEnStorage) {
						//result = (deEnStorage[key] === query) ? key : undefined
						if (deEnStorage[key] === query) {
							result = key;
							//addContentToTable(table, 2, result, query);
							isolateContentInTable(table, query);
						} else {
							result = 'nothing found';
						}
					}					
				}
			}
			catch (err) {
				console.warn(err.stack);
			}
		}
	}
}

function handleRemoveLastEntry(table, storage) {
	return function(evt) {
		let valueOfLastEntry = table.tBodies[0].lastElementChild.cells[0].textContent;
		table.tBodies[0].lastElementChild.remove();
		storage.removeItem(valueOfLastEntry);
	}
}

function addEventListeners() {
	removeLastBtn.onclick = handleRemoveLastEntry(vocTable, deEnStorage);
	queryField.onkeydown = handleQueryField(vocTable);
	deField.onkeydown = handleInputFields(vocTable);
	enField.onkeydown = handleInputFields(vocTable);
}

function showPopUp() {
// When the user clicks on <div>, open the popup
	popup.classList.toggle("show");
}

/* --- VARIABLES --- */

// elements
let mainEl = document.querySelector('main');
let deField = document.getElementById('de');
let enField = document.getElementById('en')
//let vocTable = document.getElementById('feedback-table');
let removeLastBtn = document.getElementById('remove-last');
let queryField = document.getElementById('query');
let vocTable = document.getElementById('voc-table');
// storage
let deEnStorage = window.localStorage;

/* --- EVENT LISTENERS ---*/

/*
window.onload = () => {
	'use strict';  
	if ('serviceWorker' in navigator) {
	  	navigator.serviceWorker.register('sw.js');
	}
}
*/

/* --- ACTION --- */

addEventListeners();

let arrayOfEntries = [];
for (key of Object.keys(deEnStorage)) {
    arrayOfEntries.push(key);
    arrayOfEntries.push(deEnStorage[key]);
}

addContentToTable(vocTable, 2, ...arrayOfEntries);
/*
let keys = Object.keys(deEnStorage);
for (key of keys) {
	let item = deEnStorage.getItem(key);
	addContentToTable(vocTable, 2, key, item);
}
*/