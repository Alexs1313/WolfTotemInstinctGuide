import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  Share,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import TottmLayout from '../TotemInstinctComponents/TottmLayout';

const REF_WIDTH = 375;
const REF_HEIGHT = 812;
const WALLPAPER_UNLOCKED_KEY = '@Riddles_wallpaperUnlocked';
const WALLPAPER_WIN_COUNT_KEY = '@Riddles_wallpaperWinCount';
const WALLPAPER_COUNT = 7;

const WALLPAPERS = [
  require('../TotemAssets/i/wallpapers/1.png'),
  require('../TotemAssets/i/wallpapers/2.png'),
  require('../TotemAssets/i/wallpapers/3.png'),
  require('../TotemAssets/i/wallpapers/4.png'),
  require('../TotemAssets/i/wallpapers/5.png'),
  require('../TotemAssets/i/wallpapers/6.png'),
  require('../TotemAssets/i/wallpapers/7.png'),
];

const BEAST_IMAGES = {
  wolf: require('../TotemAssets/i/wolf.png'),
  bison: require('../TotemAssets/i/bison.png'),
  falcon: require('../TotemAssets/i/falcon.png'),
  lynx: require('../TotemAssets/i/lynx.png'),
};

const RIDDLES = [
  // Wolf
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What grows when shared?',
    options: ['Fear', 'Silence', 'Trust', 'Time'],
    correctIndex: 2,
  },
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What shows who you truly are?',
    options: ['Words', 'Actions', 'Dreams', 'Luck'],
    correctIndex: 1,
  },
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What makes a leader strong?',
    options: ['Power', 'Control', 'Responsibility', 'Speed'],
    correctIndex: 2,
  },
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What should you follow when lost?',
    options: ['Noise', 'Crowd', 'Instinct', 'Fear'],
    correctIndex: 2,
  },
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What breaks when betrayed?',
    options: ['Time', 'Trust', 'Strength', 'Focus'],
    correctIndex: 1,
  },
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What grows from challenge?',
    options: ['Comfort', 'Strength', 'Silence', 'Luck'],
    correctIndex: 1,
  },
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What defines your path?',
    options: ['Others', 'Fear', 'Choice', 'Chance'],
    correctIndex: 2,
  },
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What protects your energy?',
    options: ['Anger', 'Boundaries', 'Speed', 'Noise'],
    correctIndex: 1,
  },
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What leads before words?',
    options: ['Thought', 'Action', 'Hope', 'Doubt'],
    correctIndex: 1,
  },
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What matters when standing alone?',
    options: ['Approval', 'Courage', 'Noise', 'Time'],
    correctIndex: 1,
  },
  // Bison
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What wins long journeys?',
    options: ['Speed', 'Patience', 'Luck', 'Power'],
    correctIndex: 1,
  },
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What keeps you standing?',
    options: ['Noise', 'Balance', 'Anger', 'Fear'],
    correctIndex: 1,
  },
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What grows quietly?',
    options: ['Chaos', 'Strength', 'Pressure', 'Rush'],
    correctIndex: 1,
  },
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What calms the mind?',
    options: ['Control', 'Breath', 'Speed', 'Noise'],
    correctIndex: 1,
  },
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What makes progress real?',
    options: ['Plans', 'Consistency', 'Dreams', 'Luck'],
    correctIndex: 1,
  },
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What holds value over time?',
    options: ['Trends', 'Stability', 'Speed', 'Risk'],
    correctIndex: 1,
  },
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What keeps you grounded?',
    options: ['Fear', 'Purpose', 'Noise', 'Doubt'],
    correctIndex: 1,
  },
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What helps you endure?',
    options: ['Anger', 'Focus', 'Calm', 'Rush'],
    correctIndex: 2,
  },
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What carries you through storms?',
    options: ['Escape', 'Strength', 'Speed', 'Hope'],
    correctIndex: 1,
  },
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What should never be rushed?',
    options: ['Success', 'Noise', 'Rest', 'Thought'],
    correctIndex: 0,
  },
  // Falcon
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What clears confusion?',
    options: ['Speed', 'Focus', 'Noise', 'Fear'],
    correctIndex: 1,
  },
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What reveals the truth?',
    options: ['Distance', 'Force', 'Rush', 'Doubt'],
    correctIndex: 0,
  },
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What sharpens decisions?',
    options: ['Emotion', 'Clarity', 'Pressure', 'Noise'],
    correctIndex: 1,
  },
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What makes action effective?',
    options: ['Timing', 'Speed', 'Power', 'Luck'],
    correctIndex: 0,
  },
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What should you cut first?',
    options: ['Goals', 'Distractions', 'Rest', 'Silence'],
    correctIndex: 1,
  },
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What improves direction?',
    options: ['Focus', 'Noise', 'Control', 'Fear'],
    correctIndex: 0,
  },
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What guides smart action?',
    options: ['Impulse', 'Vision', 'Pressure', 'Habit'],
    correctIndex: 1,
  },
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What weakens progress?',
    options: ['Doubt', 'Distraction', 'Rest', 'Planning'],
    correctIndex: 1,
  },
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What helps you move fast?',
    options: ['Strength', 'Clarity', 'Noise', 'Fear'],
    correctIndex: 1,
  },
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What matters before action?',
    options: ['Force', 'Intention', 'Speed', 'Luck'],
    correctIndex: 1,
  },
  // Lynx
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What speaks without words?',
    options: ['Noise', 'Silence', 'Fear', 'Speed'],
    correctIndex: 1,
  },
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What reveals hidden truth?',
    options: ['Observation', 'Force', 'Noise', 'Rush'],
    correctIndex: 0,
  },
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What grows in stillness?',
    options: ['Chaos', 'Insight', 'Fear', 'Pressure'],
    correctIndex: 1,
  },
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What should you notice first?',
    options: ['Details', 'Noise', 'Speed', 'Opinion'],
    correctIndex: 0,
  },
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What guides quiet decisions?',
    options: ['Habit', 'Intuition', 'Logic', 'Rush'],
    correctIndex: 1,
  },
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What hides in plain sight?',
    options: ['Truth', 'Fear', 'Strength', 'Control'],
    correctIndex: 0,
  },
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What fades when rushed?',
    options: ['Accuracy', 'Speed', 'Power', 'Noise'],
    correctIndex: 0,
  },
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What protects awareness?',
    options: ['Silence', 'Control', 'Fear', 'Speed'],
    correctIndex: 0,
  },
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What helps you see more?',
    options: ['Stillness', 'Pressure', 'Noise', 'Force'],
    correctIndex: 0,
  },
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What should be trusted quietly?',
    options: ['Crowd', 'Intuition', 'Noise', 'Luck'],
    correctIndex: 1,
  },
];

