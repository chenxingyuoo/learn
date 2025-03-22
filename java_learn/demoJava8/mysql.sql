CREATE TABLE if not exists `carx` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `car_num` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `guide_price` decimal(10,0) DEFAULT NULL,
  `produce_time` char(11) DEFAULT NULL,
  `car_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE if not exists `cara` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `car_num` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `guide_price` decimal(10,0) DEFAULT NULL,
  `produce_time` char(11) DEFAULT NULL,
  `car_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;