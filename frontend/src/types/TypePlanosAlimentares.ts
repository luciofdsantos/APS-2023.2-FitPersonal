export namespace TypePlanosAlimentares {
  export type Refeicao = {
    alimento: string;
    quantidade: number;
    kcal: number;
    tipoRefeicao: string;
  };

  export type PlanoAlimentar = {
    id: number;
    nome: string;
    totalConsumoCarboidrato: number;
    totalConsumoProteina: number;
    totalConsumoGordura: number;
    refeicoes: Refeicao[];
  };
}
