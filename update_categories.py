import MySQLdb, config
sql = MySQLdb.connect(host="localhost", 
                            user=config.username, 
                            passwd=config.passwd,
                            db=config.db)
sql.query("SELECT `site` FROM  `sites` ")
sites=sql.store_result().fetch_row(0)
print "{"
for site in sites:
    print "'"+site[0]+"':{"
    sql.query("SELECT  `sites`.`site` ,  `url` FROM  `feedurls` ,  `sites` WHERE  `sites`.`site` =  '"+site[0]+"'")
    sites=sql.store_result().fetch_row(0)
    print "}"