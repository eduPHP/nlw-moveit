import styles from '../styles/components/Countdown.module.css'
import { ReactElement, useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext'

export function Countdown(): ReactElement {
  const {
    time,
    isActive,
    hasFinished,
    startCountDown,
    stopCountDown,
  } = useContext(CountdownContext)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [minuteL, minuteR] = String(minutes).padStart(2, '0').split('')
  const [secondL, secondR] = String(seconds).padStart(2, '0').split('')

  return (
    <div>
      <div className={styles.container}>
        <div>
          <span>{minuteL}</span>
          <span>{minuteR}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondL}</span>
          <span>{secondR}</span>
        </div>
      </div>
      {hasFinished ? (
        <button className={styles.countdownButton} disabled>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={stopCountDown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button className={styles.countdownButton} onClick={startCountDown}>
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  )
}
