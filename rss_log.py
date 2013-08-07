import MySQLdb, feedparser, config, re
sql = MySQLdb.connect(host="localhost", 
                            user=config.username, 
                            passwd=config.passwd,
                            db=config.db)
rss_url = "http://feeds.bbci.co.uk/news/rss.xml?edition=uk"
table_name = "bbcstories"
feed = feedparser.parse(rss_url)
items = feed [ 'items' ]
i = 0
def algo(score,pos):
	return score * (1.02 / (pos + 1))
while i < len(items):
	item=items[i];
	conditions=' WHERE url="' + item['guid'] + '" AND  date_added=CURDATE()'
	sql.query('SELECT points FROM '+ table_name + conditions)
	points_result=sql.store_result();
	if points_result.num_rows()==0:#if the url has not been logged today
		item['title']=re.escape(item['title'])
		item['summary']=re.escape(item['summary'])
		sql.query('INSERT INTO '+ table_name +' (`url`,`title`,`description`,`points`,`date_added`) VALUES("' + item['guid'] + '","' + item['title'] + '","' + item['summary'] + '",' + str(algo(1,i)) + ',CURDATE())')#then add it to the db, setting points to 1 * (1.02/list_postition)
		insert_result=sql.store_result();
	else:
		currpoints=float(points_result.fetch_row()[0][0])
		sql.query('UPDATE '+ table_name +' SET points=' + str(algo(currpoints,i)) + conditions)#and update the points
	i = i + 1
#Fields I want: id INT, url VARSTRING(255), date (#a mysql date format), title VARSTRING(140), desc VARSTRING(255), points INT


