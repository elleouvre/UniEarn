-- UniEarn Increment 1 - authentication tables
-- OPTIONAL: the backend creates these automatically (spring.jpa.hibernate.ddl-auto=update).
-- Run this only if you want to create the database by hand, or to show the schema to your teacher.

CREATE DATABASE IF NOT EXISTS uniearn_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE uniearn_db;

CREATE TABLE IF NOT EXISTS users (
  id        BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(100) NOT NULL,
  email     VARCHAR(150) NOT NULL UNIQUE,
  password  VARCHAR(255) NOT NULL,              -- BCrypt hash
  role      VARCHAR(20)  NOT NULL               -- STUDENT or EMPLOYER
);

CREATE TABLE IF NOT EXISTS students (
  student_id BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id    BIGINT       NOT NULL UNIQUE,
  school     VARCHAR(150),
  course     VARCHAR(150),
  CONSTRAINT fk_students_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS employers (
  employer_id  BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id      BIGINT       NOT NULL UNIQUE,
  company_name VARCHAR(150) NOT NULL,
  address      VARCHAR(255),
  is_verified  BOOLEAN      NOT NULL DEFAULT FALSE,
  CONSTRAINT fk_employers_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Later increments add: class_schedule, job, application, saved_job, rating, badge, experience (see ERD).
