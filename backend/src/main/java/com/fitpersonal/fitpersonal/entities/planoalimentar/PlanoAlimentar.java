package com.fitpersonal.fitpersonal.entities.planoalimentar;

import com.fitpersonal.fitpersonal.entities.refeicao.Refeicao;
import com.fitpersonal.fitpersonal.entities.refeicao.RefeicaoRequestDTO;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "planoalimentar")
@Table(name = "planoalimentar")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlanoAlimentar {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Float totalConsumoKcal;
    private Float totalConsumoCarboidrato;
    private Float totalConsumoProteina;
    private Float totalConsumoGordura;
    private Float metaConsumoKcal;
    private Float metaConsumoCarboidrato;
    private Float metaConsumoProteina;
    private Float metaConsumoGordura;

    @OneToMany(mappedBy = "planoAlimentar", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Refeicao> refeicoes = new ArrayList<>();

    public PlanoAlimentar(PlanoAlimentarRequestDTO dto) {
        //Usuário não define totais, banco de dados que atualiza a partir de refeições
        //this.totalConsumoKcal = dto.totalConsumoKcal();
        //this.totalConsumoCarboidrato = dto.totalConsumoCarboidrato();
        //this.totalConsumoProteina = dto.totalConsumoProteina();
        //this.totalConsumoGordura = dto.totalConsumoGordura();
        this.metaConsumoKcal = dto.metaConsumoKcal();
        this.metaConsumoCarboidrato = dto.metaConsumoCarboidrato();
        this.metaConsumoProteina = dto.metaConsumoProteina();
        this.metaConsumoGordura = dto.metaConsumoGordura();

        this.refeicoes = new ArrayList<>();
        if (dto.refeicoes() != null) {
            for (RefeicaoRequestDTO refeicaoDTO : dto.refeicoes()) {
                this.refeicoes.add(new Refeicao(refeicaoDTO, this));
            }
        }
        updateTotais();
    }


    public void addRefeicao(Refeicao refeicao) {
        this.refeicoes.add(refeicao);
        refeicao.setPlanoAlimentar(this);
        updateTotais();
    }

    public void removeRefeicao(Refeicao refeicao) {
        this.refeicoes.remove(refeicao);
        refeicao.setPlanoAlimentar(null);
        updateTotais();
    }

    public void updateTotais() {
        this.totalConsumoKcal = (float) refeicoes.stream()
                .mapToDouble(Refeicao::getKcal)
                .sum();

        this.totalConsumoCarboidrato = (float) refeicoes.stream()
                .mapToDouble(Refeicao::getCarboidrato)
                .sum();

        this.totalConsumoProteina = (float) refeicoes.stream()
                .mapToDouble(Refeicao::getProteina)
                .sum();

        this.totalConsumoGordura = (float) refeicoes.stream()
                .mapToDouble(Refeicao::getGordura)
                .sum();
    }

}
