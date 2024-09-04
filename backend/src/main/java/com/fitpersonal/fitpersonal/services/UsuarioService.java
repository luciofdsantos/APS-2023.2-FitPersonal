package com.fitpersonal.fitpersonal.services;

import com.fitpersonal.fitpersonal.entities.aluno.Aluno;
import com.fitpersonal.fitpersonal.entities.dtos.UsuarioPerfilDTO;
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
        if (usuarioRepository.findByEmail(usuarioRequestDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email já está em uso.");
        }

        Usuario usuario;
        TipoUsuario tipoUsuario;
        Sexo sexo;

        if (usuarioRequestDTO.getTipoUsuario() != null) {
            tipoUsuario = TipoUsuario.valueOf(usuarioRequestDTO.getTipoUsuario());
        } else {
            throw new IllegalArgumentException("Tipo de usuário não pode ser nulo.");
        }

        if (usuarioRequestDTO.getSexo() != null) {
            sexo = Sexo.valueOf(usuarioRequestDTO.getSexo());
        } else {
            throw new IllegalArgumentException("Sexo não pode ser nulo.");
        }

        switch (usuarioRequestDTO.getTipoUsuario()){
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
        usuario.setSenha(usuarioRequestDTO.getSenha());
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

//    public Usuario updateUsuario(Long id, UsuarioRequestDTO usuarioRequestDTO) {
//        Optional<Usuario> optionalUsuario = findUsuarioById(id);
//
//        if (optionalUsuario.isPresent()) {
//            Usuario usuario = optionalUsuario.get();
//            TipoUsuario tipoUsuario = TipoUsuario.valueOf(usuarioRequestDTO.getTipoUsuario());
//            Sexo sexo = Sexo.valueOf(usuarioRequestDTO.getSexo());
//
//            usuario.setNome(usuarioRequestDTO.getNome());
//            usuario.setSobrenome(usuarioRequestDTO.getSobrenome());
//            usuario.setEmail(usuarioRequestDTO.getEmail());
//            usuario.setSenha(usuarioRequestDTO.getSenha()); // Considere fazer o hash da senha
//            usuario.setTipoUsuario(tipoUsuario);
//            usuario.setSexo(sexo);
//
//            if (usuario instanceof Personal) {
//                ((Personal) usuario).setRegistroProfissional(usuarioRequestDTO.getRegistroProfissional());
//            } else if (usuario instanceof Nutricionista) {
//                ((Nutricionista) usuario).setRegistroProfissional(usuarioRequestDTO.getRegistroProfissional());
//            }
//
//            return usuarioRepository.save(usuario);
//        }
//
//        return null;
//    }
public Usuario updateUsuarioPerfil(Long id, UsuarioPerfilDTO usuarioPerfilDTO) {
    try {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));


        usuario.setNome(usuarioPerfilDTO.getNome());
        usuario.setEmail(usuarioPerfilDTO.getEmail());
        usuario.setSenha(usuarioPerfilDTO.getSenha());


        if (usuario instanceof Aluno) {
            Aluno aluno = (Aluno) usuario;
            aluno.setAltura(usuarioPerfilDTO.getAltura());
            aluno.setPeso(usuarioPerfilDTO.getPeso());
            aluno.setDataNascimento(usuarioPerfilDTO.getDataNascimento());
            aluno.setSexo(Sexo.valueOf(usuarioPerfilDTO.getSexo()));
            aluno.setObjetivoDeSaude(usuarioPerfilDTO.getObjetivoDeSaude());
        }

        return usuarioRepository.save(usuario);
    } catch (Exception e) {
        throw new RuntimeException("Erro ao atualizar o perfil: " + e.getMessage());
    }
}

    public boolean deleteUsuarioById(Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
