package com.fitpersonal.fitpersonal.entities.refeicao;

import com.fitpersonal.fitpersonal.entities.dtos.RefeicaoRequestDTO;
import com.fitpersonal.fitpersonal.entities.planoalimentar.PlanoAlimentar;
import com.fitpersonal.fitpersonal.enums.TipoRefeicao;
import jakarta.persistence.*;
import lombok.*;

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

    @Column(nullable = false)
    private String alimento;
    @Column(nullable = false)
    private Float quantidade;
    @Column(nullable = false)
    private Float kcal;
    @Column(nullable = false)
    private Float carboidrato;
    @Column(nullable = false)
    private Float proteina;
    @Column(nullable = false)
    private Float gordura;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
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
