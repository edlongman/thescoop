import MySQLdb, feedparser
sql = MySQLdb.connect(host="localhost", # your host, usually localhost
                            user="root", # your username
                            passwd="", # your password
                            db="agnes") # name of the data base
rss_url = ""
feed = feedparser.parse(url)
items = feed [ 'items' ]
i = 0
while i < len(items):
    if sql.query('SELECT id FROM bbcfeeds WHERE url=' + items[i]['link'] + ' AND  date=' + items[i]['published'] ) == '':#if the url has not been logged today
      sql.query('INSERT INTO news_log ' + items[i]['link'] + ',' + items[i] + ',' + items[i]['summary'] + ',' + 1 * (1.02 / (i + 1))#then add it to the db, setting points to 1 * (1.02/list_postition)
    else:
        curpoints = sql.query('SELECT FROM points WHERE url = ' + items[i]['link'])#else get the current point value
        sql.query('UPDATE bbcfeeds  SET points=' + curpoints * ( 1.02 / (i + 1)) + 'WHERE url=' + items[i]['link'] + 'AND date=' + items[i]['published'])#and update the points
    i = i + 1
#Fields I want: id INT, url VARSTRING(255), date (#a mysql date format), title VARSTRING(140), desc VARSTRING(255), points INT


