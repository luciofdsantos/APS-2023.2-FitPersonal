package com.fitpersonal.fitpersonal.entities.refeicao;

import com.fitpersonal.fitpersonal.entities.planoalimentar.PlanoAlimentar;
import com.fitpersonal.fitpersonal.enums.TipoRefeicao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

@Entity(name = "refeicao")
@Table(name = "refeicao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Refeicao {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String alimento;
    private Float quantidade;
    private Float kcal;
    private Float carboidrato;
    private Float proteina;
    private Float gordura;

    @Enumerated(EnumType.STRING)
    private TipoRefeicao tipoRefeicao;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "planoalimentar_id")
    private PlanoAlimentar planoAlimentar;

    public Refeicao(RefeicaoRequestDTO dto, PlanoAlimentar planoAlimentar) {
        this.alimento = dto.alimento();
        this.quantidade = dto.quantidade();
        this.kcal = dto.kcal();
        this.carboidrato = dto.carboidrato();
        this.proteina = dto.proteina();
        this.gordura = dto.gordura();
        this.tipoRefeicao = dto.tipoRefeicao();
        this.planoAlimentar = planoAlimentar;
    }
}
