import styles from '../styles/components/LevelUpModal.module.css'
import { ReactElement, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'

export default function LevelUpModal(): ReactElement {
  const { level, closeLevelUpModal } = useContext(ChallengesContext)

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>
        <strong>Parabéns</strong>
        <p>Você subiu de nível!</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Fechar" />
        </button>
      </div>
    </div>
  )
}
