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
}
