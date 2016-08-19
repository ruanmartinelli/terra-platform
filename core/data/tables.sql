CREATE TABLE `sensor` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(22) NOT NULL,
  `vendor` varchar(55) NOT NULL,
  `model` varchar(55) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=562 DEFAULT CHARSET=utf8;

CREATE TABLE `message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_sensor` bigint(20) NOT NULL,
  `number` bigint(20) NOT NULL,
  `target` varchar(22) NOT NULL,
  `content` varchar(100) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_sensor_message` (`id_sensor`),
  CONSTRAINT `fk_sensor_message` FOREIGN KEY (`id_sensor`) REFERENCES `sensor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=562 DEFAULT CHARSET=utf8;

-- Fake data
INSERT INTO `terra-db`.`sensor` (`code`, `vendor`, `model`) VALUES ('1', 'SUN', 'Sun SPOT');
INSERT INTO `terra-db`.`message` (`id_sensor`, `number`, `target`, `content`) VALUES ('562', '11', '62324', 'H3LL0 W0RLD');
