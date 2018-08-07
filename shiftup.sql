-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 04, 2018 at 01:28 PM
-- Server version: 5.6.34-log
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shiftup`
--

-- --------------------------------------------------------

--
-- Table structure for table `shiftup`
--

CREATE TABLE `shiftup` (
  `id` int(3) UNSIGNED NOT NULL,
  `name` varchar(60) NOT NULL,
  `age` int(3) UNSIGNED NOT NULL,
  `ability` int(3) UNSIGNED NOT NULL,
  `money` int(3) NOT NULL,
  `isStudent` int(1) NOT NULL,
  `graduate` int(1) NOT NULL,
  `classCountdown` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shiftup`
--

INSERT INTO `shiftup` (`id`, `name`, `age`, `ability`, `money`, `isStudent`, `graduate`, `classCountdown`) VALUES
(6, 'Wade Calvert', 30, 108, 16800, 1, 1, 4),
(7, 'Tim Ferris', 30, 102, 2147483647, 1, 1, 8),
(8, 'Diana Post', 25, 100, 150, 1, 1, 3),
(9, 'Ethan Walsh', 30, 102, 750, 1, 1, 5),
(10, 'Lamont Watkins', 36, 100, 0, 1, 1, 9),
(11, 'John Doe', 100, 99, 9999, 1, 0, 10),
(12, 'Jane Doe', 26, 75, 7777, 1, 0, 10),
(46, 'Ray Batra', 24, 101, 150, 1, 1, 4),
(47, 'Kirsten Bondalapati', 30, 75, 1000, 1, 0, 10),
(48, 'Aisha Blake', 28, 99, 100000000, 1, 0, 10),
(49, 'Stephen Cavaliere', 30, 102, 100000000, 1, 1, 7),
(50, 'Steve Remenapp', 30, 101, 900, 1, 1, 2),
(51, 'Amit Rathi', 30, 99, 4000, 1, 0, 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `shiftup`
--
ALTER TABLE `shiftup`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `shiftup`
--
ALTER TABLE `shiftup`
  MODIFY `id` int(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
