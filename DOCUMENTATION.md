<center>API Documentation</center>
==================================
<center>A guide to using our APIs for your free and open-source project.</center>
---------------------------------------------------
---------------------------------------------------
The Guardian API
----------------
<h3>Description</h3>
This is just a little API that simplifies the existing Guardian API for interaction with JavaScript.
<h3>Usage</h3>
*http://thescoop.io/guardian_feeds.php?<br />start_time=2012-12-31&<br />end_time=2013-12-31&<br />section=uk-news&<br />keyword=the%20scoop*

**'start_time'** - Takes a hyphen separated date and symbolises the first date boundary between which to find news.<br />
**'end_time'** - Takes a hyphen separated date and symbolises the last date boundary between which to find news.<br />
**'section'** - Defines a section (AKA a category). A list of valid sections can be found in the root of the repo.<br />
**'keyword'** - A search term to find related articles. EG. 'bike' would return stories that mentioned 'bike'<br />

The Daily Guardian API
----------------------
<h3>Description</h3>
An API that returns <10 news stories for each day between two dates. This can be used to get more news stories, but it has to query the API for each day, so it may take a while to receive data. Due to the resources this requires from the server, output has been capped to 200 days.
<h3>Usage</h3>
*http://thescoop.io/guardian_feeds_daily.php?<br />start_time=2012-12-31&<br />end_time=2013-12-31&<br />section=uk-news&<br />keyword=best%20website*

**'start_time'** - Takes a hyphen separated date and symbolises the first date boundary between which to find news.<br />
**'end_time'** - Takes a hyphen separated date and symbolises the last date boundary between which to find news.<br />
**'section'** - Defines a section (AKA a category). A list of valid sections can be found in the root of the repo.<br />
**'keyword'** - A search term to find related articles. EG. 'car' would return stories that mentioned 'car'<br />

The OTS API
-----------
<h3>Description</h3>
The OTS API will take a URL, parse the URL for the largest body of text