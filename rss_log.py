# import MySQLdb, feedparser
sql = MySQLdb.connect(host="localhost", # your host, usually localhost
                            user="root", # your username
                            passwd="Refloth88", # your password
                            db="agnes") # name of the data base
rss_url = "http://feeds.bbci.co.uk/news/rss.xml?edition=uk"
table_name = "bbcstories"
feed = feedparser.parse(rss_url)
items = feed [ 'items' ]
i = 0
while i < len(items):
    item=items[i];
	conditions=' WHERE url="' + item['guid'] + '" AND  date_added=CURDATE()'
	if sql.query('SELECT points FROM '+ table_name + conditions) == '':#if the url has not been logged today
        sql.query('INSERT INTO '+ table_name +' (`url`,`title`,`description`,`date`)("' + item['guid'] + '","' + item['title'] + '"' + item['summary'] + '",' + 1 * (1.02 / (i + 1)) + ',CURDATE())')#then add it to the db, setting points to 1 * (1.02/list_postition)
    else:
        curpoints = sql.query('SELECT `points` FROM '+ table_name + conditions)#else get the current point value
        sql.query('UPDATE '+ table_name +' SET points=' + curpoints * ( 1.02 / (i + 1)) + conditions)#and update the points
    i = i + 1
#Fields I want: id INT, url VARSTRING(255), date (#a mysql date format), title VARSTRING(140), desc VARSTRING(255), points INT


