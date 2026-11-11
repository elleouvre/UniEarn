package com.csit321g6.TSK.UniEarn.dto;

import com.csit321g6.TSK.UniEarn.model.Role;

/** Safe view of a user (no password). Student/employer fields are null when they don't apply. */
public record UserResponse(
        Long id,
        String name,
        String email,
        Role role,
        String school,
        String course,
        String companyName,
        String address,
        Boolean verified
) {}
