-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 07, 2013 at 10:55 PM
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site` int(11) NOT NULL,
  `section` varchar(50) NOT NULL,
  `url` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site` (`site`,`section`),
  UNIQUE KEY `url` (`url`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `feedurls`
--

INSERT INTO `feedurls` (`id`, `site`, `section`, `url`) VALUES
(1, 1, 'news', 'http://feeds.bbci.co.uk/news/rss.xml'),
(2, 1, 'science', 'http://feeds.bbci.co.uk/news/science_and_environment/rss.xml'),
(3, 1, 'technology', 'http://feeds.bbci.co.uk/news/technology/rss.xml'),
(4, 1, 'uk-news', 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk'),
(5, 1, 'world', 'http://feeds.bbci.co.uk/news/world/rss.xml');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedurls`
--
ALTER TABLE `feedurls`
  ADD CONSTRAINT `feedurls_ibfk_1` FOREIGN KEY (`site`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
