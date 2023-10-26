-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 26, 2023 at 11:20 AM
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
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int(255) NOT NULL,
  `status` varchar(100) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `project_type` varchar(100) NOT NULL,
  `room_type` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `provinces` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `subdistrict` varchar(255) NOT NULL,
  `sq_meter` varchar(255) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `google_maps` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `start_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dayofavaliable` varchar(100) NOT NULL,
  `timeofavaliable` varchar(255) NOT NULL,
  `etc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `status`, `phone_number`, `project_type`, `room_type`, `address`, `provinces`, `district`, `subdistrict`, `sq_meter`, `zipcode`, `google_maps`, `project_name`, `start_date`, `dayofavaliable`, `timeofavaliable`, `etc`) VALUES
(29, 'รอการติดต่อกลับ', '0836963344', 'รีโนเวท', 'ห้องนั่งเล่น', '9/147 MOO 2 MALIWAN VILAGE', 'กรุงเทพมหานคร', 'เขตบางกอกใหญ่', '', '25', '10560', 'http://localhost:3000/user_profile/0836963344', 'แสนสิริ', '2023-10-18', 'วันอังคาร, วันพุธ, วันพฤหัสบดี', '21:10 - 20:10', 'เกดเกดเ'),
(30, 'รอการติดต่อกลับ', '0836963344', 'ซ่อมหลังคา', 'ห้องนั่งเล่น', '9/147 MOO 2 MALIWAN VILAGE', 'กรุงเทพมหานคร', 'เขตบางกอกใหญ่', '', '120', '10560', '', 'แสนสิริ', '2023-10-24', 'วันพุธ, วันพฤหัสบดี', '23:24 - 13:24', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password_date` varchar(255) DEFAULT NULL,
  `login_attempts` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`first_name`, `last_name`, `phone_number`, `email`, `password`, `password_date`, `login_attempts`) VALUES
('เมธาพร', 'คลังบุรี', '0836963344', 'moomim57@gmail.com', '$2b$10$glxEg3NNN0V2ATkCRXEpzOXXQ09qOOwtaMq3xFCKazrGW5fTWEmm2', '21/10/2566', '0');

-- --------------------------------------------------------

--
-- Table structure for table `users_info`
--

CREATE TABLE `users_info` (
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `provinces` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `district` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `zipcode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone_number` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users_info`
--

INSERT INTO `users_info` (`address`, `provinces`, `district`, `zipcode`, `phone_number`) VALUES
('9/147 MOO 2 MALIWAN VILAGE', 'กรุงเทพมหานคร', 'เขตบางกอกใหญ่', '10560', '0836963344');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`phone_number`);

--
-- Indexes for table `users_info`
--
ALTER TABLE `users_info`
  ADD PRIMARY KEY (`phone_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
