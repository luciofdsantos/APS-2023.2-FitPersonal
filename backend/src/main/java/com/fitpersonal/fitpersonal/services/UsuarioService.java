package com.fitpersonal.fitpersonal.services;

import com.fitpersonal.fitpersonal.entities.aluno.Aluno;
import com.fitpersonal.fitpersonal.entities.dtos.UsuarioRequestDTO;
import com.fitpersonal.fitpersonal.entities.dtos.UsuarioResponseDTO;
import com.fitpersonal.fitpersonal.entities.nutricionista.Nutricionista;
import com.fitpersonal.fitpersonal.entities.personal.Personal;
import com.fitpersonal.fitpersonal.entities.usuario.Usuario;
import com.fitpersonal.fitpersonal.enums.Sexo;
import com.fitpersonal.fitpersonal.enums.TipoUsuario;
import com.fitpersonal.fitpersonal.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario createUsuario(UsuarioRequestDTO usuarioRequestDTO){
        Usuario usuario;
        TipoUsuario tipoUsuario = TipoUsuario.valueOf(usuarioRequestDTO.getTipoUsuario().toUpperCase());
        Sexo sexo = Sexo.valueOf(usuarioRequestDTO.getSexo().toUpperCase());

        switch (usuarioRequestDTO.getTipoUsuario().toUpperCase()){
            case "ALUNO":
                usuario = new Aluno();
                break;
            case "PERSONAL":
                usuario = new Personal();
                ((Personal) usuario).setRegistroProfissional(usuarioRequestDTO.getRegistroProfissional());
                break;
            case "NUTRICIONISTA":
                usuario = new Nutricionista();
                ((Nutricionista) usuario).setRegistroProfissional((usuarioRequestDTO.getRegistroProfissional()));
                break;
            default:
                throw new IllegalArgumentException("Tipo de usuário inválido");
        }

        usuario.setNome(usuarioRequestDTO.getNome());
        usuario.setSobrenome(usuarioRequestDTO.getSobrenome());
        usuario.setEmail(usuarioRequestDTO.getEmail());
        usuario.setSenha(usuarioRequestDTO.getSenha()); // Considere fazer o hash da senha
        usuario.setTipoUsuario(tipoUsuario);
        usuario.setSexo(sexo);

        return usuarioRepository.save(usuario);
    }

    public List<Usuario> findAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> findUsuarioById(Long id){
        return usuarioRepository.findById(id);
    }

    public Usuario updateUsuario(Long id, UsuarioRequestDTO usuarioRequestDTO) {
        Optional<Usuario> optionalUsuario = findUsuarioById(id);

        if (optionalUsuario.isPresent()) {
            Usuario usuario = optionalUsuario.get();
            TipoUsuario tipoUsuario = TipoUsuario.valueOf(usuarioRequestDTO.getTipoUsuario().toUpperCase());
            Sexo sexo = Sexo.valueOf(usuarioRequestDTO.getSexo().toUpperCase());

            usuario.setNome(usuarioRequestDTO.getNome());
            usuario.setSobrenome(usuarioRequestDTO.getSobrenome());
            usuario.setEmail(usuarioRequestDTO.getEmail());
            usuario.setSenha(usuarioRequestDTO.getSenha()); // Considere fazer o hash da senha
            usuario.setTipoUsuario(tipoUsuario);
            usuario.setSexo(sexo);

            if (usuario instanceof Personal) {
                ((Personal) usuario).setRegistroProfissional(usuarioRequestDTO.getRegistroProfissional());
            } else if (usuario instanceof Nutricionista) {
                ((Nutricionista) usuario).setRegistroProfissional(usuarioRequestDTO.getRegistroProfissional());
            }

            return usuarioRepository.save(usuario);
        }

        return null;
    }

    public boolean deleteUsuarioById(Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
