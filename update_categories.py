import MySQLdb, config
sql = MySQLdb.connect(host="localhost", 
                            user=config.username, 
                            passwd=config.passwd,
                            db=config.db)
sql.query("SELECT `site` FROM  `sites` ")
sites=sql.store_result().fetch_row(0)

def print_site_data(site):
    print '"'+site[0]+'":{'
    sql.query("SELECT  `sites`.`site` ,  `url`, `section` FROM  `feedurls` ,  `sites` WHERE  `sites`.`site` =  '"+site[0]+"'")
    feeds=sql.store_result().fetch_row(0)
    i=1
    print_feed_data(feeds[0])
    while i<len(feeds):
        print ","
        print_feed_data(feeds[i])
        i+=1
    print "}"

def print_feed_data(feed):
    print '"'+feed[2]+'":"'+feed[1]+'"'
print "{"
i=1
print_site_data(sites[0])
while i<len(sites):
    print ","
    print_site_data(sites[i])
    i+=1
print "}"