import type { PipelineStage as PipelineStageData } from '../types'

type PipelineStageProps = {
  stage: PipelineStageData
  completed: boolean
  onToggle: (stageId: string) => void
}

export default function PipelineStage({
  stage,
  completed,
  onToggle,
}: PipelineStageProps) {
  return (
    <li className={`stage${completed ? ' stage--complete' : ''}`}>
      <button
        aria-pressed={completed}
        className="stage__button"
        onClick={() => onToggle(stage.id)}
        type="button"
      >
        <span aria-hidden="true" className="stage__number">
          {completed ? '✓' : stage.number}
        </span>
        <span className="stage__copy">
          <span className="stage__title">{stage.title}</span>
          <span className="stage__description">{stage.description}</span>
        </span>
        <span className="stage__detail">{stage.detail}</span>
        <span className="stage__chevron" aria-hidden="true">↗</span>
      </button>
    </li>
  )
}
