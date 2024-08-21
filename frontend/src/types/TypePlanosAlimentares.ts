export namespace TypePlanosAlimentares {
  export type Refeicao = {
    id?: number;
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
    nome?: string;
    metaConsumoKcal: number;
    totalConsumoKcal: number;
    metaConsumoCarboidrato: number;
    totalConsumoCarboidrato: number;
    metaConsumoProteina: number;
    totalConsumoProteina: number;
    metaConsumoGordura: number;
    totalConsumoGordura: number;
    refeicoes: Refeicao[];
  };

  export type SelectOptionType = {
    id?: string | number;
    alimento: string;
    quantidade: number;
    kcal: number;
    carboidrato: number;
    proteina: number;
    gordura: number;
    tipoRefeicao: string;
  };
}
