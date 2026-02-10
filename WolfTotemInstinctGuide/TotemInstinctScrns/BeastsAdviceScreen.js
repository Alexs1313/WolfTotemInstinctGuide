import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

const SAVED_ADVICE_KEY = '@BeastsAdvice_saved';

const BEASTS = [
  {
    id: 'wolf',
    name: 'Wolf',
    trait: 'Direct & honest',
    description:
      'Short, bold advice that pushes you to act and trust your instinct.',
    image: require('../TotemAssets/i/wolf.png'),
    advice: [
      'Trust your instinct.',
      'Lead, even when unsure.',
      'Stand your ground.',
      'Protect what matters.',
      "Act, don't wait.",
      'Be loyal to yourself.',
      'Face challenges head-on.',
      'Speak the truth.',
      'Move with purpose.',
      'Choose your pack wisely.',
      "Don't fear solitude.",
      'Stay alert.',
      'Commit fully.',
      'Follow your inner call.',
      'Strength comes from focus.',
      'Take responsibility.',
      'Walk your own path.',
      'Confidence is built in action.',
      'Respect your boundaries.',
      'Trust who you are.',
    ],
  },
  {
    id: 'bison',
    name: 'Bison',
    trait: 'Calm & grounding',
    description: 'Steady advice that reminds you to slow down and stay strong.',
    image: require('../TotemAssets/i/bison.png'),
    advice: [
      'Move slowly, move strong.',
      'Stay grounded.',
      'Patience brings power.',
      "Don't rush your journey.",
      'Strength grows with time.',
      'Stand firm in storms.',
      'Keep your balance.',
      'One step is enough today.',
      'Endurance wins.',
      'Rest when needed.',
      'Trust steady progress.',
      'Be resilient.',
      'Carry your weight with pride.',
      'Calm is strength.',
      "Don't fear long paths.",
      'Stay rooted.',
      'Breathe deeply.',
      'Stability creates freedom.',
      'Hold your position.',
      'You are stronger than you think.',
    ],
  },
  {
    id: 'falcon',
    name: 'Falcon',
    trait: 'Clear & focused',
    description: 'Sharp advice that helps you see priorities and act fast.',
    image: require('../TotemAssets/i/falcon.png'),
    advice: [
      'See the bigger picture.',
      'Focus on one target.',
      'Act at the right moment.',
      'Clear your mind.',
      'Cut distractions.',
      'Decide fast.',
      'Precision beats force.',
      'Rise above doubt.',
      'Keep your vision sharp.',
      "Don't hesitate too long.",
      'Trust your timing.',
      'Think ahead.',
      'Speed comes from clarity.',
      'Stay light and alert.',
      'Choose wisely.',
      'Strike with purpose.',
      'Look forward, not back.',
      'Simplify your path.',
      'Focus brings power.',
      'Move with intention.',
    ],
  },
  {
    id: 'lynx',
    name: 'Lynx',
    trait: 'Subtle & intuitive',
    description:
      'Quiet advice that guides you through insight and hidden signs.',
    image: require('../TotemAssets/i/lynx.png'),
    advice: [
      'Observe before acting.',
      'Trust quiet signals.',
      'Not everything is visible.',
      'Listen more than you speak.',
      'Move unseen.',
      'Follow intuition.',
      'Notice small details.',
      'Silence holds answers.',
      'Stay aware.',
      'Patience reveals truth.',
      'Choose the right moment.',
      'Look between the lines.',
      'Stay adaptable.',
      'Mystery is strength.',
      'Let things unfold.',
      'Watch carefully.',
      'Insight comes quietly.',
      "Don't rush clarity.",
      'Trust what you sense.',
      'See what others miss.',
    ],
  },
];

const getRandomAdvice = beast => {
  const index = Math.floor(Math.random() * beast.advice.length);
  return beast.advice[index];
};

const REF_WIDTH = 375;
const REF_HEIGHT = 812;

const BeastsAdviceScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState('browse');
  const [currentAdvice, setCurrentAdvice] = useState(null);
  const [savedIds, setSavedIds] = useState(new Set());
  const [savedList, setSavedList] = useState([]);
  const { width, height } = useWindowDimensions();

  const rw = width / REF_WIDTH;
  const rh = height / REF_HEIGHT;
  const rs = Math.min(rw, rh);

  const s = useMemo(() => {
    const navRowHeight = Math.max(height * 0.085, 48);
    return {
      container: {
        flex: 1,
        padding: width * 0.04,
        alignItems: 'center',
      },
      headerRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: height * 0.03,
      },
      headerPill: {
        flex: 1,
        marginRight: 10,
        borderRadius: width * 0.053,
        borderWidth: 1,
        borderColor: '#FAC57F',
        minHeight: height * 0.108,
        justifyContent: 'center',
      },
      headerTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: width * 0.027,
      },
      headerBackWrap: { marginRight: width * 0.037 },
      headerTitleText: {
        color: '#FAC57F',
        fontSize: Math.round(20 * rs),
        fontFamily: 'Ubuntu-Bold',
      },
      headerThumbWrap: {
        width: (() => {
          const headerH = height * 0.108;
          const byWidth = width * 0.235;
          const size = Math.min(Math.max(byWidth, 72), headerH);
          return size;
        })(),
        height: (() => {
          const headerH = height * 0.108;
          const byWidth = width * 0.235;
          const size = Math.min(Math.max(byWidth, 72), headerH);
          return size;
        })(),
        overflow: 'hidden',
      },
      headerThumbImage: { width: '100%', height: '100%' },
      beastImageWrap: {
        width: '100%',
        alignItems: 'center',
        marginBottom: height * 0.022,
      },
      beastImage: {},
      card: {
        width: '100%',
        alignSelf: 'center',
        borderRadius: width * 0.059,
        borderWidth: 1,
        borderColor: '#79080A',
        alignItems: 'center',
        marginBottom: height * 0.03,
      },
      cardTitle: {
        color: '#79080A',
        fontSize: Math.round(28 * rs),
        fontFamily: 'Ubuntu-Bold',
        textAlign: 'center',
        marginBottom: height * 0.012,
      },
      cardTrait: {
        color: '#000',
        fontSize: Math.round(15 * rs),
        fontFamily: 'Ubuntu-Regular',
        textAlign: 'center',
        marginBottom: height * 0.017,
      },
      cardDescription: {
        color: '#000',
        fontSize: Math.round(15 * rs),
        fontFamily: 'Ubuntu-Regular',
        textAlign: 'center',
        lineHeight: Math.round(20 * rs),
      },
      dotsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: width * 0.021,
        marginTop: height * 0.03,
      },
      dot: {
        width: width * 0.037,
        height: width * 0.037,
        borderRadius: width * 0.008,
        backgroundColor: '#A2171980',
        opacity: 0.6,
      },
      dotActive: { backgroundColor: '#79080A', opacity: 1 },
      navRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: width * 0.032,
        width: '100%',
        paddingHorizontal: width * 0.01,
      },
      navButtonWrap: { flex: 0 },
      navButtonPlaceholder: {
        width: navRowHeight,
        height: navRowHeight,
      },
      navButton: {
        width: navRowHeight,
        height: navRowHeight,
        borderRadius: width * 0.059,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FAC57F',
      },
      chooseButtonWrap: { flex: 1, maxWidth: width * 0.63 },
      chooseButton: {
        height: navRowHeight,
        borderRadius: width * 0.059,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FAC57F',
      },
      chooseButtonText: {
        color: '#FAC57F',
        fontSize: Math.round(20 * rs),
        fontFamily: 'Ubuntu-Bold',
      },
      adviceCardTitle: {
        color: '#79080A',
        fontSize: Math.round(32 * rs),
        fontFamily: 'Ubuntu-Bold',
        textAlign: 'center',
        marginBottom: height * 0.055,
      },
      adviceCardText: {
        color: '#000',
        fontSize: Math.round(22 * rs),
        fontFamily: 'Ubuntu-Medium',
        textAlign: 'center',
        lineHeight: Math.round(26 * rs),
      },
      adviceActionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: width * 0.043,
        width: '100%',
        paddingHorizontal: width * 0.053,
      },
      shareButtonWrap: { flex: 1 },
      shareButton: {
        height: height * 0.085,
        borderRadius: width * 0.059,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FAC57F',
      },
      shareButtonText: {
        color: '#FAC57F',
        fontSize: Math.round(24 * rs),
        fontFamily: 'Ubuntu-Bold',
      },
      saveButtonWrap: { flex: 0 },
      saveButton: {
        width: height * 0.085,
        height: height * 0.085,
        borderRadius: width * 0.059,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FAC57F',
      },
    };
  }, [width, height, rs]);

  const beast = BEASTS[currentIndex];

  const loadSaved = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(SAVED_ADVICE_KEY);
      if (raw) {
        const list = JSON.parse(raw);
        setSavedList(list);
        setSavedIds(new Set(list.map(item => item.id)));
      }
    } catch (_) {
      // ignore
    }
  }, []);

  useEffect(() => {
    loadSaved();
  }, [loadSaved]);

  const handlePrev = () => {
    setCurrentIndex(i => (i <= 0 ? BEASTS.length - 1 : i - 1));
    if (phase === 'advice') setPhase('browse');
  };

  const handleNext = () => {
    setCurrentIndex(i => (i >= BEASTS.length - 1 ? 0 : i + 1));
    if (phase === 'advice') setPhase('browse');
  };

  const handleChoose = () => {
    const advice = getRandomAdvice(beast);
    setCurrentAdvice({ beastName: beast.name, text: advice });
    setPhase('advice');
  };

  const handleShare = () => {
    if (!currentAdvice) return;
    Share.share({
      message: `${currentAdvice.beastName}: ${currentAdvice.text}`,
    });
  };

  const getAdviceId = () => {
    if (!currentAdvice) return null;
    return `${beast.id}_${currentAdvice.text}`;
  };

  const isCurrentSaved = () => {
    const id = getAdviceId();
    return id ? savedIds.has(id) : false;
  };

  const handleToggleSave = async () => {
    if (!currentAdvice) return;
    const id = getAdviceId();
    const alreadySaved = savedIds.has(id);

    let nextList;
    if (alreadySaved) {
      nextList = savedList.filter(item => item.id !== id);
    } else {
      nextList = [
        ...savedList,
        {
          id,
          beastName: currentAdvice.beastName,
          text: currentAdvice.text,
        },
      ];
    }
    setSavedList(nextList);
    setSavedIds(new Set(nextList.map(i => i.id)));
    try {
      await AsyncStorage.setItem(SAVED_ADVICE_KEY, JSON.stringify(nextList));
    } catch (_) {
      setSavedList(savedList);
      setSavedIds(new Set(savedList.map(i => i.id)));
    }
  };

  const renderHeader = () => (
    <View style={s.headerRow}>
      <LinearGradient colors={['#79080A', '#DF0F12']} style={s.headerPill}>
        <View style={s.headerTitleRow}>
          <TouchableOpacity
            style={s.headerBackWrap}
            activeOpacity={0.85}
            onPress={() =>
              phase === 'advice' ? setPhase('browse') : navigation.goBack()
            }
          >
            <Image source={require('../TotemAssets/i/back.png')} />
          </TouchableOpacity>
          <Text style={s.headerTitleText}>Beast's advice</Text>
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

  const renderBrowse = () => (
    <>
      <View style={s.beastImageWrap}>
        <Image source={beast.image} style={s.beastImage} />
      </View>

      <LinearGradient colors={['#FBDFBC', '#FAC57F']} style={s.card}>
        <View style={{ padding: width * 0.053, paddingTop: height * 0.015 }}>
          <Text style={s.cardTitle}>{beast.name}</Text>
          <Text style={s.cardTrait}>{beast.trait}</Text>
          <Text style={s.cardDescription}>{beast.description}</Text>
          <View style={s.dotsRow}>
            {BEASTS.map((_, i) => (
              <View
                key={i}
                style={[s.dot, i === currentIndex && s.dotActive]}
              />
            ))}
          </View>
        </View>
      </LinearGradient>

      <View style={s.navRow}>
        {currentIndex > 0 ? (
          <TouchableOpacity
            style={s.navButtonWrap}
            activeOpacity={0.85}
            onPress={handlePrev}
          >
            <LinearGradient colors={['#79080A', '#DF0F12']} style={s.navButton}>
              <Image source={require('../TotemAssets/i/prevArr.png')} />
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View style={s.navButtonPlaceholder} />
        )}

        <TouchableOpacity
          style={s.chooseButtonWrap}
          activeOpacity={0.85}
          onPress={handleChoose}
        >
          <LinearGradient
            colors={['#79080A', '#DF0F12']}
            style={s.chooseButton}
          >
            <Text style={s.chooseButtonText}>Choose</Text>
          </LinearGradient>
        </TouchableOpacity>

        {currentIndex < BEASTS.length - 1 ? (
          <TouchableOpacity
            style={s.navButtonWrap}
            activeOpacity={0.85}
            onPress={handleNext}
          >
            <LinearGradient colors={['#79080A', '#DF0F12']} style={s.navButton}>
              <Image source={require('../TotemAssets/i/nextArr.png')} />
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View style={s.navButtonPlaceholder} />
        )}
      </View>
    </>
  );

  const renderAdvice = () => (
    <>
      <View style={s.beastImageWrap}>
        <Image source={beast.image} style={s.beastImage} />
      </View>

      <LinearGradient colors={['#FBDFBC', '#FAC57F']} style={s.card}>
        <View style={{ padding: width * 0.053, paddingBottom: height * 0.062 }}>
          <Text style={s.adviceCardTitle}>Advice from {beast.name}</Text>
          <Text style={s.adviceCardText}>{currentAdvice?.text}</Text>
        </View>
      </LinearGradient>

      <View style={s.adviceActionsRow}>
        <TouchableOpacity
          style={s.shareButtonWrap}
          activeOpacity={0.85}
          onPress={handleShare}
        >
          <LinearGradient colors={['#79080A', '#DF0F12']} style={s.shareButton}>
            <Text style={s.shareButtonText}>Share</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={s.saveButtonWrap}
          activeOpacity={0.85}
          onPress={handleToggleSave}
        >
          <LinearGradient
            colors={
              isCurrentSaved() ? ['#8E3A3A', '#B05050'] : ['#79080A', '#DF0F12']
            }
            style={s.saveButton}
          >
            {isCurrentSaved() ? (
              <Image source={require('../TotemAssets/i/savedic.png')} />
            ) : (
              <Image source={require('../TotemAssets/i/save.png')} />
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <TottmLayout>
      <View style={[s.container, { paddingTop: height * 0.06 }]}>
        {renderHeader()}
        {phase === 'browse' ? renderBrowse() : renderAdvice()}
      </View>
    </TottmLayout>
  );
};

export default BeastsAdviceScreen;
