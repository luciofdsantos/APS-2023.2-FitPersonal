package com.fitpersonal.fitpersonal.services;

import com.fitpersonal.fitpersonal.entities.aluno.Aluno;
import com.fitpersonal.fitpersonal.entities.dtos.AlunoResponseDTO;
import com.fitpersonal.fitpersonal.entities.dtos.ExercicioProgressoDTO;
import com.fitpersonal.fitpersonal.entities.dtos.ProgressoTreinoDTO;
import com.fitpersonal.fitpersonal.entities.exercicio.Exercicio;
import com.fitpersonal.fitpersonal.entities.exercicioprogresso.ExercicioProgresso;
import com.fitpersonal.fitpersonal.entities.progressotreino.ProgressoTreino;
import com.fitpersonal.fitpersonal.entities.treino.Treino;
import com.fitpersonal.fitpersonal.entities.usuario.Usuario;
import com.fitpersonal.fitpersonal.repositories.AlunoRepository;
import com.fitpersonal.fitpersonal.repositories.ProgressoRepository;
import com.fitpersonal.fitpersonal.repositories.TreinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Service
public class ProgressoService {

    @Autowired
    private ProgressoRepository progressoRepository;

    @Autowired
    private TreinoRepository treinoRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    public void registrarProgresso(ProgressoTreinoDTO progressoTreinoDTO) {
        try {
            ProgressoTreino progresso = new ProgressoTreino();

            // Recuperar o treino e o aluno a partir dos IDs no DTO
            Treino treino = treinoRepository.findById(progressoTreinoDTO.getTreinoId())
                    .orElseThrow(() -> new IllegalArgumentException("Treino não encontrado."));
            Aluno aluno = alunoRepository.findById(progressoTreinoDTO.getAlunoId())
                    .orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado."));

            // Setar treino, aluno e data de finalização
            progresso.setTreino(treino);
            progresso.setAluno(aluno);
            progresso.setDataFinalizacao(LocalDate.now());  // Definir a data de finalização como a data atual

            // Setar o progresso dos exercícios
            List<ExercicioProgresso> exerciciosProgresso = new ArrayList<>();
            for (ExercicioProgressoDTO exercicioDTO : progressoTreinoDTO.getExercicios()) {
                ExercicioProgresso exercicioProgresso = new ExercicioProgresso();

                Exercicio exercicio = new Exercicio();  // Supondo que a classe Exercicio já exista
                exercicio.setId(exercicioDTO.getExercicioId());  // Definir o ID do exercício

                // Setar o progresso do exercício (feito ou não feito)
                exercicioProgresso.setExercicio(exercicio);
                exercicioProgresso.setFeito(exercicioDTO.getFeito());
                exerciciosProgresso.add(exercicioProgresso);
            }

            progresso.setExercicios(exerciciosProgresso);

            // Salvar o progresso
            progressoRepository.save(progresso);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Erro ao registrar o progresso: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Ocorreu um erro ao registrar o progresso.");
        }
    }

    public List<ProgressoTreinoDTO> getHistoricoPorAluno(Long alunoId) {
        try {
            // Buscar o histórico de progresso do aluno
            List<ProgressoTreino> progressos = progressoRepository.findByAlunoId(alunoId);
            List<ProgressoTreinoDTO> progressoDTOs = new ArrayList<>();

            // Converter cada ProgressoTreino em ProgressoTreinoDTO
            for (ProgressoTreino progresso : progressos) {
                ProgressoTreinoDTO progressoDTO = new ProgressoTreinoDTO();
                progressoDTO.setTreinoId(progresso.getTreino().getId());
                progressoDTO.setDataFinalizacao(progresso.getDataFinalizacao());

                // Converter cada exercício em ExercicioProgressoDTO
                List<ExercicioProgressoDTO> exerciciosProgressoDTO = new ArrayList<>();
                for (ExercicioProgresso exercicioProgresso : progresso.getExercicios()) {
                    ExercicioProgressoDTO exercicioDTO = new ExercicioProgressoDTO();
                    exercicioDTO.setExercicioId(exercicioProgresso.getExercicio().getId());
                    exercicioDTO.setFeito(exercicioProgresso.getFeito());
                    exerciciosProgressoDTO.add(exercicioDTO);
                }
                progressoDTO.setExercicios(exerciciosProgressoDTO);

                progressoDTOs.add(progressoDTO);
            }
            return progressoDTOs;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar o histórico do aluno: " + e.getMessage());
        }
    }
}
