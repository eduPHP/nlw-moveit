import styles from '../styles/components/ChallengeBox.module.css'
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

export default function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  const { stopCountDown } = useContext(CountdownContext);

  const handleResetChallenge = () => {
    resetChallenge();
    stopCountDown();
  };
  const handleCompleteChallenge = () => {
    completeChallenge(activeChallenge);
    stopCountDown();
  };

  return (
    <div className={styles.container}>
      { activeChallenge ? (
        <div className={styles.active}>
          <header>
            Ganhe {activeChallenge.amount}xp
          </header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt={activeChallenge.type}/>
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              type="button"
              className={styles.failedButton}
              onClick={handleResetChallenge}
            >Falhei</button>
            <button
              type="button"
              className={styles.succeededButton}
              onClick={handleCompleteChallenge}
            >Completei</button>
          </footer>
        </div>
      ) : (
        <div className={styles.notActive}>
          <strong>
            Finalize um ciclo para receber desafios a serem completados
          </strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            <span>
            Complete os desafios para ganhar experiência e avance de level
          </span>
          </p>
        </div>
      ) }
    </div>
  )
}