const TOTAL_ROUNDS = 2;
const TIMER_SECONDS = 15;

const pickRandomRiddles = () => {
  const shuffled = [...RIDDLES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, TOTAL_ROUNDS);
};

const RiddlesScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const rw = width / REF_WIDTH;
  const rh = height / REF_HEIGHT;
  const rs = Math.min(rw, rh);
  const s = useMemo(
    () => {
      const headerThumbSize = Math.min(
        Math.max(width * 0.235, 72),
        height * 0.108,
      );
      return {
        container: { flex: 1, padding: width * 0.04, alignItems: 'center' },
        headerRow: {
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: height * 0.03,
        },
        headerPill: {
          flex: 1,
          marginHorizontal: width * 0.032,
          borderRadius: width * 0.053,
          borderWidth: 1,
          borderColor: '#FAC57F',
          minHeight: height * 0.108,
          justifyContent: 'center',
        },
        headerTitleRow: { flexDirection: 'row', alignItems: 'center', padding: width * 0.027 },
        headerBackWrap: { marginRight: width * 0.053 },
        headerTitleText: {
          color: '#FAC57F',
          fontSize: Math.round(20 * rs),
          fontFamily: 'Ubuntu-Bold',
          width: '70%',
        },
        headerThumbWrap: { width: headerThumbSize, height: headerThumbSize, overflow: 'hidden' },
        headerThumbImage: { width: '100%', height: '100%' },
        introImageWrap: { width: '100%', alignItems: 'center', marginBottom: height * 0.02 },
        introCard: {
          width: '95%',
          borderRadius: width * 0.059,
          borderWidth: 1,
          borderColor: '#79080A',
          marginBottom: height * 0.037,
        },
        introCardPadding: { padding: width * 0.093, paddingTop: height * 0.025 },
        introCardTitle: {
          color: '#79080A',
          fontSize: Math.round(22 * rs),
          fontFamily: 'Ubuntu-Bold',
          marginBottom: height * 0.018,
          textAlign: 'center',
        },
        introCardText: {
          color: '#000',
          fontSize: Math.round(15 * rs),
          fontFamily: 'Ubuntu-Regular',
          textAlign: 'center',
          lineHeight: Math.round(22 * rs),
        },
        startBtnWrap: { width: '85%' },
        startBtn: {
          height: height * 0.084,
          borderRadius: width * 0.064,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#FAC57F',
        },
        startBtnText: {
          color: '#FAC57F',
          fontSize: Math.round(20 * rs),
          fontFamily: 'Ubuntu-Bold',
        },
        gameTopRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: height * 0.02,
          paddingHorizontal: width * 0.021,
        },
        roundBadge: {
          borderRadius: width * 0.053,
          borderWidth: 1,
          borderColor: '#79080A',
          height: height * 0.085,
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: width * 0.4,
        },
        roundBadgePadding: { padding: width * 0.035 },
        roundBadgeText: {
          color: '#79080A',
          fontSize: Math.round(20 * rs),
          fontFamily: 'Ubuntu-Bold',
        },
        timerRow: { flexDirection: 'row', alignItems: 'center', gap: width * 0.021 },
        timerIconWrap: {
          width: width * 0.157,
          height: height * 0.073,
          borderRadius: width * 0.045,
          backgroundColor: '#FAC57F',
          borderWidth: 1.5,
          borderColor: '#79080A',
          alignItems: 'center',
          justifyContent: 'center',
        },
        timerIcon: { width: width * 0.064, height: height * 0.03 },
        timerBadge: {
          minWidth: width * 0.267,
          height: height * 0.073,
          borderRadius: width * 0.048,
          backgroundColor: '#FAC57F',
          borderWidth: 1.5,
          borderColor: '#79080A',
          alignItems: 'center',
          justifyContent: 'center',
        },
        timerBadgeText: {
          color: '#79080A',
          fontSize: Math.round(16 * rs),
          fontFamily: 'Ubuntu-Bold',
        },
        riddleCard: {
          width: '95%',
          borderRadius: width * 0.059,
          borderWidth: 1,
          borderColor: '#79080A',
          marginBottom: height * 0.025,
          overflow: 'hidden',
          marginTop: height * 0.012,
        },
        riddleCardInner: { flexDirection: 'row', padding: width * 0.043 },
        riddleImageWrap: { width: width * 0.33, height: height * 0.19, marginRight: width * 0.032 },
        riddleImage: { width: '100%', height: '100%', borderRadius: width * 0.032 },
        riddleTextWrap: { flex: 1, justifyContent: 'center' },
        riddleFrom: {
          color: '#79080A',
          fontSize: Math.round(20 * rs),
          fontFamily: 'Ubuntu-Bold',
          marginBottom: height * 0.007,
        },
        riddleQuestion: {
          color: '#000',
          fontSize: Math.round(20 * rs),
          fontFamily: 'Ubuntu-Regular',
          lineHeight: Math.round(24 * rs),
          marginTop: height * 0.012,
        },
        optionsGrid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          width: '95%',
          gap: height * 0.012,
          marginBottom: height * 0.03,
        },
        optionWrap: { width: '48%' },
        optionBtn: {
          borderRadius: width * 0.04,
          borderWidth: 1,
          borderColor: '#FAC57F',
          alignItems: 'center',
          justifyContent: 'center',
          height: height * 0.122,
        },
        optionBtnPadding: { padding: width * 0.035 },
        optionBtnText: {
          color: '#FAC57F',
          fontSize: Math.round(22 * rs),
          fontFamily: 'Ubuntu-Bold',
        },
        nextBtnWrap: { width: '85%', marginTop: height * 0.025 },
        nextBtn: {
          height: height * 0.085,
          borderRadius: width * 0.059,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#FAC57F',
        },
        nextBtnText: {
          color: '#FAC57F',
          fontSize: Math.round(22 * rs),
          fontFamily: 'Ubuntu-Bold',
        },
        wallpaperWrap: {
          width: width * 0.57,
          height: height * 0.395,
          marginBottom: height * 0.02,
          borderRadius: width * 0.053,
          overflow: 'hidden',
          borderWidth: 2,
          borderColor: '#79080A',
          backgroundColor: '#FBDFBC',
        },
        wallpaperImage: { width: '100%', height: '100%' },
        resultCard: {
          width: '95%',
          borderRadius: width * 0.059,
          borderWidth: 1,
          borderColor: '#79080A',
          marginBottom: height * 0.03,
        },
        resultCardPadding: { padding: width * 0.093, paddingTop: height * 0.025 },
        resultTitle: {
          color: '#79080A',
          fontSize: Math.round(24 * rs),
          fontFamily: 'Ubuntu-Bold',
          marginBottom: height * 0.015,
          textAlign: 'center',
        },
        resultText: {
          color: '#000',
          fontSize: Math.round(15 * rs),
          fontFamily: 'Ubuntu-Regular',
          textAlign: 'center',
          lineHeight: Math.round(22 * rs),
        },
        shareBtnWrap: { width: '85%' },
        shareBtn: {
          height: height * 0.085,
          borderRadius: width * 0.064,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#FAC57F',
        },
        shareBtnText: {
          color: '#FAC57F',
          fontSize: Math.round(22 * rs),
          fontFamily: 'Ubuntu-Bold',
        },
      };
    },
    [width, height, rs],
  );
  const [phase, setPhase] = useState('intro');
  const [currentRound, setCurrentRound] = useState(0);
  const [riddles, setRiddles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(TIMER_SECONDS);
  const [wonWallpaperIndex, setWonWallpaperIndex] = useState(null);
  const timerRef = useRef(null);

  const currentRiddle = riddles[currentRound];
  const hasAnswered = selectedIndex !== null;

  useEffect(() => {
    if (phase !== 'game' || !currentRiddle || hasAnswered) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    setSecondsLeft(TIMER_SECONDS);
    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setSelectedIndex(-1);
          setAnswers(a => [...a, -1]);
          if (currentRound + 1 >= TOTAL_ROUNDS) {
            setPhase('result');
          } else {
            setCurrentRound(c => c + 1);
            setSelectedIndex(null);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [phase, currentRound, hasAnswered, currentRiddle?.question]);

  const handleStart = () => {
    setRiddles(pickRandomRiddles());
    setCurrentRound(0);
    setSelectedIndex(null);
    setAnswers([]);
    setSecondsLeft(TIMER_SECONDS);
    setWonWallpaperIndex(null);
    setPhase('game');
  };

  const handleSelectAnswer = index => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setAnswers(a => [...a, index]);
  };

  const handleNextOrResult = () => {
    if (currentRound + 1 >= TOTAL_ROUNDS) {
      setPhase('result');
    } else {
      setCurrentRound(c => c + 1);
      setSelectedIndex(null);
      setSecondsLeft(TIMER_SECONDS);
    }
  };

  const handleShare = () => {
    const correctCount = riddles.length
      ? answers.reduce(
          (acc, ans, i) => acc + (riddles[i].correctIndex === ans ? 1 : 0),
          0,
        )
      : 0;
    Share.share({
      message: `Riddles of the beast: I answered ${correctCount} out of ${TOTAL_ROUNDS} riddles correctly!`,
    });
  };

  const correctCount =
    phase === 'result' && riddles.length
      ? answers.reduce(
          (acc, ans, i) => acc + (riddles[i].correctIndex === ans ? 1 : 0),
          0,
        )
      : 0;
  const wonWallpaper = correctCount >= TOTAL_ROUNDS;

  useEffect(() => {
    if (phase !== 'result' || !riddles.length) return;
    const count = answers.reduce(
      (acc, ans, i) => acc + (riddles[i].correctIndex === ans ? 1 : 0),
      0,
    );
    if (count >= TOTAL_ROUNDS) {
      AsyncStorage.setItem(WALLPAPER_UNLOCKED_KEY, 'true');
      setWonWallpaperIndex(0);
      AsyncStorage.getItem(WALLPAPER_WIN_COUNT_KEY).then(raw => {
        const prev = Math.min(parseInt(raw || '0', 10), 999);
        const next = prev + 1;
        AsyncStorage.setItem(WALLPAPER_WIN_COUNT_KEY, String(next));
        setWonWallpaperIndex((next - 1) % WALLPAPER_COUNT);
      });
    } else {
      setWonWallpaperIndex(null);
    }
  }, [phase, riddles, answers]);

  const renderHeader = () => (
    <View style={s.headerRow}>
      <LinearGradient colors={['#79080A', '#DF0F12']} style={s.headerPill}>
        <View style={s.headerTitleRow}>
          <TouchableOpacity
            style={s.headerBackWrap}
            activeOpacity={0.85}
            onPress={() => navigation.goBack()}
          >
            <Image source={require('../TotemAssets/i/back.png')} />
          </TouchableOpacity>
          <Text style={s.headerTitleText}>Riddles of the beast</Text>
        </View>
      </LinearGradient>
      <View style={s.headerThumbWrap}>
        <Image
          source={require('../TotemAssets/i/apphead.png')}
          style={s.headerThumbImage}
        />
      </View>
    </View>
  );

  const renderIntro = () => (
    <>
      <View style={s.introImageWrap}>
        <Image source={require('../TotemAssets/i/riddlesScrn.png')} />
      </View>
      <LinearGradient colors={['#FBDFBC', '#FAC57F']} style={s.introCard}>
        <View style={s.introCardPadding}>
          <Text style={s.introCardTitle}>Riddles from animals</Text>
          <Text style={s.introCardText}>
            If there are two riddles, answer them all correctly and you will get
            the wallpaper, if not, you will be lucky next time.
          </Text>
        </View>
      </LinearGradient>
      <TouchableOpacity
        style={s.startBtnWrap}
        activeOpacity={0.85}
        onPress={handleStart}
      >
        <LinearGradient colors={['#79080A', '#DF0F12']} style={s.startBtn}>
          <Text style={s.startBtnText}>Start</Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );

  const renderGame = () => {
    if (!currentRiddle) return null;
    const beastImage = BEAST_IMAGES[currentRiddle.beastId] || BEAST_IMAGES.wolf;
    return (
      <>
        <View style={s.gameTopRow}>
          <LinearGradient colors={['#FAC57F', '#FAC57F']} style={s.roundBadge}>
            <View style={s.roundBadgePadding}>
              <Text style={s.roundBadgeText}>
                Round {currentRound + 1}/{TOTAL_ROUNDS}
              </Text>
            </View>
          </LinearGradient>
          <View style={s.timerRow}>
            <View style={s.timerIconWrap}>
              <Image
                source={require('../TotemAssets/i/time.png')}
                style={s.timerIcon}
              />
            </View>
            <View style={s.timerBadge}>
              <Text style={s.timerBadgeText}>
                {hasAnswered
                  ? '---'
                  : `00:${String(secondsLeft).padStart(2, '0')}`}
              </Text>
            </View>
          </View>
        </View>

        <LinearGradient colors={['#FBDFBC', '#FAC57F']} style={s.riddleCard}>
          <View style={s.riddleCardInner}>
            <View style={s.riddleImageWrap}>
              <Image source={beastImage} style={s.riddleImage} />
            </View>
            <View style={s.riddleTextWrap}>
              <Text style={s.riddleFrom}>
                Riddle from the {currentRiddle.beastName.toLowerCase()}
              </Text>
              <Text style={s.riddleQuestion}>{currentRiddle.question}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={s.optionsGrid}>
          {currentRiddle.options.map((opt, index) => {
            const isSelected = selectedIndex === index;
            const isCorrect = currentRiddle.correctIndex === index;
            const showGreen = hasAnswered && isCorrect;
            const showRed = hasAnswered && isSelected && !isCorrect;
            return (
              <TouchableOpacity
                key={index}
                style={s.optionWrap}
                activeOpacity={0.85}
                onPress={() => handleSelectAnswer(index)}
                disabled={hasAnswered}
              >
                <LinearGradient
                  colors={
                    showGreen
                      ? ['#2E7D32', '#4CAF50']
                      : showRed
                      ? ['#8E3A3A', '#B05050']
                      : ['#79080A', '#DF0F12']
                  }
                  style={s.optionBtn}
                >
                  <View style={s.optionBtnPadding}>
                    <Text style={s.optionBtnText}>{opt}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        {(hasAnswered || selectedIndex === -1) && (
          <TouchableOpacity
            style={s.nextBtnWrap}
            activeOpacity={0.85}
            onPress={handleNextOrResult}
          >
            <LinearGradient colors={['#79080A', '#DF0F12']} style={s.nextBtn}>
              <Text style={s.nextBtnText}>
                {currentRound + 1 >= TOTAL_ROUNDS ? 'Result' : 'Next'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </>
    );
  };

  const renderResult = () => (
    <>
      {wonWallpaper && wonWallpaperIndex !== null && (
        <View style={s.wallpaperWrap}>
          <Image
            source={WALLPAPERS[wonWallpaperIndex]}
            style={s.wallpaperImage}
            resizeMode="cover"
          />
        </View>
      )}
      {!wonWallpaper && (
        <View style={s.introImageWrap}>
          <Image source={require('../TotemAssets/i/riddlesScrn.png')} />
        </View>
      )}

      <LinearGradient colors={['#FBDFBC', '#FAC57F']} style={s.resultCard}>
        <View style={s.resultCardPadding}>
          <Text style={s.resultTitle}>Result</Text>

          <Text style={s.resultText}>
            {wonWallpaper
              ? `You answered ${correctCount} out of ${TOTAL_ROUNDS} riddles correctly, so you will receive a collection wallpaper. You can download the wallpaper in the 'Collection' tab.`
              : `You answered ${correctCount} out of ${TOTAL_ROUNDS} riddles correctly, so you don't get the wallpaper. Try again, I'm sure you'll get lucky!`}
          </Text>
        </View>
      </LinearGradient>
      <TouchableOpacity
        style={s.shareBtnWrap}
        activeOpacity={0.85}
        onPress={handleShare}
      >
        <LinearGradient colors={['#79080A', '#DF0F12']} style={s.shareBtn}>
          <Text style={s.shareBtnText}>Share</Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );

  return (
    <TottmLayout>
      <View style={[s.container, { paddingTop: height * 0.06 }]}>
        {renderHeader()}
        {phase === 'intro' && renderIntro()}
        {phase === 'game' && renderGame()}
        {phase === 'result' && renderResult()}
      </View>
    </TottmLayout>
  );
};

export default RiddlesScreen;
