import { writable } from "svelte/store";


const SetupBoardStore = () => {
    const initialState: string[][] = [
        ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
        ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
        ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
    ]

    const { subscribe, set, update } = writable(initialState)

    return {
        subscribe, set, update
    }

}

const BoardStore = SetupBoardStore()

export { BoardStore }