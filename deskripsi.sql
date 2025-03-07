-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 07, 2025 at 06:20 AM
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
-- Table structure for table `deskripsi`
--

CREATE TABLE `deskripsi` (
  `id` int NOT NULL,
  `Kode` char(10) NOT NULL,
  `Keterangan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `deskripsi`
--

INSERT INTO `deskripsi` (`id`, `Kode`, `Keterangan`) VALUES
(3, '1', 'Optimalkan keuangan bisnismu dengan Godong Software, mudah menyusun laporan, memonitor transaksi, dan menganalisis kinerja.'),
(4, '2', 'Karena kami tidak pernah mengambil uang dari investor, kami dapat selalu fokus pada apa yang terbaik bagi pelanggan. Daripada mengkhawatirkan profit jangka pendek, kami memiliki kebebasan untuk berpikir jangka panjang. Kebebasan semacam ini mengubah cara kami memecahkan masalah, memberdayakan kami untuk berpikir dengan cara yang benar-benar berbeda.'),
(5, '3', 'Kami menghadirkan berbagai solusi perangkat lunak yang komprehensif dan mudah digunakan untuk memenuhi berbagai kebutuhan bisnis Anda. Berikut adalah beberapa produk unggulan kami:'),
(6, '4', 'Godong adalah solusi ideal untuk mempermudah berbagai aspek operasional bisnis Anda. Dari mempercepat proses pembayaran (kasir) dan meningkatkan kepuasan pelanggan, hingga membantu pembuatan laporan keuangan yang akurat dan memberikan fitur manajemen bisnis yang dapat disesuaikan dengan kebutuhan Anda, Godong memastikan Anda dapat mengelola bisnis dengan efisien dan fokus pada pertumbuhan usaha Anda. Godong adalah mitra terpercaya menuju kesuksesan bisnis Anda. Godong juga mampu mengelola sistem koperasi dengan efektif, mendukung administrasi yang lebih terorganisir dan transparan. Dengan antarmuka yang user-friendly dan dukungan teknis yang handal, Godong adalah mitra terpercaya menuju kesuksesan bisnis Anda.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `deskripsi`
--
ALTER TABLE `deskripsi`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `deskripsi`
--
ALTER TABLE `deskripsi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
