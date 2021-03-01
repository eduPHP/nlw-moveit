import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import challenges from '../challenges.json';
import LevelUpModal from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentXp: number;
  challengesCompleted: number;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  closeLevelUpModal: () => void;
  completeChallenge: (challenge: Challenge) => void;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentXp: number;
  challengesCompleted: number;
}

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState<number>(rest.level || 1);
  const [currentXp, setCurrentXp] = useState<number>(rest.currentXp || 0);
  const [challengesCompleted, setChallengesCompleted] = useState<number>(rest.challengesCompleted || 0);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [levelUpModalIsOpen, setLevelUpModalIsOpen] = useState<boolean>(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(()=>{
    Notification.requestPermission();
  },[])
  useEffect(()=>{
    Cookie.set('MoveItData', JSON.stringify({
      level,
      currentXp,
      challengesCompleted
    }));
  },[level, currentXp, challengesCompleted])

  const startNewChallenge = () => {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    const challenge: Challenge = challenges[randomIndex] as Challenge;

    setActiveChallenge(challenge);
    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo Desafio', {
        body: `Valendo ${challenge.amount}xp`,
        icon: `favicon.png`,
      })
    }
  };

  const resetChallenge = () => {
    setActiveChallenge(null);
  };

  const closeLevelUpModal = () => {
    setLevelUpModalIsOpen(false)
  }

  function levelUp() {
    setLevel(level + 1);
    setLevelUpModalIsOpen(true);
  }

  const completeChallenge = (challenge : Challenge) => {
    if (!challenge) {
      return;
    }

    const { amount } = challenge;
    let finalExperience = currentXp + amount;

    console.log({ finalExperience, currentXp, amount });
    if (finalExperience >= experienceToNextLevel) {
      levelUp();
      finalExperience = finalExperience - experienceToNextLevel;
    }
    console.log({ finalExperience, currentXp, amount });

    setCurrentXp(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  };

  return (
    <ChallengesContext.Provider value={{
      level,
      currentXp,
      challengesCompleted,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel,
      completeChallenge,
      closeLevelUpModal
    }}>
      {children}
      {levelUpModalIsOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
