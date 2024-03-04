CREATE DATABASE nodecomplete;
SHOW GRANTS FOR 'root'@'localhost';
GRANT ALL PRIVILEGES ON nodecomplete.* TO 'root'@'localhost' IDENTIFIED BY 'das@55555' WITH GRANT OPTION;
FLUSH PRIVILEGES;


