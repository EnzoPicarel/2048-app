type Grid = [number[], number[], number[], number[]]

export const useGameState = () => {
  const grid = useState<Grid>('game-grid', () => createEmptyGrid())
  const score = useState<number>('game-score', () => 0)
  const bestScore = useState<number>('game-best-score', () => 0)
  const lastScores = useState<number[]>('game-last-scores', () => [])
  const isGameOver = useState<boolean>('game-over', () => false)
  const isWon = useState<boolean>('game-won', () => false)

  function createEmptyGrid(): Grid {
    return [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  }

  function spawnTile() {
    const emptyCells: [number, number][] = []
    const currentGrid = grid.value
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (currentGrid[r as 0|1|2|3][c] === 0) {
          emptyCells.push([r, c])
        }
      }
    }
    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length)
      const cell = emptyCells[randomIndex]
      if (cell) {
        const [row, col] = cell
        const newGrid: Grid = [                   
          [...currentGrid[0]],
          [...currentGrid[1]],
          [...currentGrid[2]],
          [...currentGrid[3]]
        ]
        newGrid[row as 0|1|2|3][col] = Math.random() < 0.9 ? 2 : 4
        grid.value = newGrid
      }
    }
  }

  function resetGame() {
    // Save current score to history before resetting (if score > 0)
    if (score.value > 0) {
      saveScoreToHistory(score.value)
    }
    
    grid.value = createEmptyGrid()
    score.value = 0
    isGameOver.value = false
    isWon.value = false
    spawnTile()
    spawnTile()
  }

  // Load best score from localStorage on client
  function loadBestScore() {
    if (import.meta.client) {
      const saved = localStorage.getItem('2048-best-score')
      if (saved) {
        bestScore.value = parseInt(saved, 10)
      }
    }
  }

  // Save best score to localStorage
  function saveBestScore() {
    if (import.meta.client) {
      localStorage.setItem('2048-best-score', bestScore.value.toString())
    }
  }

  // Save score to history (keep last 5)
  function saveScoreToHistory(scoreValue: number) {
    const newHistory = [scoreValue, ...lastScores.value].slice(0, 5)
    lastScores.value = newHistory
    if (import.meta.client) {
      localStorage.setItem('2048-last-scores', JSON.stringify(newHistory))
    }
  }

  // Load last scores from localStorage
  function loadLastScores() {
    if (import.meta.client) {
      const saved = localStorage.getItem('2048-last-scores')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed)) {
            lastScores.value = parsed.slice(0, 5)
          }
        } catch (e) {
          // Invalid JSON, ignore
        }
      }
    }
  }

  return {
    grid,
    score,
    bestScore,
    lastScores,
    isGameOver,
    isWon,
    resetGame,
    spawnTile,
    createEmptyGrid,
    loadBestScore,
    saveBestScore,
    loadLastScores,
    saveScoreToHistory
  }
}
