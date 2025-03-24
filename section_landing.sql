-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 21, 2025 at 12:42 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `los`
--

-- --------------------------------------------------------

--
-- Table structure for table `section_landing`
--

CREATE TABLE `section_landing` (
  `id` int NOT NULL,
  `section` varchar(100) NOT NULL,
  `judul` varchar(200) NOT NULL,
  `deskripsi` text NOT NULL,
  `id_gambar` int DEFAULT NULL,
  `kontak` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `section_landing`
--

INSERT INTO `section_landing` (`id`, `section`, `judul`, `deskripsi`, `id_gambar`, `kontak`) VALUES
(9, '1', 'judul section 1', 'deskripsi 1', 1, '090349'),
(11, '2', 'judul section 2', 'deskripsi 2', NULL, '0828318'),
(13, '1', '1', '1', NULL, '1'),
(14, '1', 'judul', 'deskripsi', NULL, '0959690');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `section_landing`
--
ALTER TABLE `section_landing`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_gambar` (`id_gambar`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `section_landing`
--
ALTER TABLE `section_landing`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `section_landing`
--
ALTER TABLE `section_landing`
  ADD CONSTRAINT `section_landing_ibfk_1` FOREIGN KEY (`id_gambar`) REFERENCES `section_gambar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
