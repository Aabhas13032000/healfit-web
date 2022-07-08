-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 08, 2022 at 06:10 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `healfit_new`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` longtext NOT NULL,
  `password` longtext NOT NULL,
  `profile_image` longtext NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `app_version` varchar(6) NOT NULL,
  `ios_app_version` varchar(6) NOT NULL,
  `shipping` int(11) NOT NULL DEFAULT 0,
  `phoneNumber` varchar(20) NOT NULL,
  `share_text` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `profile_image`, `status`, `app_version`, `ios_app_version`, `shipping`, `phoneNumber`, `share_text`) VALUES
(1, 'Lalit Verma', 'admin@example.com', '1234567890', '/images/user/male.png', 1, '1.0.0', '1.0.0', 0, '+917524884466', 'To explore more programs click on the link given below');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` bigint(20) NOT NULL,
  `title` longtext DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `path` longtext DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `pdf` longtext DEFAULT NULL,
  `language_id` int(11) NOT NULL DEFAULT 1,
  `share_url` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `description`, `path`, `status`, `created_at`, `pdf`, `language_id`, `share_url`) VALUES
(1, 'The 5 best fruits for your health', 'Fruits is nature’s candy. Beautiful to look at, tasty to eat and good for you too. The health benefits of fruits are packed with naturally occurring vitamins and minerals. The first benefit of fruits is the fiber content, which aids in digestion and healthy bowel movements. Proper digestion allows our cells to better absorb the nutrients that we need for energy throughout our body. The fruits also contain vitamin C which is needed for healthy skin, and helps guard against eye diseases. Some of the health benefits include a healthy balance of carbohydrates, fats, and proteins, folic acid, vitamin K and E, and essential minerals like zinc. These powerful benefits make them a superfood that should be included in a healthy diet. Here is a list of 5 best fruits for your health, that you should consume daily –', '/images/all/1640070015291--bakery-style-cookies-02-1.jpg', 0, '2021-12-25 05:33:24', NULL, 1, NULL),
(2, 'India Street Foods that are healthy', '<p>When it comes to the cuisines originating from the subcontinent of India, there can be little doubt that street food is king. Some staples such as samosas and chapati make their origins hard to pinpoint, but the names themselves give a good idea of where they were created.Street food is very common in India. The term refers to food sold by hawkers in an open street or market. However, it has become a major cultural phenomenon embraced by millions of Indians across the nation. Indian street food has something for every palate.Yes, Bhelpuri is healthy food. Made from deep-fried rice, puffed rice (bhakri), a tangy salad of chopped vegetables, yogurt and green chilies, it is a wholesome dish with a range of nutrients. It is an excellent source of Vitamin A and C, iron and calcium.</p>\n', '/images/all/1640070398380--4blog-1600x988.jpeg', 1, '2021-12-25 05:33:24', '', 1, 'https://cheftarunabirla.page.link/n6cGsumHByRhLFCR9'),
(3, 'testing pdf ', '<p>hello guys</p>\n', '/images/uploads/1649101949995.jpeg', 0, '2022-04-04 19:52:33', '', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` longtext DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `promo_video` longtext DEFAULT NULL,
  `price` int(10) DEFAULT NULL,
  `discount_price` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `days` int(10) DEFAULT NULL,
  `category` longtext DEFAULT NULL,
  `pdf` longtext DEFAULT NULL,
  `imp` tinyint(4) NOT NULL DEFAULT 0,
  `price_with_video` int(11) DEFAULT NULL,
  `includes_videos` varchar(20) DEFAULT NULL,
  `discont_price_with_video` int(11) DEFAULT NULL,
  `video_days` int(11) DEFAULT NULL,
  `only_video_price` int(11) DEFAULT NULL,
  `only_video_discount_price` int(11) DEFAULT NULL,
  `language_id` int(11) NOT NULL DEFAULT 1,
  `share_url` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `description`, `promo_video`, `price`, `discount_price`, `created_at`, `status`, `days`, `category`, `pdf`, `imp`, `price_with_video`, `includes_videos`, `discont_price_with_video`, `video_days`, `only_video_price`, `only_video_discount_price`, `language_id`, `share_url`) VALUES
(1, 'Enchanted', '<p>A kitchen geek is what they called me and I&rsquo;ve always been! It&rsquo;s a proud little name I&rsquo;ll take other than being called chef obviously. Baking gives me the amount of pleasure no other thing can give, and deciding to dedicate my life to it is one of the best decisions I&rsquo;ve made, other than eating the whole chocolate cake obviously!. Sweet Tooth, I&rsquo;ve always had! So, I needed to make sure I satisfy my cravings everyday! A passion for cooking and teaching is what you&rsquo;ll see in this secret recipe book! Shhhh!</p>\n', NULL, 700, 490, '2022-06-01 19:34:09', 1, 365, 'e_book', '/images/all/enchanted.pdf', 1, 0, 'yes', 0, 20, 1500, 300, 1, 'https://cheftarunabirla.page.link/b3ygTeuJxJ8J4CV86'),
(2, 'Luscious', '<p>Luscious Love From Mom provides you 35 delicious and full vegetarian recipes which you can easily make at your home for your kids. As you know now a days kids hate green vegetables, fruits and vegetables which are rich in proteins so here Luscious Love From Mom will help you to provide a diet full of proteins to your toddlers.</p>\n', NULL, 700, 490, '2022-06-02 02:06:06', 1, 365, 'e_book', '/images/all/Luscious.pdf', 1, 200, 'yes', 100, 20, 700, 600, 1, 'https://cheftarunabirla.page.link/FYXrkvcvxuJsBkeTA'),
(3, 'Enchanted Book', '<p>A kitchen geek is what they called me and I&rsquo;ve always been! It&rsquo;s a proud little name I&rsquo;ll take other than being called chef obviously. Baking gives me the amount of pleasure no other thing can give, and deciding to dedicate my life to it is one of the best decisions I&rsquo;ve made, other than eating the whole chocolate cake obviously!. Sweet Tooth, I&rsquo;ve always had! So, I needed to make sure I satisfy my cravings everyday! A passion for cooking and teaching is what you&rsquo;ll see in this secret recipe book! Shhhh!</p>\n', NULL, 2000, 1000, '2022-06-13 10:41:57', 1, 0, 'physical', NULL, 0, 0, 'yes', 0, 20, 700, 700, 1, 'https://cheftarunabirla.page.link/pfJsgYeToBxuGUMP9'),
(4, 'Luscious Book', '<p>Luscious Love From Mom provides you 35 delicious and full vegetarian recipes which you can easily make at your home for your kids. As you know now a days kids hate green vegetables, fruits and vegetables which are rich in proteins so here Luscious Love From Mom will help you to provide a diet full of proteins to your toddlers.</p>\n', NULL, 2000, 1000, '2022-06-06 06:21:56', 1, 0, 'physical', NULL, 0, 0, 'yes', 0, 20, 300, 300, 1, 'https://cheftarunabirla.page.link/eCJ3784h7zmGhFPMA');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` bigint(20) NOT NULL,
  `item_category` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_id` bigint(20) NOT NULL,
  `cart_category` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pincode` int(6) NOT NULL DEFAULT 0,
  `image_path` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `id` int(11) NOT NULL,
  `user_id` bigint(45) DEFAULT NULL,
  `ccode` varchar(45) DEFAULT NULL,
  `dis` float DEFAULT NULL,
  `linked_category` longtext DEFAULT NULL,
  `linked_array` longtext DEFAULT NULL,
  `discount_for` longtext DEFAULT NULL,
  `minimum` int(11) DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `shipping` int(11) NOT NULL DEFAULT 90,
  `status` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `days`
--

CREATE TABLE `days` (
  `id` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `exercise`
--

CREATE TABLE `exercise` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `cat` enum('LEG','CHEST','CARDIO') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'CARDIO',
  `thumbnailUrl` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `calories` float NOT NULL DEFAULT 0,
  `set` int(11) NOT NULL DEFAULT 1,
  `perset` int(11) NOT NULL DEFAULT 1,
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnailUrl` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `meals` enum('BREAKFAST','LUNCH','DINNER','SNACKS') COLLATE utf8mb4_unicode_ci NOT NULL,
  `units` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `calories` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `protein` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `fats` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `carbs` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `fiber` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` bigint(20) NOT NULL,
  `item_category` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_id` bigint(20) NOT NULL,
  `path` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `iv_category` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) NOT NULL,
  `item_id` int(11) DEFAULT NULL,
  `message` longtext DEFAULT NULL,
  `category` varchar(20) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `item_id`, `message`, `category`, `user_id`, `created_at`, `status`) VALUES
(1, 77, 'You had puchased a course', 'course', 3625, '2022-06-15 11:11:27', 1),
(2, 77, 'You had puchased a course', 'course', 3628, '2022-06-15 11:29:47', 1),
(3, 72, 'You had puchased a course', 'course', 3628, '2022-06-15 11:53:52', 1),
(4, 77, 'You had puchased a course', 'course', 3252, '2022-06-15 15:51:21', 1),
(5, 77, 'You had puchased a course', 'course', 3613, '2022-06-15 16:43:50', 1),
(6, 77, 'You had puchased a course', 'course', 1333, '2022-06-15 17:30:01', 1),
(7, 77, 'You had puchased a course', 'course', 3434, '2022-06-16 02:52:43', 1),
(8, 77, 'You had puchased a course', 'course', 1520, '2022-06-16 03:49:09', 1),
(9, 77, 'You had puchased a course', 'course', 63, '2022-06-16 05:25:30', 1),
(10, 75, 'You had puchased a course', 'course', 63, '2022-06-16 05:25:31', 1),
(11, 77, 'You had puchased a course', 'course', 1679, '2022-06-16 06:31:18', 1),
(12, 77, 'You had puchased a course', 'course', 1981, '2022-06-16 09:33:04', 1),
(13, 77, 'You had puchased a course', 'course', 3676, '2022-06-16 11:41:40', 1),
(14, 77, 'You had puchased a course', 'course', 3677, '2022-06-16 11:48:01', 1),
(15, 77, 'You had puchased a course', 'course', 3230, '2022-06-16 12:51:00', 1),
(16, 77, 'You had puchased a course', 'course', 3694, '2022-06-16 18:16:03', 1),
(17, 77, 'You had puchased a course', 'course', 3697, '2022-06-16 19:14:18', 1),
(18, 77, 'You had puchased a course', 'course', 204, '2022-06-16 19:24:10', 1),
(19, 77, 'You had puchased a course', 'course', 465, '2022-06-17 02:42:57', 1),
(20, 77, 'You had puchased a course', 'course', 589, '2022-06-17 03:59:57', 1),
(21, 77, 'You had puchased a course', 'course', 2676, '2022-06-17 05:38:00', 1),
(22, 77, 'You had puchased a course', 'course', 3710, '2022-06-17 07:14:25', 1),
(23, 77, 'You had puchased a course', 'course', 60, '2022-06-17 23:35:35', 1),
(24, 23, 'You had puchased a course', 'course', 1020, '2022-06-18 11:38:18', 1),
(25, 77, 'You had puchased a course', 'course', 3386, '2022-06-18 12:08:05', 1),
(26, 77, 'You had puchased a course', 'course', 3752, '2022-06-18 16:16:28', 1),
(27, 77, 'You had puchased a course', 'course', 612, '2022-06-19 08:23:47', 1),
(28, 77, 'You had puchased a course', 'course', 249, '2022-06-19 15:09:11', 1),
(29, 77, 'You had puchased a course', 'course', 1126, '2022-06-19 15:30:51', 1),
(30, 77, 'You had puchased a course', 'course', 3597, '2022-06-19 16:55:50', 1),
(31, 70, 'You had puchased a course', 'course', 3597, '2022-06-19 16:55:51', 1),
(32, 77, 'You had puchased a course', 'course', 3809, '2022-06-19 17:40:04', 1),
(33, 77, 'You had puchased a course', 'course', 3787, '2022-06-20 03:06:27', 1),
(34, 81, 'You had puchased a course', 'course', 3787, '2022-06-20 03:06:28', 1),
(35, 77, 'You had puchased a course', 'course', 2578, '2022-06-20 04:42:05', 1),
(36, 77, 'You had puchased a course', 'course', 3835, '2022-06-20 09:46:33', 1),
(37, 81, 'You had puchased a course', 'course', 1020, '2022-06-20 11:01:25', 1),
(38, 77, 'You had puchased a course', 'course', 3886, '2022-06-20 11:40:45', 1),
(39, 77, 'You had puchased a course', 'course', 3000, '2022-06-20 11:46:20', 1),
(40, 77, 'You had puchased a course', 'course', 3890, '2022-06-20 13:20:55', 1),
(41, 72, 'You had puchased a course', 'course', 3813, '2022-06-20 15:31:10', 1),
(42, 77, 'You had puchased a course', 'course', 3621, '2022-06-21 02:58:34', 1),
(43, 82, 'You had puchased a course', 'course', 3598, '2022-06-21 04:27:59', 1),
(44, 83, 'You had puchased a course', 'course', 3598, '2022-06-21 04:28:00', 1),
(45, 77, 'You had puchased a course', 'course', 3009, '2022-06-21 04:31:51', 1),
(46, 77, 'You had puchased a course', 'course', 3919, '2022-06-21 08:18:21', 1),
(47, 72, 'You had puchased a course', 'course', 3697, '2022-06-22 18:00:39', 1),
(48, 77, 'You had puchased a course', 'course', 2846, '2022-06-23 10:24:50', 1),
(49, 77, 'You had puchased a course', 'course', 61, '2022-06-23 11:26:07', 1),
(50, 28, 'You had puchased a course', 'course', 3248, '2022-06-23 16:03:02', 1),
(51, 68, 'You had puchased a course', 'course', 3375, '2022-06-24 07:49:57', 1),
(52, 77, 'You had puchased a course', 'course', 1755, '2022-06-24 09:28:16', 1),
(53, 77, 'You had puchased a course', 'course', 1019, '2022-06-25 06:14:07', 1),
(54, 77, 'You had puchased a course', 'course', 3820, '2022-06-26 05:06:00', 1),
(55, 77, 'You had puchased a course', 'course', 254, '2022-06-26 12:06:29', 1),
(56, 77, 'You had puchased a course', 'course', 3953, '2022-06-26 18:19:55', 1),
(57, 70, 'You had puchased a course', 'course', 3129, '2022-06-27 11:22:08', 1),
(58, 74, 'You had puchased a course', 'course', 3129, '2022-06-27 11:22:09', 1),
(59, 82, 'You had puchased a course', 'course', 3129, '2022-06-27 11:22:10', 1),
(60, 75, 'You had puchased a course', 'course', 3129, '2022-06-27 11:22:11', 1),
(61, 68, 'You had puchased a course', 'course', 3129, '2022-06-27 11:22:12', 1),
(62, 86, 'You had puchased a course', 'course', 3331, '2022-06-27 14:10:05', 1),
(63, 71, 'You had puchased a course', 'course', 446, '2022-06-28 07:52:02', 1),
(64, 77, 'You had puchased a course', 'course', 3723, '2022-06-28 10:50:39', 1),
(65, 81, 'You had puchased a course', 'course', 3009, '2022-06-28 14:07:07', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `order_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tracking` enum('SHIPPED','DELIVERED','OUT FOR DELIVERY') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'SHIPPED',
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `id` bigint(20) NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `short_desc` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` int(100) NOT NULL,
  `thumbnail` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `trainer_id` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `from_id` bigint(20) DEFAULT NULL,
  `related_products` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `views` bigint(20) NOT NULL DEFAULT 0,
  `promo_video` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `program_categories`
--

CREATE TABLE `program_categories` (
  `id` int(100) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `imp` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `id` int(11) NOT NULL,
  `days` int(11) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `social_links`
--

CREATE TABLE `social_links` (
  `id` bigint(20) NOT NULL,
  `trainer_id` int(11) NOT NULL,
  `scat_id` int(11) NOT NULL,
  `url` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `social_links_category`
--

CREATE TABLE `social_links_category` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_path` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `id` bigint(20) NOT NULL,
  `item_id` bigint(20) NOT NULL,
  `item_category` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `session_type` enum('SINGLE','PACKAGE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `day_id` int(11) NOT NULL,
  `time_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  `date_purchased` timestamp NOT NULL DEFAULT current_timestamp(),
  `end_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` bigint(20) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `name` longtext DEFAULT NULL,
  `message` longtext DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `imp` tinyint(4) NOT NULL DEFAULT 0,
  `image` longtext DEFAULT NULL,
  `profile_image` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `message`, `status`, `imp`, `image`, `profile_image`) VALUES
(1, 'testing user 6', '<p>The table runner you sent for my birthday is perfect! I can tell you spent a lot of time picking it out, and it makes me smile to think about how thoughtful you are</p>\n', 0, 0, '/images/uploads/1648498766417.webp', '/images/uploads/1648502388640.webp'),
(2, 'testing user 5', '<p>The table runner you sent for my birthday is perfect! I can tell you spent a lot of time picking it out, and it makes me smile to think about how thoughtful you are</p>\n', 0, 1, '/images/uploads/1648498751080.webp', '/images/uploads/1648502377727.webp'),
(3, 'testing user 4', '<p>The table runner you sent for my birthday is perfect! I can tell you spent a lot of time picking it out, and it makes me smile to think about how thoughtful you are</p>\n', 0, 1, '/images/uploads/1648498736093.webp', '/images/uploads/1648502460683.webp'),
(4, 'testing user 3', '<p>The table runner you sent for my birthday is perfect! I can tell you spent a lot of time picking it out, and it makes me smile to think about how thoughtful you are</p>\n', 0, 1, '/images/uploads/1648498725279.webp', '/images/uploads/1648502453462.webp'),
(5, 'testing user 1', '<p>The table runner you sent for my birthday is perfect! I can tell you spent a lot of time picking it out, and it makes me smile to think about how thoughtful you are&nbsp;, and it makes me smile to think about how thoughtful you are</p>\n', 0, 0, '/images/uploads/1648498664044.webp', '/images/uploads/1648502358380.webp'),
(6, 'testing user 2', '<p>The table runner you sent for my birthday is perfect! I can tell you spent a lot of time picking it out, and it makes me smile to think about how thoughtful you are&nbsp;The table runner you sent for my birthday is perfect! I can tell you spent a lot of time picking it out, and it makes me smile to think about how thoughtful you are&nbsp;The table runner you sent for my birthday is perfect! I can tell you spent a lot of time picking it out, and it makes me smile to think about how thoughtful you are&nbsp;</p>\n', 0, 1, '/images/uploads/1648497294071.webp', '/images/uploads/1648498821882.webp');

-- --------------------------------------------------------

--
-- Table structure for table `time`
--

CREATE TABLE `time` (
  `id` int(11) NOT NULL,
  `value` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `trainer`
--

CREATE TABLE `trainer` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `about` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `vision` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `qualification` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` int(11) NOT NULL,
  `expertise` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_image` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('ACTIVE','BLOCKED','DELETED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `phoneNumber` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '+910000000000',
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `days_id` int(11) NOT NULL,
  `time_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `trainer_programs`
--

CREATE TABLE `trainer_programs` (
  `id` bigint(20) NOT NULL,
  `trainer_id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `session_type` enum('SINGLE','PACKAGE') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'SINGLE',
  `day_id` int(11) NOT NULL,
  `time_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  `price` int(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `base_value` float NOT NULL DEFAULT 1,
  `servings` int(11) NOT NULL DEFAULT 1,
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` enum('MALE','FEMALE','OTHERS') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'MALE',
  `age` int(3) NOT NULL DEFAULT 0,
  `weight` float NOT NULL DEFAULT 0,
  `target_weight` float NOT NULL DEFAULT 0,
  `logged_in` tinyint(1) NOT NULL DEFAULT 1,
  `device_id` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_image` longtext COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '/images/local/male.png',
  `phoneNumber` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '+910000000000',
  `height` float NOT NULL DEFAULT 0,
  `device` enum('ANDROID','IOS','WEB') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ANDROID',
  `status` enum('ACTIVE','BLOCKED','DELETED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `is_otp_verified` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_calories`
--

CREATE TABLE `user_calories` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `food_id` bigint(20) NOT NULL,
  `meal` enum('BREAKFAST','LUNCH','DINNER','SNACKS') COLLATE utf8mb4_unicode_ci NOT NULL,
  `servings` int(11) NOT NULL DEFAULT 1,
  `unit_id` int(11) NOT NULL,
  `calories` float NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_exercise`
--

CREATE TABLE `user_exercise` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `exercise_id` bigint(20) NOT NULL,
  `set` int(11) NOT NULL DEFAULT 1,
  `perset` int(11) NOT NULL DEFAULT 1,
  `calories` float NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `days`
--
ALTER TABLE `days`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exercise`
--
ALTER TABLE `exercise`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `program_categories`
--
ALTER TABLE `program_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_links`
--
ALTER TABLE `social_links`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_links_category`
--
ALTER TABLE `social_links_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `time`
--
ALTER TABLE `time`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trainer`
--
ALTER TABLE `trainer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trainer_programs`
--
ALTER TABLE `trainer_programs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_calories`
--
ALTER TABLE `user_calories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_exercise`
--
ALTER TABLE `user_exercise`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coupon`
--
ALTER TABLE `coupon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `days`
--
ALTER TABLE `days`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `exercise`
--
ALTER TABLE `exercise`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `program_categories`
--
ALTER TABLE `program_categories`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `social_links`
--
ALTER TABLE `social_links`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `social_links_category`
--
ALTER TABLE `social_links_category`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscription`
--
ALTER TABLE `subscription`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `time`
--
ALTER TABLE `time`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trainer`
--
ALTER TABLE `trainer`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trainer_programs`
--
ALTER TABLE `trainer_programs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_calories`
--
ALTER TABLE `user_calories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_exercise`
--
ALTER TABLE `user_exercise`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
