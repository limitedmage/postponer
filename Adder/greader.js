// modified from original by Hiroshi Miyazaki
// see http://forgotthemilk.net/labo/rememberthemilk-cow-in-googlereader

(function() {
	chrome.extension.sendRequest('options', function(options) {
		
		var location;
		if (options.location == 'before') {
			location = 0;
		}
		else {
			location = 1;
		}

		var timerID;
		var busy = false;

		//postponer adder small icon image(base64)
		var icon = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKbSURBVDiNjZLLa1RXHMc/v3PPzZlM5uYyPqJjGh8J2El14wNUAi5MrZBdQ7GiLgRFcWX/B6ELd92XCrpSEMWFj4UPfC7ETSio2CJIG20ezuNOxsy9d85xcSdj7Mrv5seB8338fnzFOcehwwe3rls3+Gv52vXtJo576EAZEbXGJPWJbW8Hvwu9neVbf4ZD4TWgKmJf5PMv5jTA8Kbh344dO77vTdKmNDdPyffBAxXELA5ZooGFUvDtW3Iq2BlNR7uDUuESzhtq1bY+1ACiRPtas2L8eyrnzpE8foy3UtOz2VAYHqR/OCFvAsJNU1T+2liOq7Wjus/cx8+L7sZVCgFckoCAGAh+FgrjYFYdwRRPIqLpX3+Xxer5kXT+4qDN1YuKZRCRbPqCF3rY9xrxhNzKX/B6hgDQZjO9xdM419a6UKx3BCQjO5c9LeAJ7qNHOt+k+e7Mch8a0yegv1AT37cqo2fuIoJSil6Tx9gcOunBNT1QOZxtkSzcw7kUUT7OuYZYqXdvIJIJad+nEIaIX8CPYlzVJ4luU1vcgjLfYN/P4NJZWi58Z/rsq0zAfY6ntSYol/k7jllPH+51g6i3RXHvDpREKLeBD7Mf2o3o3+fh6uZVxdIOCALYdpupapX22BhPH7ykMdVPfWoA2IWoMZA9zNXGk9//KF3J51/+p7sBJLvDmydPGD17lg2nTrFmcpLnExOsVT+gvB9xpIgy1GrP0n+mH30E0CzDitFRtl24wMCBA4gIxXKZPXfuIGmKUgaRHM655ZQvBUwQ0Lt//xcfgpERPM/LiiaCtbazcqeAfAWWXP/v3k0Qt+La7MyMs9bKUh8QQXWmiHRNHVCpVARoAohzjoOHfiqmaTqptW5/RRppRI2FmzduXwb4BKdI8d5aEhrxAAAAAElFTkSuQmCC';

		//make RIL icon as earch article
		function setRilIcon(targetNode, href, titleStr) {
			//make linking string
			//make anker tags
			var a = document.createElement("a");
			a.setAttribute('href', "javascript:(\
				function(){\
					name=encodeURIComponent(\""+titleStr+"\");\
					url=\""+href+"\";\
					cp=\"https://readitlaterlist.com/edit?BL=1&title=\"+name+\"&url=\"+url;\
					w=window.open(cp,\"_blank\",\"status=no,toolbar=no,width=320,height=220,resizable=yes\");\
				})();");
			a.addEventListener('click', function() {
				chrome.extension.sendRequest('reload');
			}, false);
			//make img tag
			var imgTag = document.createElement("img");
			imgTag.src = icon;
			imgTag.border="0px";
			//set img tag in anker tag
			a.appendChild(imgTag);
			//set anker tag in span tag
			var before = targetNode.firstChild;
			with (targetNode) {
				appendChild(document.createTextNode(" "));
				appendChild(a);
			}
		}

		//make RIL icons
		function setRilIcons(titleArray) {
			//loop for articles
			for (var i = 0; i < titleArray.length; i++) {
				var href = titleArray[i].href;
				var title = titleArray[i].node;
				var titleStr = titleArray[i].titleStr;
				//make span tag
				var node = document.createElement('span');
				node.className = 'googlereader2ril';
				//make RIL icon
				setRilIcon(node, href, titleStr);
				title.insertBefore(node, title.childNodes[location]);
			}
		}

		//main function(timer calls every 3 seconds)
		function greader_add_rilicon() {
			if (busy) return;

			var titles = document.evaluate('//h2[@class="entry-title"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (! titles.snapshotLength) return;

			busy = true;

			var titleArray = new Array();
			for (var i = 0; i < titles.snapshotLength; i++) {
				var title = titles.snapshotItem(i);
				var nodes = title.childNodes;
				if ((nodes == null) || (nodes[location] == null) || (nodes[location].tagName != 'SPAN') || (nodes[location].className != 'googlereader2ril')) {
					var link = null;
					var titleStr = '';
					if (title.firstChild.tagName == 'A') {
						// entry-container (Expanded view or Collapsed item)
						if (options.expanded) {
							link = title.firstChild;
							titleStr = link.firstChild.textContent;
						}
					} 
					else {
						// entry (List view)
						if (options.list) {
							link = title.parentNode.parentNode.firstChild;
							if (link.tagName != 'A') link = null;
							titleStr = title.textContent;
						}
					}
					if (link != null) {
						titleArray.push({ node: title, href: link.href, titleStr: titleStr });
					}
				}
			}
			if (titleArray.length == 0) {
				busy = false;
				return;
			}
			//make RIL icons
			setRilIcons(titleArray);
			busy = false;
		}

		if (options.greader) {
			// be careful not to be too busy
			timerID = setInterval(greader_add_rilicon, 3000);
		}
	});
})();