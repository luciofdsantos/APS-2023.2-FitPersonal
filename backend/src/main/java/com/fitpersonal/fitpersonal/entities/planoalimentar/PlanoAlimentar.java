package com.fitpersonal.fitpersonal.entities.planoalimentar;

import com.fitpersonal.fitpersonal.entities.refeicao.Refeicao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    private Float totalConsumoCarboidrato;
    private Float totalConsumoProteina;
    private Float totalConsumoGordura;

    @OneToMany(mappedBy = "planoAlimentar", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Refeicao> refeicoes;

    public PlanoAlimentar(PlanoAlimentarRequestDTO dto) {
        this.totalConsumoCarboidrato = dto.totalConsumoCarboidrato();
        this.totalConsumoProteina = dto.totalConsumoProteina();
        this.totalConsumoGordura = dto.totalConsumoGordura();
        this.refeicoes = dto.refeicoes();
    }


    public void addRefeicao(Refeicao refeicao) {
        this.refeicoes.add(refeicao);
        refeicao.setPlanoAlimentar(this);
    }

    public void removeRefeicao(Refeicao refeicao) {
        this.refeicoes.remove(refeicao);
        refeicao.setPlanoAlimentar(null);
    }
}
