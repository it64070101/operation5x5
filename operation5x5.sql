-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: operation5x5
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `match_table`
--

DROP TABLE IF EXISTS `match_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match_table` (
  `match_id` int NOT NULL,
  `user1_id` int NOT NULL,
  `user2_id` int NOT NULL,
  `startTimeStamp` datetime NOT NULL,
  `endTimeStamp` datetime NOT NULL,
  `result_win` int DEFAULT NULL,
  `result_lose` int DEFAULT NULL,
  PRIMARY KEY (`match_id`),
  KEY `user1_id_idx` (`user1_id`),
  KEY `user2_id_idx` (`user2_id`),
  KEY `result_win_idx` (`result_lose`),
  CONSTRAINT `result_lose` FOREIGN KEY (`result_lose`) REFERENCES `user_table` (`user_id`),
  CONSTRAINT `result_win` FOREIGN KEY (`result_lose`) REFERENCES `user_table` (`user_id`),
  CONSTRAINT `user1_id` FOREIGN KEY (`user1_id`) REFERENCES `user_table` (`user_id`),
  CONSTRAINT `user2_id` FOREIGN KEY (`user2_id`) REFERENCES `user_table` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_table`
--

LOCK TABLES `match_table` WRITE;
/*!40000 ALTER TABLE `match_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `match_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `share_table`
--

DROP TABLE IF EXISTS `share_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `share_table` (
  `Shere_id` int NOT NULL,
  `platform_share` varchar(100) DEFAULT NULL,
  `user_shere_id` int NOT NULL,
  PRIMARY KEY (`Shere_id`),
  KEY `user_id_idx` (`user_shere_id`),
  KEY `user_shere_id_idx` (`user_shere_id`),
  CONSTRAINT `user_shere_id` FOREIGN KEY (`user_shere_id`) REFERENCES `user_table` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share_table`
--

LOCK TABLES `share_table` WRITE;
/*!40000 ALTER TABLE `share_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `share_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutorial_table`
--

DROP TABLE IF EXISTS `tutorial_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutorial_table` (
  `Tutorial_id` int NOT NULL,
  `user_id` int NOT NULL,
  `startReadTimeStamp` datetime NOT NULL,
  `endReadTimeStamp` datetime NOT NULL,
  PRIMARY KEY (`Tutorial_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutorial_table`
--

LOCK TABLES `tutorial_table` WRITE;
/*!40000 ALTER TABLE `tutorial_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `tutorial_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_google_register_table`
--

DROP TABLE IF EXISTS `user_google_register_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_google_register_table` (
  `user_google_register_id` int NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`user_google_register_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_google_register_table`
--

LOCK TABLES `user_google_register_table` WRITE;
/*!40000 ALTER TABLE `user_google_register_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_google_register_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_register_table`
--

DROP TABLE IF EXISTS `user_register_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_register_table` (
  `user_register_id` int NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`user_register_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_register_table`
--

LOCK TABLES `user_register_table` WRITE;
/*!40000 ALTER TABLE `user_register_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_register_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_table`
--

DROP TABLE IF EXISTS `user_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_table` (
  `user_id` int NOT NULL,
  `user_google_register_id` int DEFAULT NULL,
  `user_register_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_google_register_id_idx` (`user_google_register_id`),
  KEY `user_register_id_idx` (`user_register_id`),
  CONSTRAINT `user_google_register_id` FOREIGN KEY (`user_google_register_id`) REFERENCES `user_google_register_table` (`user_google_register_id`),
  CONSTRAINT `user_register_id` FOREIGN KEY (`user_register_id`) REFERENCES `user_register_table` (`user_register_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_table`
--

LOCK TABLES `user_table` WRITE;
/*!40000 ALTER TABLE `user_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-12 19:09:26
