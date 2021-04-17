import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ChallengesContext } from './ChallengesContext'

interface Context {
  time: number
  isActive: boolean
  hasFinished: boolean
  startCountDown: () => void
  stopCountDown: () => void
}

export const CountdownContext = createContext({} as Context)

interface CountdownProviderProps {
  children: ReactNode
}

const defaultTime: number = 25 * 60
// const defaultTime = 1
// eslint-disable-next-line no-undef
let countDownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: CountdownProviderProps) {
  const [time, setTime] = useState(defaultTime)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)
  const { startNewChallenge } = useContext(ChallengesContext)

  const startCountDown = useCallback(() => {
    setIsActive(true)
  }, [])
  const stopCountDown = useCallback(() => {
    clearTimeout(countDownTimeout)
    setIsActive(false)
    setTime(defaultTime)
    setHasFinished(false)
  }, [])

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider
      value={{
        time,
        isActive,
        hasFinished,
        startCountDown,
        stopCountDown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}
