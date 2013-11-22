import MySQLdb, config, urllib, cgi, datetime
from datetime import datetime
sql = MySQLdb.connect(host="localhost", 
                            user=config.username, 
                            passwd=config.passwd,
                            db=config.test_db)
sql.query("SELECT `id` FROM `feedurls`")
db_feed_query=sql.store_result()
rss_urls=db_feed_query.fetch_row(0)
table_name = "stories"
date_from = datetime.strptime(raw_input("start date inc. in form 'dd-mm-yyyy'"),"%d-%m-%Y")
date_to = datetime.strptime(raw_input("end date inc. in form 'dd-mm-yyyy'"),"%d-%m-%Y")
for rss_url_data in rss_urls:
    feed_id=rss_url_data[0]
    i = date_from 
    while i <= date_to:
        print i.strftime("%d/%m/%Y")
        i += timedelta(days=1)
 
