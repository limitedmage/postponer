Postponer is a pair of Chrome extensions to add to and manage your Read It Later reading list.

Postponer integrates RIL's great bookmarklets (available at http://readitlaterlist.com/bookmarklets) with Chrome's interface for a simple way to manage your reading list.

Postponer Adder (https://chrome.google.com/extensions/detail/pggmlienkcoenodbjpkbidlmmedgonai) adds an icon in the Chrome address bar for quickly adding items to your reading list. It also adds an icon next to every article Google Reader to add it to your reading list.

Postponer Manager (https://chrome.google.com/extensions/detail/mmfblgljgoaokhbcjnddgcnaielcpjeb) adds an icon in the Chrome toolbar to open your reading list with all your unread items. From there, you can open items, mark as read, etc. It can also show the number of unread items in your list on an icon badge (go to the Options page to enable this).

The extensions were designed to be used together, but can also be used on their own. The reason why there are two extensions is because Chrome does not allow one extension to add icons to both the address bar and the toolbar.

Changelog

Version 0.3.1 - 8 Feb 10
Adder-only update
 * Fixed keyboard shortcut issue after clicking icon in Google Reader

Version 0.3 - 4 Feb 10
Manager
 * Now badge only reloads when Chrome is opened and when the icon is clicked. Previous version was running out of API calls within seconds and overloading the RIL server. Sorry! Just remember to click the icon to reload.
Adder
 * Google Reader integration! Now an icon appears next to the title of articles in Google Reader. When clicked, a window appears to add the item to RIL. Clicking this icon also reloads the badge in the Manager.
 * Options page to turn Google Reader integration on/off, change the position of the icon to before or after the title of the article, and whether to show the icon in list view, expanded view, or both.

Version 0.2 - 23 Dec 09
Manager
 * Added title to browser action icon
 * Icon can now show number of unread items in a badge
 * Added an options page for enabling badge and checking credentials
 * Added scheduling for badge reload when icon in clicked and external reload request (ie, from Postponer Adder) is sent
Adder
 * Added communication with Manager so badge is scheduled to reload when Adder icon is clicked.

Version 0.1 - 22 Dec 09
 * Initial release

Author and License

Postponer was developed by Juliana Peña 
http://julianapena.com 
http://twitter.com/limitedmage

Code open source under the GPL 2.0 and is available at http://code.google.com/p/chromepostponer/

Postponer is still under development and may be buggy. Please report any issue at http://code.google.com/p/chromepostponer/issues/entry
