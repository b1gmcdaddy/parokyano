-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2024 at 02:50 PM
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
  `announcementID` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date_announced` date NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`announcementID`, `title`, `description`, `date_announced`, `user_id`) VALUES
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
  `priestID` bigint(20) NOT NULL,
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
  `gender` enum('male','female') DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact_no` varchar(11) NOT NULL,
  `relationship` varchar(100) DEFAULT NULL,
  `requested_by` varchar(255) DEFAULT NULL,
  `patient_status` varchar(100) DEFAULT NULL,
  `purpose` text DEFAULT NULL,
  `mother_name` varchar(100) DEFAULT NULL,
  `father_name` varchar(100) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `birth_place` varchar(100) DEFAULT NULL,
  `spouse_name` text DEFAULT NULL,
  `details` text DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `preferred_date` date DEFAULT NULL,
  `preferred_time` time DEFAULT NULL,
  `date_requested` date NOT NULL,
  `payment_method` enum('cash','gcash') NOT NULL,
  `transaction_date` date DEFAULT NULL,
  `interview_date` date DEFAULT NULL,
  `isCatholic` tinyint(1) DEFAULT NULL,
  `isChurchMarried` tinyint(1) DEFAULT NULL,
  `isCivilMarried` tinyint(1) DEFAULT NULL,
  `isLiveIn` tinyint(1) DEFAULT NULL,
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
  `priest_id` bigint(20) DEFAULT NULL,
  `venueSched_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`requestID`, `first_name`, `middle_name`, `last_name`, `age`, `gender`, `address`, `contact_no`, `relationship`, `requested_by`, `patient_status`, `purpose`, `mother_name`, `father_name`, `birth_date`, `birth_place`, `spouse_name`, `details`, `type`, `preferred_date`, `preferred_time`, `date_requested`, `payment_method`, `transaction_date`, `interview_date`, `isCatholic`, `isChurchMarried`, `isCivilMarried`, `isLiveIn`, `isPrenuptial`, `isRequirement`, `isParishioner`, `isSponsor`, `status`, `donation`, `payment_status`, `transaction_no`, `service_id`, `user_id`, `priest_id`, `venueSched_id`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'john', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-27', '06:00:00', '0000-00-00', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'paid', '0', 1, NULL, NULL, NULL),
(2, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'john', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-16', '05:00:00', '0000-00-00', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'paid', '0', 1, NULL, NULL, NULL),
(3, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-29', '17:30:00', '0000-00-00', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'paid', '0', 1, NULL, NULL, NULL),
(4, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '\"petition 1\"', NULL, '2024-06-30', '16:00:00', '2024-06-27', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'paid', '0', 1, NULL, NULL, NULL),
(5, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '\"petition 2\"', NULL, '2024-06-28', '17:30:00', '2024-06-27', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'paid', '0', 1, NULL, NULL, NULL),
(6, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'francis', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '\"test 3\"', NULL, '2024-06-28', '17:30:00', '2024-06-27', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'paid', '0', 1, NULL, NULL, NULL),
(7, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'francis', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '\"test 4\"', NULL, '2024-06-30', '16:00:00', '2024-06-27', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(8, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'francis', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '\"test 4\"', NULL, '2024-06-29', '06:00:00', '2024-06-27', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(9, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'francis', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '\"test 5\"', 'Petition', '2024-06-29', '06:00:00', '2024-06-27', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(10, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"saint\":\"\",\"wedding\":\"\",\"success\":\"research 1\",\"birthday\":\"\",\"others\":\"\"}', 'Thanksgiving', '2024-07-10', '06:00:00', '2024-07-01', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(11, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"saint\":\"\",\"wedding\":\"\",\"success\":\"research 1\",\"birthday\":\"\",\"others\":\"\"}', 'Thanksgiving', '2024-07-10', '06:00:00', '2024-07-01', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(12, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"saint\":\"\",\"wedding\":\"\",\"success\":\"research 1\",\"birthday\":\"\",\"others\":\"\"}', 'Thanksgiving', '2024-07-10', '06:00:00', '2024-07-01', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 200, 'unpaid', '0', 1, NULL, NULL, NULL),
(13, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '\"test6\"', 'Petition', '2024-07-03', '06:00:00', '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(14, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '\"test 7\"', 'Petition', '2024-07-13', '06:00:00', '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(15, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '\"test 8\"', 'Petition', '2024-07-07', '08:00:00', '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(16, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'john', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '\"test 9\"', 'Petition', '2024-07-11', '06:00:00', '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(17, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '\"test 10\"', 'Petition', '2024-07-14', '05:00:00', '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(18, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '\"test 11\"', 'Petition', '2024-07-03', '06:00:00', '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '0', 1, NULL, NULL, NULL),
(19, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '\"test 12\"', 'Petition', '2024-07-07', '06:30:00', '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024', 1, NULL, NULL, NULL),
(20, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '\"test 13\"', 'Petition', '2024-07-06', '06:00:00', '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-024ea5c508a6566e762405', 1, NULL, NULL, NULL),
(21, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '\"test 14\"', 'Petition', '2024-07-04', '06:00:00', '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-024ea5c508a6566e762405', 1, NULL, NULL, NULL),
(22, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '\"test 15\"', 'Petition', '2024-07-03', '17:30:00', '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-023a57bcaec3bee8ec8d0e', 1, NULL, NULL, NULL),
(23, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '\"test 16\"', 'Petition', '2024-07-07', '09:30:00', '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-029fb975236248daae62d2', 1, NULL, NULL, NULL),
(24, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"saint\":\"St.Joseph\",\"wedding\":\"\",\"success\":\"\",\"birthday\":\"\",\"others\":\"\"}', 'Thanksgiving', '2024-07-07', '09:30:00', '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-02955690f0855f3f297074', 1, NULL, NULL, NULL),
(25, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"saint\":\"\",\"wedding\":\"\",\"success\":\"research 2\",\"birthday\":\"\",\"others\":\"\"}', 'Thanksgiving', '2024-07-03', '06:00:00', '2024-07-02', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-02afb2944991acffd7f8ba', 1, NULL, NULL, NULL),
(26, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"saint\":\"\",\"wedding\":\"\",\"success\":\"research 3\",\"birthday\":\"\",\"others\":\"\"}', 'Thanksgiving', '2024-07-10', '06:00:00', '2024-07-08', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-082b981b83bf4cabcd6877', 1, NULL, NULL, NULL),
(27, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'francis', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"saint\":\"\",\"wedding\":\"\",\"success\":\"research 4\",\"birthday\":\"\",\"others\":\"\"}', 'Thanksgiving', '2024-07-14', '09:30:00', '2024-07-08', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-084b9724abc272fa7230c2', 1, NULL, NULL, NULL),
(28, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"saint\":\"\",\"wedding\":\"\",\"success\":\"research 4\",\"birthday\":\"\",\"others\":\"\"}', 'Thanksgiving', '2024-07-14', '06:30:00', '2024-07-08', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-08c381406868dd3e47be7b', 1, NULL, NULL, NULL),
(29, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'francis', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"saint\":\"St.Joseph\",\"wedding\":\"\",\"success\":\"\",\"birthday\":\"\",\"others\":\"\"}', 'Thanksgiving', '2024-07-14', '08:00:00', '2024-07-08', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-08750304cb441b3f47bb18', 1, NULL, NULL, NULL),
(30, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'francis', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[\"Lucas\"]', 'Souls', '2024-07-14', '08:00:00', '2024-07-08', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-08730407542183048c8add', 1, NULL, NULL, NULL),
(31, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'francis', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[\"Matthew\"]', 'Souls', '2024-07-20', '17:30:00', '2024-07-08', 'gcash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-08d5bf4559a767e1464335', 1, NULL, NULL, NULL),
(32, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'francis', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[\"Matthew\"]', 'Souls', '2024-07-20', '17:30:00', '2024-07-08', 'gcash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-08d5bf4559a767e1464335', 1, NULL, NULL, NULL),
(33, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'francis', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[\"Matthew\"]', 'Souls', '2024-07-20', '17:30:00', '2024-07-08', 'gcash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-08d5bf4559a767e1464335', 1, NULL, NULL, NULL),
(34, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'francis', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[\"Lucas\"]', 'Souls', '2024-07-13', '06:00:00', '2024-07-08', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-08e5d82b1054b46cd9cb30', 1, NULL, NULL, NULL),
(35, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[\"Clyde\"]', 'Souls', '2024-07-13', '06:00:00', '2024-07-08', 'gcash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-0888aa528ce2b73fbc6190', 1, NULL, NULL, NULL),
(36, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{\"saint\":\"St.Peter\",\"wedding\":\"\",\"success\":\"\",\"birthday\":\"\",\"others\":\"\"}', 'Thanksgiving', '2024-07-10', '06:00:00', '2024-07-08', 'gcash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-08972b8c4227d87e966c5f', 1, NULL, NULL, NULL),
(37, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '\"test 17\"', 'Petition', '2024-07-13', '17:30:00', '2024-07-08', 'gcash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-084d099cede9f883cf32ff', 1, NULL, NULL, NULL),
(38, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'francis', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '\"test 18\"', 'Petition', '2024-07-12', '06:00:00', '2024-07-08', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-08de526129976e02cf1d2c', 1, NULL, NULL, NULL),
(39, 'Joseph', '', 'JOJO', NULL, NULL, 'Cebu', '19103541', NULL, NULL, NULL, NULL, 'Mother', 'Father', '2024-07-10', NULL, NULL, NULL, NULL, '0000-00-00', '00:00:00', '2024-07-09', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', NULL, 'unpaid', '2024-07-093cad31a418e76d4035ec', 2, NULL, NULL, NULL),
(40, 'Joseph', '', 'JOJO', NULL, NULL, 'Cebu', '19103541', NULL, NULL, NULL, NULL, 'Mother', 'Father', '2024-07-10', NULL, NULL, NULL, NULL, '0000-00-00', '00:00:00', '2024-07-09', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', NULL, 'unpaid', '2024-07-093cad31a418e76d4035ec', 2, NULL, NULL, NULL),
(41, 'Joseph', '', 'JOJO', NULL, NULL, 'Cebu', '19103541', NULL, NULL, NULL, NULL, 'Mother', 'Father', '2024-07-11', NULL, NULL, NULL, NULL, '0000-00-00', '00:00:00', '2024-07-09', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', NULL, 'unpaid', '2024-07-0935763fb9bb041d3637ad', 2, NULL, NULL, NULL),
(42, 'Joseph', '', 'JOJO', NULL, NULL, 'Cebu', '19103541', NULL, NULL, NULL, NULL, 'Mother', 'Father', '2024-07-11', NULL, NULL, '{\"book_no\":\"\",\"line_no\":\"\",\"page_no\":\"\"}', NULL, '0000-00-00', '00:00:00', '2024-07-09', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', NULL, 'unpaid', '2024-07-0935763fb9bb041d3637ad', 2, NULL, NULL, NULL),
(43, 'Joseph', '', 'JOJO', NULL, NULL, 'Cebu', '19103541', NULL, NULL, NULL, NULL, 'Mother', 'Father', '2024-07-17', NULL, NULL, '{\"book_no\":\"\",\"line_no\":\"\",\"page_no\":\"\"}', NULL, '0000-00-00', '00:00:00', '2024-07-09', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', NULL, 'unpaid', '2024-07-09fb864e52a1a58158e069', 2, NULL, NULL, NULL),
(44, 'Joseph', '', 'JOJO', NULL, NULL, 'Cebu', '19103541', NULL, NULL, NULL, NULL, 'Mother', 'Father', '2024-07-17', NULL, NULL, '{\"book_no\":\"\",\"line_no\":\"\",\"page_no\":\"\"}', NULL, '0000-00-00', '00:00:00', '2024-07-09', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', NULL, 'unpaid', '2024-07-09fb864e52a1a58158e069', 2, NULL, NULL, NULL),
(45, 'Joseph', 'test 20', 'JOJO', NULL, NULL, 'Cebu', '19103541', NULL, NULL, NULL, NULL, 'Mother', 'Father', '2024-07-10', NULL, NULL, '{\"book_no\":\"\",\"line_no\":\"\",\"page_no\":\"\"}', NULL, '0000-00-00', '00:00:00', '2024-07-09', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', NULL, 'unpaid', '2024-07-0954db24d7c375fadf2806', 2, NULL, NULL, NULL),
(46, 'Joseph', 'test 20', 'JOJO', NULL, NULL, 'Cebu', '19103541', NULL, NULL, NULL, NULL, 'Mother', 'Father', '2024-07-10', NULL, NULL, '{\"book_no\":\"\",\"line_no\":\"\",\"page_no\":\"\"}', NULL, '0000-00-00', '00:00:00', '2024-07-09', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', NULL, 'unpaid', '2024-07-0954db24d7c375fadf2806', 2, NULL, NULL, NULL),
(47, 'Joseph', 'test 20', 'JOJO', NULL, NULL, 'Cebu', '19103541', NULL, NULL, NULL, NULL, 'Mother', 'Father', '2024-07-10', NULL, NULL, '{\"book_no\":\"\",\"line_no\":\"\",\"page_no\":\"\"}', NULL, '0000-00-00', '00:00:00', '2024-07-09', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', NULL, 'unpaid', '2024-07-0954db24d7c375fadf2806', 2, NULL, NULL, NULL),
(48, 'Joseph', 'test 20', 'JOJO', NULL, NULL, 'Cebu', '19103541', NULL, NULL, NULL, NULL, 'Mother', 'Father', '2024-07-10', NULL, NULL, '{\"book_no\":\"\",\"line_no\":\"\",\"page_no\":\"\"}', NULL, '0000-00-00', '00:00:00', '2024-07-09', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', NULL, 'unpaid', '2024-07-0954db24d7c375fadf2806', 2, NULL, NULL, NULL),
(49, 'Joseph', 'test 21', 'JOJO', NULL, NULL, 'Cebu', '19103541', NULL, NULL, NULL, 'school', 'Mother', 'Father', '2024-07-03', NULL, NULL, '{\"book_no\":\"2\",\"line_no\":\"4\",\"page_no\":\"3\"}', NULL, '0000-00-00', '00:00:00', '2024-07-09', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', NULL, 'unpaid', '2024-07-09d0f896f3213b8daabb94', 2, NULL, NULL, NULL),
(50, 'Joseph', 'test 22', 'JOJO', NULL, NULL, 'Cebu', '19103541', NULL, NULL, NULL, 'school', 'Mother', 'Father', '2024-07-01', NULL, NULL, '{\"book_no\":\"1\",\"line_no\":\"3\",\"page_no\":\"2\"}', NULL, NULL, NULL, '2024-07-09', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', NULL, 'unpaid', '2024-07-0960cd8691b8ff22d1fc20', 2, NULL, NULL, NULL),
(51, 'Joseph', 'test 23', 'JOJO', NULL, NULL, 'Cebu', '19103541', NULL, NULL, NULL, 'late registration', 'Mother', 'Father', '0000-00-00', NULL, NULL, '{\"book_no\":\"1\",\"line_no\":\"3\",\"page_no\":\"2\"}', NULL, NULL, NULL, '2024-07-10', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', NULL, 'unpaid', '2024-07-1037c4e3decedd408af414', 2, NULL, NULL, NULL),
(52, 'Joseph', 'test 24', 'JOJO', NULL, NULL, 'Cebu', '19103541', NULL, NULL, NULL, 'passport', 'Mother', 'Father', '2024-07-12', NULL, NULL, '{\"book_no\":\"1\",\"line_no\":\"1\",\"page_no\":\"1\"}', NULL, '2024-07-12', NULL, '2024-07-10', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', NULL, 'unpaid', '2024-07-10a27c12f3d1fd5e5002f6', 2, NULL, NULL, NULL),
(53, 'Joseph', '', 'JOJO', NULL, NULL, '', '19103541', NULL, NULL, NULL, 'school', NULL, NULL, '0000-00-00', NULL, '{\"firstName\":\"Mary\",\"middleName\":\"\",\"lastName\":\"JOJO\"}', '{\"book_no\":\"1\",\"page_no\":\"1\",\"line_no\":\"1\"}', NULL, '2024-07-11', NULL, '2024-07-10', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', NULL, 'unpaid', '2024-07-10f828b7c27d3460e72a12', 4, NULL, NULL, NULL),
(54, 'Joseph', 'test 25', 'JOJO', NULL, NULL, NULL, '19103541', NULL, NULL, NULL, 'school', NULL, NULL, NULL, NULL, '{\"firstName\":\"Mary\",\"middleName\":\"\",\"lastName\":\"JOJO\"}', '{\"book_no\":\"1\",\"page_no\":\"1\",\"line_no\":\"1\"}', NULL, '2024-07-12', NULL, '2024-07-10', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', NULL, 'unpaid', '2024-07-10e25ece1e013e455d8fc1', 4, NULL, NULL, NULL),
(55, NULL, NULL, NULL, NULL, NULL, NULL, '19103541', NULL, 'joseph', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[\"lucas\",\"matthew\"]', 'Souls', '2024-07-13', '06:00:00', '2024-07-12', 'cash', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 100, 'unpaid', '2024-07-12c07184e6a28ce1a004be', 1, NULL, NULL, NULL);

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
(1, 'Mass Intention', NULL, NULL, NULL),
(2, 'Certificate - Confirmation', NULL, 50, NULL),
(3, 'Certificate - Baptism', NULL, 100, NULL),
(4, 'Certificate - Marriage', NULL, 150, NULL);

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
  `userID` bigint(20) NOT NULL,
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

INSERT INTO `user` (`userID`, `first_name`, `last_name`, `user_type`, `date_started`, `date_ended`, `contact_no`, `email`, `username`, `password`, `status`) VALUES
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
  `husband` varchar(255) NOT NULL,
  `spouse` varchar(255) NOT NULL,
  `wedding_date` date NOT NULL,
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
  ADD PRIMARY KEY (`announcementID`),
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
  ADD PRIMARY KEY (`priestID`);

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
  ADD KEY `priest_id` (`priest_id`);

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
  ADD PRIMARY KEY (`userID`);

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
  MODIFY `announcementID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `priestID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `priestschedule`
--
ALTER TABLE `priestschedule`
  MODIFY `schedule_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `requestID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `serviceID` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `userID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  ADD CONSTRAINT `announcement_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`userID`);

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
  ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`userID`),
  ADD CONSTRAINT `logs_ibfk_2` FOREIGN KEY (`request_id`) REFERENCES `request` (`requestID`);

--
-- Constraints for table `priestschedule`
--
ALTER TABLE `priestschedule`
  ADD CONSTRAINT `priestschedule_ibfk_1` FOREIGN KEY (`priest_id`) REFERENCES `priest` (`priestID`);

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`userID`),
  ADD CONSTRAINT `request_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `service` (`serviceID`),
  ADD CONSTRAINT `request_ibfk_3` FOREIGN KEY (`venueSched_id`) REFERENCES `venueschedule` (`schedule_id`),
  ADD CONSTRAINT `request_ibfk_4` FOREIGN KEY (`priest_id`) REFERENCES `priest` (`priestID`);

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
  ADD CONSTRAINT `venueschedule_ibfk_2` FOREIGN KEY (`priest_id`) REFERENCES `priest` (`priestID`);

--
-- Constraints for table `wedding`
--
ALTER TABLE `wedding`
  ADD CONSTRAINT `wedding_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `request` (`requestID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
