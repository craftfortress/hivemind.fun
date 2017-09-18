// Basic JSONblob api
var id = '35dead94-9b34-11e7-aa97-4126f9ae56b9';
var url = "https://jsonblob.com/api/jsonBlob/" + id;
var headers = {'Content-Type':'application/json'};
var cloudQuery = "";

var init = {
	method: 'GET',
	headers: headers,
	mode: 'cors',
	cache: 'default'
}

function getValue() {
	fetch(url, headers).then(function(response) {
		return response.json();
	}).then(function(obj) {
		console.log(obj + " GET received from " + url);
		//alert(obj);
		cloudQuery = obj;
	});
}

function updateValue(str) {
	fetch(url)
		.then(function(data) {
			init.method = 'PUT';
			init.body = JSON.stringify(str);
			fetch(url, init)
				.then(function(res) {
					console.log(str + " PUT sent to URL " + url)
				})
				.catch(function(res) {
					console.log(res)
				})
		}).catch(function(error) {});
}