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
    sql.query("SELECT  `sites`.`site` ,  `url`, `section` FROM  `feedurls` ,  `sites` WHERE  `sites`.`site` =  '"+site[0]+"'")
    feeds=sql.store_result().fetch_row(0)
    for feed in feeds:
        print "'"+feed[2]+"':'"+feed[1]+"',"
    print "}"
print "}"