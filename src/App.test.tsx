import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Pipeline Lab', () => {
  it('shows the learning stages and starts at zero progress', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /Ship with confidence/ })).toBeInTheDocument()
    expect(screen.getByText('0 of 4 stages explored')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /push your code/i })).toBeInTheDocument()
  })

  it('updates progress when a stage is explored and toggled off', () => {
    render(<App />)
    const sourceStage = screen.getByRole('button', { name: /push your code/i })
    const progressBar = screen.getByRole('progressbar')

    fireEvent.click(sourceStage)
    expect(screen.getByText('1 of 4 stages explored')).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '25')

    fireEvent.click(sourceStage)
    expect(screen.getByText('0 of 4 stages explored')).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '0')
  })
})
