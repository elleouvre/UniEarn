package com.csit321section.groupname.projectname.service;

import com.csit321section.groupname.projectname.dto.*;
import com.csit321section.groupname.projectname.model.*;
import com.csit321section.groupname.projectname.repository.*;
import com.csit321section.groupname.projectname.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final EmployerRepository employerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       StudentRepository studentRepository,
                       EmployerRepository employerRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.employerRepository = employerRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        String email = req.email().trim().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "That email is already registered");
        }

        if (req.role() == Role.STUDENT) {
            if (isBlank(req.school()) || isBlank(req.course())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "School and course are required for students");
            }
        } else if (isBlank(req.companyName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Company name is required for employers");
        }

        User user = new User();
        user.setName(req.name().trim());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(req.password()));
        user.setRole(req.role());
        userRepository.save(user);

        if (req.role() == Role.STUDENT) {
            Student s = new Student();
            s.setUser(user);
            s.setSchool(req.school().trim());
            s.setCourse(req.course().trim());
            studentRepository.save(s);
        } else {
            Employer e = new Employer();
            e.setUser(user);
            e.setCompanyName(req.companyName().trim());
            e.setAddress(isBlank(req.address()) ? null : req.address().trim());
            e.setVerified(false);
            employerRepository.save(e);
        }

        return new AuthResponse(jwtService.generateToken(user.getEmail(), user.getRole().name()), toResponse(user));
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.email().trim().toLowerCase())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));
        if (!passwordEncoder.matches(req.password(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }
        return new AuthResponse(jwtService.generateToken(user.getEmail(), user.getRole().name()), toResponse(user));
    }

    @Transactional(readOnly = true)
    public UserResponse currentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Account no longer exists"));
        return toResponse(user);
    }

    private UserResponse toResponse(User u) {
        if (u.getRole() == Role.STUDENT) {
            Student s = studentRepository.findByUserId(u.getId()).orElse(null);
            return new UserResponse(u.getId(), u.getName(), u.getEmail(), u.getRole(),
                    s != null ? s.getSchool() : null, s != null ? s.getCourse() : null, null, null, null);
        }
        Employer e = employerRepository.findByUserId(u.getId()).orElse(null);
        return new UserResponse(u.getId(), u.getName(), u.getEmail(), u.getRole(), null, null,
                e != null ? e.getCompanyName() : null, e != null ? e.getAddress() : null,
                e != null ? e.isVerified() : null);
    }

    private boolean isBlank(String s) {
        return s == null || s.isBlank();
    }
}
