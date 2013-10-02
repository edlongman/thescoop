import MySQLdb, config
sql = MySQLdb.connect(host="localhost", 
                            user=config.username, 
                            passwd=config.passwd,
                            db=config.db)
sql.query("SELECT `site` FROM  `sites` ")
sites=sql.store_result().fetch_row(0)
output=""
def print_site_data(site):
    output=""
    output+= '"'+site[0]+'":{'
    sql.query("SELECT  `sites`.`site` ,  `url`, `section` FROM  `feedurls` ,  `sites` WHERE  `sites`.`site` =  '"+site[0]+"'")
    feeds=sql.store_result().fetch_row(0)
    i=1
    output+=print_feed_data(feeds[0])
    while i<len(feeds):
        output+= ","
        output+=print_feed_data(feeds[i])
        i+=1
    output+= "}"
    return output

def print_feed_data(feed):
    output=""
    output+= '"'+feed[2]+'":"'+feed[1]+'"'
    return output
output+= "{"
i=1
output+=print_site_data(sites[0])
while i<len(sites):
    output+= ","
    output+=print_site_data(sites[i])
    i+=1
output+=',"guardian":{"business":"business","education":"education","environment":"environment","film":"film","football":"football","media":"media","politics":"politics","science":"science","sport":"sport","technology":"technology","uk-news":"uk-news","world":"world"}'
output+= "}"
file=open('site/sites.json',"w")
file.write(output)