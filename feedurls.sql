-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 06, 2013 at 11:06 PM
-- Server version: 5.6.12
-- PHP Version: 5.3.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `agnes`
--

-- --------------------------------------------------------

--
-- Table structure for table `feedurls`
--

CREATE TABLE IF NOT EXISTS `feedurls` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `site` text NOT NULL,
  `section` varchar(50) NOT NULL,
  `url` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `feedurls`
--

INSERT INTO `feedurls` (`id`, `site`, `section`, `url`) VALUES
(1, 'bbc', 'uk-news', 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk'),
(2, 'bbc', 'technology', 'http://feeds.bbci.co.uk/news/technology/rss.xml'),
(3, 'bbc', 'news', 'http://feeds.bbci.co.uk/news/rss.xml'),
(4, 'bbc', 'world', 'http://feeds.bbci.co.uk/news/world/rss.xml'),
(5, 'bbc', 'science', 'http://feeds.bbci.co.uk/news/science_and_environment/rss.xml');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
