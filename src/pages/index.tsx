import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ExperienceBar } from '../components/ExperienceBar';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Profile } from '../components/Profile';

import styles from '../styles/pages/Home.module.css';
import { Countdown } from '../components/Countdown';
import ChallengeBox from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { ReactNode } from 'react';

interface HomeProps {
  level: number;
  currentXp: number;
  challengesCompleted: number;
}
export default function Home({level, challengesCompleted, currentXp}: HomeProps) {
  return (
    <ChallengesProvider challengesCompleted={challengesCompleted} level={level} currentXp={currentXp}>

      <div className={styles.container}>
        <Head>
          <title>MoveIt</title>
        </Head>

        <ExperienceBar/>

        <CountdownProvider>
          <section>
            <div>
              <Profile/>
              <CompletedChallenges/>
              <Countdown/>
            </div>
            <div>
              <ChallengeBox/>
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = context.req.cookies.MoveItData;

  return {
    props: data ? JSON.parse(data) : { level: 1, currentXp: 0, challengesCompleted: 0 }
  };
};
