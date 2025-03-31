<script lang="ts">
	import { BoardStore } from '$lib/stores/board.store';

	interface IPiece {
		row: number;
		col: number;
	}

	$: board = $BoardStore;

	let selected: IPiece | null = null;

	const selectPiece = (row: number, col: number) => {
		BoardStore.update((b: string[][]) => {
			if (selected && (selected as IPiece).row && (selected as IPiece).col) {
				if (
					b[row][col] === '' ||
					isOpponent(b[row][col], b[(selected as IPiece).row][(selected as IPiece).col])
				) {
					b[row][col] = b[(selected as IPiece).row][(selected as IPiece).col];
					b[(selected as IPiece).row][(selected as IPiece).col] = '';
				}
				selected = null;
			} else if (b[row][col] !== '') {
				selected = { row, col };
			}

			return b;
		});
	};

	const isOpponent = (piece: string, selectedPiece: string) => {
		const isWhite = (p: string) => '♜♞♝♛♚♟'.includes(p);
		const isBlack = (p: string) => '♖♘♗♕♔♙'.includes(p);
		return (isWhite(piece) && isBlack(selectedPiece)) || (isBlack(piece) && isWhite(selectedPiece));
	};
</script>

<div class="flex h-screen w-full items-center justify-center">
	<div class="board">
		{#each board as row, r}
			{#each row as piece, c}
				<div
					class="flex h-[80px] w-[80px] cursor-pointer items-center justify-center text-[32px] transition-colors duration-300 {(r +
						c) %
						2 ===
					0
						? 'light'
						: 'dark'}
						{selected && selected.row === r && selected.col === c ? 'selected' : ''}
						"
					on:click={() => selectPiece(r, c)}
					on:keydown
					role="button"
					tabindex="0"
				>
					{piece}
				</div>
			{/each}
		{/each}
	</div>
</div>

<style>
	.board {
		display: grid;
		grid-template-columns: repeat(8, 80px);
		grid-template-rows: repeat(8 80px);
		width: 644px;
		border: 2px solid black;
	}

	.light {
		background-color: #f0d9b5;
	}
	.dark {
		background-color: #b58863;
	}

	.selected {
		background-color: #ffcc00 !important;
	}
</style>
