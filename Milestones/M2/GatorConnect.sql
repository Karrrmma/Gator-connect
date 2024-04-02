-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

DROP DATABASE IF EXISTS mydb;
CREATE DATABASE IF NOT EXISTS mydb;
USE mydb;

-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `user_id` INT UNSIGNED NOT NULL,
  `sfsu_email` VARCHAR(45) NOT NULL,
  `full_name` VARCHAR(45) GENERATED ALWAYS AS (CONCAT(first_name, ' ', last_name)) VIRTUAL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `sfsu_email_UNIQUE` (`sfsu_email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Account` (
  `account_id` INT UNSIGNED NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `created_time` DATETIME NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`account_id`, `user_id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Profile` (
  `profile_id` INT UNSIGNED NOT NULL,
  `biography` VARCHAR(100) NOT NULL,
  `avatar` BLOB NULL,
  `account_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`profile_id`, `account_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Student` (
  `user_id` INT UNSIGNED NOT NULL,
  `major` VARCHAR(45) NOT NULL,
  `minor` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Professor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Professor` (
  `user_id` INT UNSIGNED NOT NULL,
  `department` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Friend`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Friend` (
  `user_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Friend Request`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Friend Request` (
  `friend_request_id` INT UNSIGNED NOT NULL,
  `status` ENUM('pending', 'accepted', 'declined') NOT NULL,
  `requester_id` INT UNSIGNED NOT NULL,
  `receiver_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`friend_request_id`),
  INDEX `fk_Friend Request_User1_idx` (`requester_id` ASC) VISIBLE,
  INDEX `fk_Friend Request_User2_idx` (`receiver_id` ASC) VISIBLE,
  CONSTRAINT `fk_Friend Request_User1`
    FOREIGN KEY (`requester_id`)
    REFERENCES `mydb`.`User` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Friend Request_User2`
    FOREIGN KEY (`receiver_id`)
    REFERENCES `mydb`.`User` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Notification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Notification` (
  `notification_id` INT UNSIGNED NOT NULL,
  `timestamp` DATETIME NOT NULL,
  `friend_request_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`notification_id`, `friend_request_id`),
  INDEX `fk_Notification_Friend Request1_idx` (`friend_request_id` ASC) VISIBLE,
  CONSTRAINT `fk_Notification_Friend Request1`
    FOREIGN KEY (`friend_request_id`)
    REFERENCES `mydb`.`Friend Request` (`friend_request_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Resource`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Resource` (
  `resource_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`resource_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Food Vendor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Food Vendor` (
  `foodvendor_id` INT UNSIGNED NOT NULL,
  `rating` DECIMAL(2,1) NOT NULL,
  `review` VARCHAR(100) NULL,
  `resource_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`foodvendor_id`),
  INDEX `fk_Food Vendor_Resource1_idx` (`resource_id` ASC) VISIBLE,
  CONSTRAINT `fk_Food Vendor_Resource1`
    FOREIGN KEY (`resource_id`)
    REFERENCES `mydb`.`Resource` (`resource_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`UserAccessResouce`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`UserAccessResouce` (
  `resource_id` VARCHAR(45) NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  INDEX `fk_Resource_has_User_User1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_Resource_has_User_Resource1_idx` (`resource_id` ASC) VISIBLE,
  CONSTRAINT `fk_Resource_has_User_Resource1`
    FOREIGN KEY (`resource_id`)
    REFERENCES `mydb`.`Resource` (`resource_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Resource_has_User_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`User` (`user_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Transportation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Transportation` (
  `transportation_id` INT UNSIGNED NOT NULL,
  `transportation_type` VARCHAR(20) NOT NULL,
  `transportation_info` VARCHAR(45) NULL,
  `resource_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`transportation_id`),
  INDEX `fk_Transportation_Resource1_idx` (`resource_id` ASC) VISIBLE,
  CONSTRAINT `fk_Transportation_Resource1`
    FOREIGN KEY (`resource_id`)
    REFERENCES `mydb`.`Resource` (`resource_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Event` (
  `event_id` INT UNSIGNED NOT NULL,
  `event_description` VARCHAR(45) NOT NULL,
  `event_time` DATETIME NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  `resource_id` VARCHAR(45) NULL,
  PRIMARY KEY (`event_id`),
  INDEX `fk_Event_Resource1_idx` (`resource_id` ASC) VISIBLE,
  CONSTRAINT `fk_Event_Resource1`
    FOREIGN KEY (`resource_id`)
    REFERENCES `mydb`.`Resource` (`resource_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Post` (
  `post_id` INT UNSIGNED NOT NULL,
  `post_content` VARCHAR(45) NOT NULL,
  `post_time` DATETIME NOT NULL,
  `num_likes` VARCHAR(45) NOT NULL,
  `num_comments` VARCHAR(45) NOT NULL,
  `user_id` INT UNSIGNED NULL,
  PRIMARY KEY (`post_id`),
  INDEX `fk_Post_User1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_Post_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`User` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Like` (
  `like_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `post_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`like_id`),
  INDEX `fk_Like_User1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_Like_Post1_idx` (`post_id` ASC) VISIBLE,
  CONSTRAINT `fk_Like_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`User` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Like_Post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `mydb`.`Post` (`post_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Comment` (
  `comment_id` INT UNSIGNED NOT NULL,
  `comment_content` VARCHAR(45) NOT NULL,
  `comment_time` DATETIME NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `post_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`comment_id`),
  INDEX `fk_Comment_User1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_Comment_Post1_idx` (`post_id` ASC) VISIBLE,
  CONSTRAINT `fk_Comment_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`User` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Comment_Post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `mydb`.`Post` (`post_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Message` (
  `message_id` INT UNSIGNED NOT NULL,
  `message_time` DATETIME NOT NULL,
  `message_content` VARCHAR(255) NOT NULL,
  `message_type` TINYINT NOT NULL,
  `sender_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`message_id`),
  INDEX `fk_Message_User1_idx` (`sender_id` ASC) VISIBLE,
  CONSTRAINT `fk_Message_User1`
    FOREIGN KEY (`sender_id`)
    REFERENCES `mydb`.`User` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Private Message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Private Message` (
  `message_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`message_id`),
  CONSTRAINT `fk_Private Message_Message1`
    FOREIGN KEY (`message_id`)
    REFERENCES `mydb`.`Message` (`message_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Channel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Channel` (
  `channel_id` INT UNSIGNED NOT NULL,
  `channel_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`channel_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Public Message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Public Message` (
  `message_id` INT UNSIGNED NOT NULL,
  `channel_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`message_id`),
  INDEX `fk_Public Message_Channel1_idx` (`channel_id` ASC) VISIBLE,
  CONSTRAINT `fk_Public Message_Message1`
    FOREIGN KEY (`message_id`)
    REFERENCES `mydb`.`Message` (`message_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Public Message_Channel1`
    FOREIGN KEY (`channel_id`)
    REFERENCES `mydb`.`Channel` (`channel_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`StudentPlanEvent`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`StudentPlanEvent` (
  `user_id` INT UNSIGNED NOT NULL,
  `event_id` INT UNSIGNED NOT NULL,
  INDEX `fk_Student_has_Event_Event1_idx` (`event_id` ASC) VISIBLE,
  INDEX `fk_Student_has_Event_Student1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_Student_has_Event_Student1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`Student` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Student_has_Event_Event1`
    FOREIGN KEY (`event_id`)
    REFERENCES `mydb`.`Event` (`event_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
