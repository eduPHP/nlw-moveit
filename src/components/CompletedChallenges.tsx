import styles from '../styles/components/CompletedChallenges.module.css'
import { ReactElement, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'

export function CompletedChallenges(): ReactElement {
  const { challengesCompleted } = useContext(ChallengesContext)

  return (
    <div className={styles.container}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}
