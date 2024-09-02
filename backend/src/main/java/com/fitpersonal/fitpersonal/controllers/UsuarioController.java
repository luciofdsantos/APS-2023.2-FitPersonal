package com.fitpersonal.fitpersonal.controllers;

import com.fitpersonal.fitpersonal.entities.dtos.UsuarioPerfilDTO;
import com.fitpersonal.fitpersonal.entities.dtos.UsuarioRequestDTO;
import com.fitpersonal.fitpersonal.entities.dtos.UsuarioResponseDTO;
import com.fitpersonal.fitpersonal.entities.nutricionista.Nutricionista;
import com.fitpersonal.fitpersonal.entities.personal.Personal;
import com.fitpersonal.fitpersonal.entities.usuario.Usuario;
import com.fitpersonal.fitpersonal.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> createUsuario(@RequestBody UsuarioRequestDTO usuarioRequestDTO) {
        Usuario usuario = usuarioService.createUsuario(usuarioRequestDTO);
        UsuarioResponseDTO responseDTO = convertToResponseDTO(usuario);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> getAllUsuarios() {
        List<Usuario> usuarios = usuarioService.findAllUsuarios();
        List<UsuarioResponseDTO> responseDTOs = usuarios.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> getUsuarioById(@PathVariable Long id){
        Optional<Usuario> usuarioOpt = usuarioService.findUsuarioById(id);

        if (usuarioOpt.isPresent()) {
            UsuarioResponseDTO responseDTO = convertToResponseDTO(usuarioOpt.get());
            return ResponseEntity.ok(responseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<UsuarioResponseDTO> updateUsuario(@PathVariable Long id, @RequestBody UsuarioRequestDTO usuarioRequestDTO) {
//        Usuario usuario = usuarioService.updateUsuario(id, usuarioRequestDTO);
//        if (usuario != null) {
//            UsuarioResponseDTO responseDTO = convertToResponseDTO(usuario);
//            return ResponseEntity.ok(responseDTO);
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//    }
        @PutMapping("/{id}")
        public ResponseEntity<Usuario> editarPerfil(@PathVariable Long id, @RequestBody UsuarioPerfilDTO usuarioPerfilDTO) {
            Usuario usuarioAtualizado = usuarioService.updateUsuarioPerfil(id, usuarioPerfilDTO);
            return ResponseEntity.ok(usuarioAtualizado);
}

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        if (usuarioService.deleteUsuarioById(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    private UsuarioResponseDTO convertToResponseDTO(Usuario usuario) {
        UsuarioResponseDTO responseDTO = new UsuarioResponseDTO();
        responseDTO.setId(usuario.getId());
        responseDTO.setNome(usuario.getNome());
        responseDTO.setSobrenome(usuario.getSobrenome());
        responseDTO.setEmail(usuario.getEmail());
        responseDTO.setTipoUsuario(usuario.getTipoUsuario().name());
        responseDTO.setSexo(usuario.getSexo().name());
        if (usuario instanceof Personal) {
            responseDTO.setRegistroProfissional(((Personal) usuario).getRegistroProfissional());
        } else if (usuario instanceof Nutricionista) {
            responseDTO.setRegistroProfissional(((Nutricionista) usuario).getRegistroProfissional());
        }
        return responseDTO;
    }
}
