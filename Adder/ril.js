var apikey = '6a1gGdT4p0Z4cD573dTf3aMk3aA0l54b';

var ril = {

	authenticate: function(username, password, callback) {
		var reqUrl = 'https://readitlaterlist.com/v2/auth';
		
		var params = {
			username: username,
			password: password,
			apikey: apikey,
			ms: new Date().getTime()
		};

		$.ajax({
			url: reqUrl,
			data: params,
			complete: function(xhr, status) {
				console.log(status);
				callback(xhr.status);
			}
		});
	},
	
	register: function(username, password, callback) {
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
				callback();
			}
		);
	},
	
	getNumUnread: function(username, password, callback) {
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
				callback(data.count_unread);
			}
		);
	},
	
	add: function(username, password, url, title, callback) {
		var reqUrl = 'https://readitlaterlist.com/v2/add';
		
		var params = {
			username: username,
			password: password,
			apikey: apikey,
			url: url,
			title: title,
			ms: new Date().getTime()
		};
		
		$.ajax({
			url: reqUrl,
			data: params,
			complete: function(xhr, status) {
				callback(xhr.status);
			}
		});
	},
	
	markRead: function(username, password, url, callback) {
		var reqUrl = 'https://readitlaterlist.com/v2/send';
		
		var params = {
			username: username,
			password: password,
			apikey: apikey,
			read: '{"0":{"url":'+url+'}}',
			ms: new Date().getTime()
		};
		
		$.ajax({
			url: reqUrl,
			data: params,
			complete: function(xhr, status) {
				callback(xhr.status);
			}
		});
	}
}