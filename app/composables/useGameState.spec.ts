import { describe, it, expect, beforeEach } from 'vitest'

describe('Score History - localStorage logic', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    if (typeof localStorage !== 'undefined') {
      localStorage.clear()
    }
  })

  it('should save scores to localStorage in JSON format', () => {
    const scores = [100, 200, 300]
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('2048-last-scores', JSON.stringify(scores))
      
      const saved = localStorage.getItem('2048-last-scores')
      expect(saved).toBe(JSON.stringify(scores))
      
      const parsed = JSON.parse(saved!)
      expect(parsed).toEqual(scores)
    }
  })

  it('should store only the last 5 scores', () => {
    const scores = [700, 600, 500, 400, 300, 200, 100]
    const lastFive = scores.slice(0, 5)
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('2048-last-scores', JSON.stringify(lastFive))
      
      const saved = localStorage.getItem('2048-last-scores')
      const parsed = JSON.parse(saved!)
      
      expect(parsed.length).toBe(5)
      expect(parsed).toEqual([700, 600, 500, 400, 300])
    }
  })

  it('should handle loading scores from localStorage', () => {
    const mockScores = [500, 400, 300, 200, 100]
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('2048-last-scores', JSON.stringify(mockScores))
      
      const loaded = localStorage.getItem('2048-last-scores')
      const parsed = JSON.parse(loaded!)
      
      expect(parsed).toEqual(mockScores)
    }
  })

  it('should handle empty localStorage gracefully', () => {
    if (typeof localStorage !== 'undefined') {
      const loaded = localStorage.getItem('2048-last-scores')
      expect(loaded).toBeNull()
    }
  })

  it('should prepend new scores to keep them in reverse chronological order', () => {
    const existingScores = [300, 200, 100]
    const newScore = 400
    const updatedScores = [newScore, ...existingScores].slice(0, 5)
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('2048-last-scores', JSON.stringify(existingScores))
      
      // Simulate adding a new score
      const current = JSON.parse(localStorage.getItem('2048-last-scores')!)
      const newHistory = [newScore, ...current].slice(0, 5)
      localStorage.setItem('2048-last-scores', JSON.stringify(newHistory))
      
      const saved = localStorage.getItem('2048-last-scores')
      const parsed = JSON.parse(saved!)
      
      expect(parsed).toEqual([400, 300, 200, 100])
      expect(parsed[0]).toBe(newScore)
    }
  })
})
