// this is for types/interfaces that are referenced by multiple slices

export interface Player {
    name: string,
    backgroundColor: string,
}

export interface ScoreTransaction {
    type: "set" | "change",
    value: number,
}
