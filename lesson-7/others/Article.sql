/*
 Navicat MySQL Data Transfer

 Source Server         : site
 Source Server Version : 50712
 Source Host           : localhost
 Source Database       : blog

 Target Server Version : 50712
 File Encoding         : utf-8

 Date: 06/14/2016 00:06:27 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `Article`
-- ----------------------------
DROP TABLE IF EXISTS `Article`;
CREATE TABLE `Article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `tags` text NOT NULL,
  `content` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `Article`
-- ----------------------------
BEGIN;
INSERT INTO `Article` VALUES ('1', 'wenzhang', '0,1,3', 'content013', '2016-04-23 08:19:05', '1');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
