export namespace TypeTreinos {
  export type Exercicio = {
    id: number;
    nome: string;
    inicio: string;
    fim: string;
    grupoMuscular: string;
    series: number;
    repeticoes: number;
    carga: number;
    finalizado: boolean;
  };

  export type Treino = {
    id: number;
    nome: string;
    descricao: string;
    exercicios: Exercicio[];
  };

  export type SelectOptionType = {
    id?: string | number;
    nome: string;
    carga: number;
    fim: string;
    finalizado: boolean;
    grupoMuscular: string;
    inicio: string;
    repeticoes: number;
    series: number;
  };
}
