-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 02, 2023 at 07:53 PM
-- Server version: 8.0.17
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `baanism`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_project`
--

CREATE TABLE `admin_project` (
  `id` int(11) NOT NULL,
  `project_name` varchar(100) NOT NULL,
  `developer` varchar(100) NOT NULL,
  `provinces` varchar(100) NOT NULL,
  `district` varchar(100) NOT NULL,
  `subdistrict` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin_project`
--

INSERT INTO `admin_project` (`id`, `project_name`, `developer`, `provinces`, `district`, `subdistrict`, `address`, `zipcode`, `img`) VALUES
(1, 'แสนสิริ', 'SCG', 'สมุทรปราการ', 'บางบ่อ', 'บางเพรียง', 'บางน่อ', '', 'https://images.workpointtoday.com/workpointnews/2023/05/16155002/1684226998_34496_Web_SSR02.png'),
(3, 'Britania', 'Baanism', '', '', '', '', '', 'https://cdn-images.prod.thinkofliving.com/wp-content/uploads/1/2019/10/21113252/CGSCAPE-ORI-BRITANIA-BANGNA-KM42-SH2-160_190913.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_project`
--
ALTER TABLE `admin_project`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_project`
--
ALTER TABLE `admin_project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
