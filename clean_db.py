import MySQLdb, config, urllib, cgi, datetime
sql = MySQLdb.connect(host="localhost", 
                            user=config.username, 
                            passwd=config.passwd,
                            db=config.test_db)
sql.query("SELECT `site`,`section`,`url`,`id` FROM `feedurls`")
db_feed_query=sql.store_result()
rss_urls=db_feed_query.fetch_row(0)
table_name = "stories"
date_from = datetime.strptime(input("start date inc. in form 'dd-mm-yyyy'"),"%d-%m-%Y")
date_to = datetime.strptime(input("end date inc. in form 'dd-mm-yyyy'"),"%d-%m-%Y")
