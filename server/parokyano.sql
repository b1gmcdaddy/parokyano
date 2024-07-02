-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2024 at 12:50 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `parokyano`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `announcement_id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date_announced` date NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`announcement_id`, `title`, `description`, `date_announced`, `user_id`) VALUES
(1, 'Christmas Eve Mass', 'Mass on December 24 8PM', '2024-07-02', 1);

-- --------------------------------------------------------

--
-- Table structure for table `baptism`
--

CREATE TABLE `baptism` (
  `baptism_id` bigint(11) NOT NULL,
  `child_name` varchar(255) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `birth_date` date NOT NULL,
  `father_name` varchar(255) NOT NULL,
  `father_age` int(11) NOT NULL,
  `mother_name` varchar(255) NOT NULL,
  `mother_age` int(11) NOT NULL,
  `marriage_details` text NOT NULL,
  `officiating_priest` varchar(100) NOT NULL,
  `request_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `confirmation`
--

CREATE TABLE `confirmation` (
  `confirmation_id` bigint(20) NOT NULL,
  `child_name` varchar(255) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `father_name` varchar(255) NOT NULL,
  `mother_name` varchar(255) NOT NULL,
  `officiating_priest` varchar(100) NOT NULL,
  `request_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `log_id` bigint(20) NOT NULL,
  `activity` varchar(255) NOT NULL,
  `datetime` datetime NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `request_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `priest`
--

CREATE TABLE `priest` (
  `priest_id` bigint(20) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `contact_no` varchar(11) NOT NULL,
  `status` enum('active','inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `priestschedule`
--

CREATE TABLE `priestschedule` (
  `schedule_id` bigint(20) NOT NULL,
  `date` date NOT NULL,
  `activity` varchar(255) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `priest_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `requestID` bigint(20) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `age` int(6) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact_no` varchar(11) NOT NULL,
  `relationship` varchar(100) DEFAULT NULL,
  `requested_by` varchar(255) DEFAULT NULL,
  `patient_status` varchar(100) DEFAULT NULL,
  `purpose` text DEFAULT NULL,
  `mother_name` varchar(100) DEFAULT NULL,
  `father_name` varchar(100) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `baptismDate` date DEFAULT NULL,
  `intention_details` text DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `preferred_date` date NOT NULL,
  `preferred_time` time NOT NULL,
  `preferred_priest` varchar(255) DEFAULT NULL,
  `date_requested` date NOT NULL,
  `payment_method` enum('cash','gcash') NOT NULL,
  `transaction_date` date DEFAULT NULL,
  `interview_date` date DEFAULT NULL,
  `isPrenuptial` tinyint(1) DEFAULT NULL,
  `isRequirement` tinyint(1) DEFAULT NULL,
  `isParishioner` tinyint(1) DEFAULT NULL,
  `isSponsor` tinyint(1) DEFAULT NULL,
  `status` enum('pending','approved','cancelled','finished','archived') NOT NULL,
  `donation` int(11) DEFAULT NULL,
  `payment_status` enum('paid','unpaid') NOT NULL DEFAULT 'unpaid',
  `transaction_no` varchar(30) NOT NULL,
  `service_id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `priestSched_id` bigint(20) DEFAULT NULL,
  `venueSched_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`requestID`, `first_name`, `middle_name`, `last_name`, `age`, `address`, `contact_no`, `relationship`, `requested_by`, `patient_status`, `purpose`, `mother_name`, `father_name`, `birthDate`, `baptismDate`, `intention_details`, `type`, `preferred_date`, `preferred_time`, `preferred_priest`, `date_requested`, `payment_method`, `transaction_date`, `interview_date`, `isPrenuptial`, `isRequirement`, `isParishioner`, `isSponsor`, `status`, `donation`, `payment_status`, `transaction_no`, `service_id`, `user_id`, `priestSched_id`, `venueSched_id`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, '', NULL, 'john', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-27', '06:00:00', NULL, '0000-00-00', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'paid', '0', 1, NULL, NULL, NULL),
(2, NULL, NULL, NULL, NULL, NULL, '', NULL, 'john', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-16', '05:00:00', NULL, '0000-00-00', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'paid', '0', 1, NULL, NULL, NULL),
(3, NULL, NULL, NULL, NULL, NULL, '', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-29', '17:30:00', NULL, '0000-00-00', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'paid', '0', 1, NULL, NULL, NULL),
(4, NULL, NULL, NULL, NULL, NULL, '', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, '\"petition 1\"', NULL, '2024-06-30', '16:00:00', NULL, '2024-06-27', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'paid', '0', 1, NULL, NULL, NULL),
(5, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, '\"petition 2\"', NULL, '2024-06-28', '17:30:00', NULL, '2024-06-27', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'paid', '0', 1, NULL, NULL, NULL),
(6, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'francis', NULL, NULL, NULL, NULL, NULL, NULL, '\"test 3\"', NULL, '2024-06-28', '17:30:00', NULL, '2024-06-27', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'paid', '0', 1, NULL, NULL, NULL),
(7, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'francis', NULL, NULL, NULL, NULL, NULL, NULL, '\"test 4\"', NULL, '2024-06-30', '16:00:00', NULL, '2024-06-27', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(8, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'francis', NULL, NULL, NULL, NULL, NULL, NULL, '\"test 4\"', NULL, '2024-06-29', '06:00:00', NULL, '2024-06-27', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(9, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'francis', NULL, NULL, NULL, NULL, NULL, NULL, '\"test 5\"', 'Petition', '2024-06-29', '06:00:00', NULL, '2024-06-27', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(10, NULL, NULL, NULL, NULL, NULL, '', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, '{\"saint\":\"\",\"wedding\":\"\",\"success\":\"research 1\",\"birthday\":\"\",\"others\":\"\"}', 'Thanksgiving', '2024-07-10', '06:00:00', NULL, '2024-07-01', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(11, NULL, NULL, NULL, NULL, NULL, '', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, '{\"saint\":\"\",\"wedding\":\"\",\"success\":\"research 1\",\"birthday\":\"\",\"others\":\"\"}', 'Thanksgiving', '2024-07-10', '06:00:00', NULL, '2024-07-01', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(12, NULL, NULL, NULL, NULL, NULL, '', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, '{\"saint\":\"\",\"wedding\":\"\",\"success\":\"research 1\",\"birthday\":\"\",\"others\":\"\"}', 'Thanksgiving', '2024-07-10', '06:00:00', NULL, '2024-07-01', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 200, 'unpaid', '0', 1, NULL, NULL, NULL),
(13, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, '\"test6\"', 'Petition', '2024-07-03', '06:00:00', NULL, '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(14, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, '\"test 7\"', 'Petition', '2024-07-13', '06:00:00', NULL, '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(15, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, '\"test 8\"', 'Petition', '2024-07-07', '08:00:00', NULL, '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(16, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'john', NULL, NULL, NULL, NULL, NULL, NULL, '\"test 9\"', 'Petition', '2024-07-11', '06:00:00', NULL, '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(17, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, '\"test 10\"', 'Petition', '2024-07-14', '05:00:00', NULL, '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(18, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, '\"test 11\"', 'Petition', '2024-07-03', '06:00:00', NULL, '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(19, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, '\"test 12\"', 'Petition', '2024-07-07', '06:30:00', NULL, '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024', 1, NULL, NULL, NULL),
(20, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, '\"test 13\"', 'Petition', '2024-07-06', '06:00:00', NULL, '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-024ea5c508a6566e762405', 1, NULL, NULL, NULL),
(21, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, '\"test 14\"', 'Petition', '2024-07-04', '06:00:00', NULL, '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-024ea5c508a6566e762405', 1, NULL, NULL, NULL),
(22, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, '\"test 15\"', 'Petition', '2024-07-03', '17:30:00', NULL, '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-023a57bcaec3bee8ec8d0e', 1, NULL, NULL, NULL),
(23, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, '\"test 16\"', 'Petition', '2024-07-07', '09:30:00', NULL, '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-029fb975236248daae62d2', 1, NULL, NULL, NULL),
(24, NULL, NULL, NULL, NULL, NULL, '', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, '{\"saint\":\"St.Joseph\",\"wedding\":\"\",\"success\":\"\",\"birthday\":\"\",\"others\":\"\"}', 'Thanksgiving', '2024-07-07', '09:30:00', NULL, '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-02955690f0855f3f297074', 1, NULL, NULL, NULL),
(25, NULL, NULL, NULL, NULL, NULL, '', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, '{\"saint\":\"\",\"wedding\":\"\",\"success\":\"research 2\",\"birthday\":\"\",\"others\":\"\"}', 'Thanksgiving', '2024-07-03', '06:00:00', NULL, '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-02afb2944991acffd7f8ba', 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `serviceID` bigint(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `requirements` text DEFAULT NULL,
  `fee` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`serviceID`, `name`, `requirements`, `fee`, `duration`) VALUES
(1, 'Mass Intention', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `serviceschedule`
--

CREATE TABLE `serviceschedule` (
  `scheduleID` int(11) NOT NULL,
  `day` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  `time` time NOT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `serviceschedule`
--

INSERT INTO `serviceschedule` (`scheduleID`, `day`, `time`, `service_id`) VALUES
(1, 'Monday', '06:00:00', 1),
(2, 'Tuesday', '06:00:00', 1),
(3, 'Wednesday', '06:00:00', 1),
(4, 'Thursday', '06:00:00', 1),
(5, 'Friday', '06:00:00', 1),
(6, 'Saturday', '06:00:00', 1),
(7, 'Monday', '17:30:00', 1),
(8, 'Tuesday', '17:30:00', 1),
(9, 'Wednesday', '17:30:00', 1),
(10, 'Thursday', '17:30:00', 1),
(11, 'Friday', '17:30:00', 1),
(12, 'Saturday', '17:30:00', 1),
(13, 'Sunday', '05:00:00', 1),
(14, 'Sunday', '06:30:00', 1),
(15, 'Sunday', '08:00:00', 1),
(16, 'Sunday', '09:30:00', 1),
(17, 'Sunday', '16:00:00', 1),
(18, 'Sunday', '17:30:00', 1),
(19, 'Sunday', '19:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sponsor`
--

CREATE TABLE `sponsor` (
  `sonsor_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `sponsor_type` enum('baptism','confirmation','wedding') NOT NULL,
  `details` text NOT NULL,
  `baptism_id` bigint(20) DEFAULT NULL,
  `confirmation_id` bigint(20) DEFAULT NULL,
  `wedding_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` bigint(20) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `user_type` enum('staff','admin') NOT NULL,
  `date_started` date NOT NULL,
  `date_ended` date DEFAULT NULL,
  `contact_no` varchar(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `status` enum('active','inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `user_type`, `date_started`, `date_ended`, `contact_no`, `email`, `username`, `password`, `status`) VALUES
(1, 'John', 'Titor', 'staff', '2024-06-24', NULL, '09123456789', 'travel0@gmail.com', 'john', 'staff', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `venue`
--

CREATE TABLE `venue` (
  `venue_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `venueschedule`
--

CREATE TABLE `venueschedule` (
  `schedule_id` bigint(20) NOT NULL,
  `date` date NOT NULL,
  `activity` varchar(255) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `venue_id` bigint(20) NOT NULL,
  `priest_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wedding`
--

CREATE TABLE `wedding` (
  `wedding_id` bigint(20) NOT NULL,
  `spouse_first_name` varchar(100) NOT NULL,
  `spouse_middle_name` varchar(100) NOT NULL,
  `spouse_last_name` varchar(100) NOT NULL,
  `officiating_priest` varchar(100) NOT NULL,
  `request_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`announcement_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `baptism`
--
ALTER TABLE `baptism`
  ADD PRIMARY KEY (`baptism_id`),
  ADD KEY `request_id` (`request_id`);

--
-- Indexes for table `confirmation`
--
ALTER TABLE `confirmation`
  ADD PRIMARY KEY (`confirmation_id`),
  ADD KEY `request_id` (`request_id`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `request_id` (`request_id`);

--
-- Indexes for table `priest`
--
ALTER TABLE `priest`
  ADD PRIMARY KEY (`priest_id`);

--
-- Indexes for table `priestschedule`
--
ALTER TABLE `priestschedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `priest_id` (`priest_id`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`requestID`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `venueSched_id` (`venueSched_id`),
  ADD KEY `priestSched_id` (`priestSched_id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`serviceID`);

--
-- Indexes for table `serviceschedule`
--
ALTER TABLE `serviceschedule`
  ADD PRIMARY KEY (`scheduleID`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `sponsor`
--
ALTER TABLE `sponsor`
  ADD PRIMARY KEY (`sonsor_id`),
  ADD KEY `baptism_id` (`baptism_id`),
  ADD KEY `confirmation_id` (`confirmation_id`),
  ADD KEY `wedding_id` (`wedding_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `venue`
--
ALTER TABLE `venue`
  ADD PRIMARY KEY (`venue_id`);

--
-- Indexes for table `venueschedule`
--
ALTER TABLE `venueschedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `venue_id` (`venue_id`),
  ADD KEY `priest_id` (`priest_id`);

--
-- Indexes for table `wedding`
--
ALTER TABLE `wedding`
  ADD PRIMARY KEY (`wedding_id`),
  ADD KEY `request_id` (`request_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcement`
--
ALTER TABLE `announcement`
  MODIFY `announcement_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `baptism`
--
ALTER TABLE `baptism`
  MODIFY `baptism_id` bigint(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `confirmation`
--
ALTER TABLE `confirmation`
  MODIFY `confirmation_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `log_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `priest`
--
ALTER TABLE `priest`
  MODIFY `priest_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `priestschedule`
--
ALTER TABLE `priestschedule`
  MODIFY `schedule_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `requestID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `serviceID` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `serviceschedule`
--
ALTER TABLE `serviceschedule`
  MODIFY `scheduleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `sponsor`
--
ALTER TABLE `sponsor`
  MODIFY `sonsor_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `venue`
--
ALTER TABLE `venue`
  MODIFY `venue_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `venueschedule`
--
ALTER TABLE `venueschedule`
  MODIFY `schedule_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wedding`
--
ALTER TABLE `wedding`
  MODIFY `wedding_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `announcement`
--
ALTER TABLE `announcement`
  ADD CONSTRAINT `announcement_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `baptism`
--
ALTER TABLE `baptism`
  ADD CONSTRAINT `baptism_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `request` (`requestID`);

--
-- Constraints for table `confirmation`
--
ALTER TABLE `confirmation`
  ADD CONSTRAINT `confirmation_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `request` (`requestID`);

--
-- Constraints for table `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `logs_ibfk_2` FOREIGN KEY (`request_id`) REFERENCES `request` (`requestID`);

--
-- Constraints for table `priestschedule`
--
ALTER TABLE `priestschedule`
  ADD CONSTRAINT `priestschedule_ibfk_1` FOREIGN KEY (`priest_id`) REFERENCES `priest` (`priest_id`);

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `request_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `service` (`serviceID`),
  ADD CONSTRAINT `request_ibfk_3` FOREIGN KEY (`venueSched_id`) REFERENCES `venueschedule` (`schedule_id`),
  ADD CONSTRAINT `request_ibfk_4` FOREIGN KEY (`priestSched_id`) REFERENCES `priestschedule` (`schedule_id`);

--
-- Constraints for table `serviceschedule`
--
ALTER TABLE `serviceschedule`
  ADD CONSTRAINT `serviceschedule_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `service` (`serviceID`);

--
-- Constraints for table `sponsor`
--
ALTER TABLE `sponsor`
  ADD CONSTRAINT `sponsor_ibfk_1` FOREIGN KEY (`baptism_id`) REFERENCES `baptism` (`baptism_id`),
  ADD CONSTRAINT `sponsor_ibfk_2` FOREIGN KEY (`confirmation_id`) REFERENCES `confirmation` (`confirmation_id`),
  ADD CONSTRAINT `sponsor_ibfk_3` FOREIGN KEY (`wedding_id`) REFERENCES `wedding` (`wedding_id`);

--
-- Constraints for table `venueschedule`
--
ALTER TABLE `venueschedule`
  ADD CONSTRAINT `venueschedule_ibfk_1` FOREIGN KEY (`venue_id`) REFERENCES `venue` (`venue_id`),
  ADD CONSTRAINT `venueschedule_ibfk_2` FOREIGN KEY (`priest_id`) REFERENCES `priest` (`priest_id`);

--
-- Constraints for table `wedding`
--
ALTER TABLE `wedding`
  ADD CONSTRAINT `wedding_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `request` (`requestID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
