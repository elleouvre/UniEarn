package com.csit321g6.TSK.UniEarn.repository;

import com.csit321g6.TSK.UniEarn.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByUserId(Long userId);
}
