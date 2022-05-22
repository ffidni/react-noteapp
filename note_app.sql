-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 23, 2022 at 01:01 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `note_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `date` varchar(20) NOT NULL,
  `user_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `content`, `category`, `date`, `user_id`) VALUES
('6c77dfc8-5d81-4bd9-a798-c60e699c1754', 'test note', 'Let\'s Write!', 'sports', '2022-05-17', '7822d6ec-379e-438d-8c47-e74391ed3971');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `selected_note` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `selected_note`) VALUES
('07e6e140-6a64-4ae1-8d0d-f18b7f372aa5', 'indiff@gmail.com', '1e49606ead074d7eddfa50a66d5003bc', 'testdd'),
('07e6e140-6a64-4ae1-8d0d-f18b7f372aa5ddx', 'realityinaships@gmail.com', 'f67c2bcbfcfa30fccb36f72dca22a817', ''),
('123123123213assadasd', 'reali22tyinaship@gmail.com', '1e49606ead074d7eddfa50a66d5003bc', ''),
('2cf71c0e-b1f8-480c-b04b-ab125b7aba7c', 'indif2@gmail.com', '1e49606ead074d7eddfa50a66d5003bc', ''),
('3f1970f5-f09d-414a-a0ce-443d7f61a77e', 'indiff23@gmail.com', '1e49606ead074d7eddfa50a66d5003bc', ''),
('645a8739-90d2-4f3c-a177-7cfd188814aa', 'indifff@gmail.com', '1e49606ead074d7eddfa50a66d5003bc', ''),
('7822d6ec-379e-438d-8c47-e74391ed3971', 'realityinaship@gmail.com', '1e49606ead074d7eddfa50a66d5003bc', '6c77dfc8-5d81-4bd9-a798-c60e699c1754'),
('85cce9e1-44e8-4ff2-92e7-df0dfeeb34a6', 'haikalhaikal@gmail.com', '1e49606ead074d7eddfa50a66d5003bc', ''),
('b2d39f11-0db0-4d87-873d-fff9d214a812', 'indiffjago@gmail.com', '1e49606ead074d7eddfa50a66d5003bc', ''),
('d8b47249-a6dc-420c-8841-707b0360c432', 'realityinashipd@gmail.com', '1e49606ead074d7eddfa50a66d5003bc', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
