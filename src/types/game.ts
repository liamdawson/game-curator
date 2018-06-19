export default interface IGame {
  id: number,
  title: string,
  aka?: string[],
  abstract: string,
  time: string
  players: IPlayers,
  difficulty: IDifficulty,
  description: string,
  descriptionHtml: string
};

export interface IPlayers {
  ideal: {
    min: number,
    max: number
  },
  possible: {
    min: number,
    max: number
  }
}

export interface IDifficulty {
  strategy: number,
  rules: number
}