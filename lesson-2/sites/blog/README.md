CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(35) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `post` varchar(1000) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `time_stamp` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8 DEFAULT 'NULL',
  `age` tinyint(4) NOT NULL DEFAULT '0',
  `email` varchar(20) DEFAULT 'NULL',
  `password` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1
