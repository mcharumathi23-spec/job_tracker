package com.jobtrack.dto;

/**
 * Authentication response payload containing JWT token and basic user info.
 */
public class AuthResponse {

    private String token;
    private String type = "Bearer";
    private Long id;
    private String name;
    private String email;

    public AuthResponse() {
    }

    public AuthResponse(String token, Long id, String name, String email) {
        this.token = token;
        this.type = "Bearer";
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
