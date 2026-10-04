import { useState } from 'react'
import PipelineStage from './components/PipelineStage'
import { getCompletionPercentage } from './utils/getCompletionPercentage'
import type { PipelineStage as PipelineStageData } from './types'

const stages: PipelineStageData[] = [
  {
    id: 'source',
    number: '01',
    title: 'Push your code',
    description: 'Git & GitHub',
    detail: 'Commit changes and push them to your GitHub repository.',
  },
  {
    id: 'ci',
    number: '02',
    title: 'Verify every change',
    description: 'Install · lint · test · build',
    detail: 'A Jenkins pipeline will run the same npm checks on every change.',
  },
  {
    id: 'image',
    number: '03',
    title: 'Package the app',
    description: 'Docker image',
    detail: 'Build a production image with Node and serve it using Nginx.',
  },
  {
    id: 'deploy',
    number: '04',
    title: 'Run it anywhere',
    description: 'Container runtime',
    detail: 'Start the image locally now; automate deployment in a later lesson.',
  },
]

export default function App() {
  const [completedStages, setCompletedStages] = useState<string[]>([])
  const completion = getCompletionPercentage(completedStages.length, stages.length)

  function toggleStage(stageId: string) {
    setCompletedStages((current) =>
      current.includes(stageId)
        ? current.filter((id) => id !== stageId)
        : [...current, stageId],
    )
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a aria-label="Pipeline Lab home" className="brand" href="/">
          <span aria-hidden="true" className="brand__mark">P</span>
          <span>pipeline<span className="brand__light">lab</span></span>
        </a>
        <span className="topbar__tag"><span className="status-dot" /> LEARNING PROJECT</span>
      </header>

      <section aria-labelledby="page-title" className="hero">
        <p className="eyebrow"><span /> YOUR FIRST CI/CD PIPELINE</p>
        <h1 id="page-title">Ship with confidence.!!</h1>
        <p className="hero__intro">
          A hands-on path from your first Git push to a containerized app.
          Take it one stage at a time.
        </p>
      </section>

      <section aria-label="Learning progress" className="progress-card">
        <div className="progress-card__heading">
          <div>
            <p className="section-label">YOUR PROGRESS</p>
            <p className="progress-card__caption">
              {completedStages.length === stages.length
                ? 'All stages complete. Nice work!'
                : `${completedStages.length} of ${stages.length} stages explored`}
            </p>
          </div>
          <span aria-label={`${completion}% complete`} className="progress-card__percent">
            {completion}<span>%</span>
          </span>
        </div>
        <div
          aria-label="Pipeline learning progress"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={completion}
          className="progress-track"
          role="progressbar"
        >
          <span style={{ width: `${completion}%` }} />
        </div>
      </section>

      <section aria-labelledby="stages-title" className="stages-section">
        <div className="section-heading">
          <div>
            <p className="section-label">THE JOURNEY</p>
            <h2 id="stages-title">From source to running app</h2>
          </div>
          <span className="stage-count">04 STAGES</span>
        </div>
        <ol className="stage-list">
          {stages.map((stage) => (
            <PipelineStage
              completed={completedStages.includes(stage.id)}
              key={stage.id}
              onToggle={toggleStage}
              stage={stage}
            />
          ))}
        </ol>
        <p className="hint">
          <span aria-hidden="true">✳</span> Select a stage to mark it explored.
        </p>
      </section>

      <footer className="page-footer">
        <span>BUILT FOR LEARNING, READY FOR YOUR FIRST BUILD.</span>
        <span className="footer__stack">REACT <i /> TYPESCRIPT <i /> VITE <i /> DOCKER</span>
      </footer>
    </main>
  )
}
