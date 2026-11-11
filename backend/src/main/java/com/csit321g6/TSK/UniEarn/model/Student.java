package com.csit321g6.TSK.UniEarn.model;

import jakarta.persistence.*;

/** ERD entity STUDENT (is-a USER). */
@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long studentId;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(length = 150)
    private String school;

    @Column(length = 150)
    private String course;

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getSchool() { return school; }
    public void setSchool(String school) { this.school = school; }
    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }
}
