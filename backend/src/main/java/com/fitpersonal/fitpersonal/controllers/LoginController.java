package com.fitpersonal.fitpersonal.controllers;

import com.fitpersonal.fitpersonal.entities.dtos.LoginRequestDTO;
import com.fitpersonal.fitpersonal.entities.dtos.LoginResponseDTO;
import com.fitpersonal.fitpersonal.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/login")
public class LoginController {
    @Autowired
    private LoginService loginService;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        try {

            LoginResponseDTO responseDTO = loginService.login(loginRequestDTO);


            return ResponseEntity.ok(responseDTO);

        } catch (RuntimeException e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
