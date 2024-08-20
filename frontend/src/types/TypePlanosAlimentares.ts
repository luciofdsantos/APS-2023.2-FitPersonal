export namespace TypePlanosAlimentares {
  export type Refeicao = {
    alimento: string;
    quantidade: number;
    kcal: number;
    carboidrato: number;
    proteina: number;
    gordura: number;
    tipoRefeicao: string;
  };

  export type PlanoAlimentar = {
    id: number;
    nome: string;
    totalConsumoKcal: number;
    totalConsumoCarboidrato: number;
    totalConsumoProteina: number;
    totalConsumoGordura: number;
    refeicoes: Refeicao[];
  };
}
