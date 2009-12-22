var apikey = '6a1gGdT4p0Z4cD573dTf3aMk3aA0l54b';

var ril = {

	authenticate: function(username, password, successCallback, failCallback) {
		var reqUrl = 'https://readitlaterlist.com/v2/auth';
		
		var params = {
			username: username,
			password: password,
			apikey: apikey,
			ms: new Date().getTime()
		};
		
		$.getJSON(
			reqUrl,
			params,
			function(data) {
				successCallback();
			}
		);
	},
	
	register: function(username, password, successCallback, failCallback) {
		var reqUrl = 'https://readitlaterlist.com/v2/signup';
	
		var params = {
			username: username,
			password: password,
			apikey: apikey,
			ms: new Date().getTime()
		};
		
		$.getJSON(
			reqUrl,
			params,
			function(data) {
				successCallback();
			}
		);
	},
	
	getNumUnread: function(username, password, successCallback, failCallback) {
		var reqUrl = 'https://readitlaterlist.com/v2/stats';
		
		var params = {
			username: username,
			password: password,
			apikey: apikey,
			ms: new Date().getTime()
		};
		
		$.getJSON(
			reqUrl,
			params,
			function(data) {
				successCallback(data.count_unread);
			}
		);
	},
	
	add: function(username, password, url, title, successCallback, failCallback) {
		var reqUrl = 'https://readitlaterlist.com/v2/add';
		
		var params = {
			username: username,
			password: password,
			apikey: apikey,
			url: url,
			title: title,
			ms: new Date().getTime()
		};
		
		$.getJSON(
			reqUrl,
			params,
			function(data) {
				successCallback();
			}
		);
	},
	
	markRead: function(username, password, url, successCallback, failCallback) {
		var reqUrl = 'https://readitlaterlist.com/v2/send';
		
		var params = {
			username: username,
			password: password,
			apikey: apikey,
			read: '{"0":{"url":'+url+'}}',
			ms: new Date().getTime()
		};
		
		$.getJSON(
			reqUrl,
			params,
			function(data) {
				successCallback();
			}
		);
	}
	
}