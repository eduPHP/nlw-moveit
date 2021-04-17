import styles from '../styles/components/ExperienceBar.module.css'
import { ReactElement, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'

export function ExperienceBar(): ReactElement {
  const { experienceToNextLevel, currentXp } = useContext(ChallengesContext)

  const percentToNextLevel = Math.round(
    (currentXp * 100) / experienceToNextLevel,
  )

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />
        {percentToNextLevel > 0 && (
          <span
            className={styles.currentExperience}
            style={{ left: `${percentToNextLevel}%` }}
          >
            {currentXp} xp
          </span>
        )}
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}
