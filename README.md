The Scoop
=========
The Scoop makes catching up on news you've missed easy.
Choose a category and a time frane, and The Scoop will find the most popular news articles.
The Scoop also provides summarisations of those articles, as well as a link to the full story.

Pre-requisites
---------------
- OTS (Open Text Summarizer) command line tool: 
- - http://libots.sourceforge.net/
- - ots.php must be able to call this 
- - This requires libxml2 and glib2
- Apache2
- PHP 5.3.3+
- - This is what we have developed on so it is most likely to work
- - php_curl must be installed for out api's
- MySQL 5.1
- - Again what it has been developed on so is most likely to work
- crond (cronjobs)
- Python 2.7.5
- - python-MySQL also required

Setup
-----
1. Install Prerequsites as above
2. clone the directory with `git clone http://github.com/edlongman/thescoop.git`
3. Set your server/alias directory to `thescoop/site`
4. Create a cron job of `*/5 * * * * python /path/to/thescoop/rss_log.py` this logs the values every 5 minutes
5. Create a database in MySQL and import `bbc.sql`
6. Copy `config.sample.py` and `config.sample.php` and change the options to your sql info and remove the sample
