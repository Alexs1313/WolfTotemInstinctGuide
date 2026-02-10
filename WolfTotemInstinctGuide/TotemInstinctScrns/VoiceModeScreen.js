import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Share,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TottmLayout from '../TotemInstinctComponents/TottmLayout';

const REF_WIDTH = 375;
const REF_HEIGHT = 812;

const TOTEM_ANIMALS = [
  {
    id: 'wolf',
    name: 'Wolf',
    subtitle: 'Leadership & instinct',
    description:
      'The Wolf represents inner strength, loyalty, and intuition. It guides you to trust yourself, act with confidence, and lead your own path.',
    image: require('../TotemAssets/i/wolf.png'),
  },
  {
    id: 'falcon',
    name: 'Falcon',
    subtitle: 'Focus & vision',
    description:
      'The Falcon stands for clarity, speed, and sharp decisions. It helps you see the bigger picture and strike at the right moment.',
    image: require('../TotemAssets/i/falcon.png'),
  },
  {
    id: 'bison',
    name: 'Bison',
    subtitle: 'Power & endurance',
    description:
      'The Bison symbolizes stability, patience, and raw strength. It reminds you to move forward steadily and stay grounded no matter the challenge.',
    image: require('../TotemAssets/i/bison.png'),
  },
  {
    id: 'lynx',
    name: 'Lynx',
    subtitle: 'Awareness & intuition',
    description:
      'The Lynx represents perception, mystery, and precision. It teaches you to notice what others miss and trust subtle signals.',
    image: require('../TotemAssets/i/lynx.png'),
  },
];

const getRandomAnimal = () => {
  const index = Math.floor(Math.random() * TOTEM_ANIMALS.length);
  return TOTEM_ANIMALS[index];
};

const VoiceModeScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const rw = width / REF_WIDTH;
  const rh = height / REF_HEIGHT;
  const rs = Math.min(rw, rh);
  const s = useMemo(() => {
    const headerThumbSize = Math.min(
      Math.max(width * 0.235, 72),
      height * 0.108,
    );
    const micSize = Math.min(width * 0.373, height * 0.22, 180);
    const pulseSize = Math.round(micSize * 0.78);
    return {
      voiceContainer: { flex: 1, padding: width * 0.04, alignItems: 'center' },
      voiceTopRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: height * 0.037,
      },
      voiceTitlePill: {
        flex: 1,
        marginRight: 10,
        borderRadius: width * 0.053,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FAC57F',
        minHeight: height * 0.108,
      },

      voiceTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: width * 0.027,
      },
      voiceBackWrap: { marginRight: width * 0.053 },
      voiceTitleText: {
        color: '#FAC57F',
        fontSize: Math.round(20 * rs),
        fontFamily: 'Ubuntu-Bold',
      },
      voiceThumbWrap: {
        width: headerThumbSize,
        height: headerThumbSize,
        overflow: 'hidden',
      },
      voiceThumbImage: { width: '100%', height: '100%' },
      voiceImageWrap: {
        width: '100%',
        alignItems: 'center',
        marginBottom: height * 0.022,
      },
      voiceCard: {
        width: '100%',
        alignSelf: 'center',
        borderRadius: width * 0.059,
        borderWidth: 1,
        borderColor: '#79080A',
        alignItems: 'center',
      },
      voiceCardPadding: { padding: width * 0.08 },
      voiceCardTitle: {
        color: '#79080A',
        fontSize: Math.round(32 * rs),
        fontFamily: 'Ubuntu-Bold',
        textAlign: 'center',
        marginBottom: height * 0.012,
      },
      voiceCardSubtitle: {
        color: '#79080A',
        fontSize: Math.round(15 * rs),
        fontFamily: 'Ubuntu-Regular',
        textAlign: 'center',
        marginTop: height * 0.007,
      },
      voiceCardDescription: {
        color: '#000',
        fontSize: Math.round(15 * rs),
        fontFamily: 'Ubuntu-Regular',
        textAlign: 'center',
        marginTop: height * 0.015,
        lineHeight: Math.round(20 * rs),
      },
      voiceActionWrap: { width: '90%', marginTop: height * 0.025 },
      voiceActionButton: {
        width: '90%',
        height: height * 0.084,
        borderRadius: width * 0.064,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FAC57F',
        alignSelf: 'center',
        marginTop: height * 0.037,
      },
      voiceActionText: {
        color: '#FAC57F',
        fontSize: Math.round(20 * rs),
        fontFamily: 'Ubuntu-Bold',
      },
      voiceTimerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.025,
        marginBottom: height * 0.037,
        gap: width * 0.013,
      },
      voiceTimerBadge: {
        paddingHorizontal: width * 0.021,
        height: height * 0.086,
        borderRadius: width * 0.048,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#79080A',
        backgroundColor: '#FAC57F',
        width: width * 0.32,
      },
      voiceTimerText: {
        color: '#79080A',
        fontSize: Math.round(20 * rs),
        fontFamily: 'Ubuntu-Bold',
      },
      voiceMicWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: height * 0.03,
        marginTop: height * 0.099,
      },
      voiceMicPulseContainer: {
        width: micSize,
        height: micSize,
        alignItems: 'center',
        justifyContent: 'center',
      },
      voicePulseRing: {
        position: 'absolute',
        width: pulseSize,
        height: pulseSize,
        borderRadius: pulseSize / 2,
        borderWidth: 2,
        borderColor: '#79080A',
      },
      voiceMicOuter: {
        width: pulseSize,
        height: pulseSize,
        borderRadius: pulseSize / 2,
        borderWidth: 2,
        borderColor: '#79080A',
        alignItems: 'center',
        justifyContent: 'center',
      },
      voiceMicInner: {
        width: pulseSize,
        height: pulseSize,
        borderRadius: pulseSize / 2,
        borderWidth: 2,
        borderColor: '#79080A',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAC57F',
      },
      voiceStatusMargin: {
        marginTop: height * 0.099,
        width: '100%',
        alignItems: 'center',
      },
      voiceStatusBadge: {
        width: '80%',
        borderRadius: width * 0.053,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#79080A',
        backgroundColor: '#FBDFBC',
      },
      voiceStatusPadding: {
        padding: height * 0.025,
        paddingHorizontal: width * 0.043,
      },
      voiceStatusText: {
        color: '#79080A',
        fontSize: Math.round(18 * rs),
        fontFamily: 'Ubuntu-Bold',
        textAlign: 'center',
      },
      voiceShareOuter: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: height * 0.062,
        width: '100%',
      },
      voiceShareWrap: { width: '90%', marginTop: height * 0.025 },
      voiceShareButton: {
        width: '90%',
        height: height * 0.084,
        borderRadius: width * 0.064,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FAC57F',
        alignSelf: 'center',
        marginTop: height * 0.037,
      },
      voiceShareText: {
        color: '#FAC57F',
        fontSize: Math.round(20 * rs),
        fontFamily: 'Ubuntu-Bold',
      },
    };
  }, [width, height, rs]);
  const [phase, setPhase] = useState('intro');
  const [secondsLeft, setSecondsLeft] = useState(15);
  const [animal, setAnimal] = useState(null);
  const timerRef = useRef(null);
  const processingRef = useRef(null);
  const pulseAnim1 = useRef(new Animated.Value(0)).current;
  const pulseAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (phase !== 'recording') {
      return;
    }

    setSecondsLeft(15);
    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setPhase('processing');
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
  }, [phase]);

  useEffect(() => {
    if (phase !== 'recording') {
      pulseAnim1.stopAnimation();
      pulseAnim2.stopAnimation();
      pulseAnim1.setValue(0);
      pulseAnim2.setValue(0);
      return;
    }

    const createPulse = (animValue, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 1200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      );

    const pulse1 = createPulse(pulseAnim1, 0);
    const pulse2 = createPulse(pulseAnim2, 600);

    pulse1.start();
    pulse2.start();

    return () => {
      pulse1.stop();
      pulse2.stop();
    };
  }, [phase, pulseAnim1, pulseAnim2]);

  useEffect(() => {
    if (phase !== 'processing') {
      return;
    }

    processingRef.current = setTimeout(() => {
      setAnimal(getRandomAnimal());
      setPhase('result');
    }, 1700);

    return () => {
      if (processingRef.current) {
        clearTimeout(processingRef.current);
        processingRef.current = null;
      }
    };
  }, [phase]);

  const handleStart = () => {
    setPhase('recording');
  };

  const handleShareTotemAnimal = () => {
    Share.share({
      message: `I found my totem animal: ${animal.name} 
${animal.description}`,
    });
  };

  const renderIntro = () => (
    <>
      <View style={s.voiceImageWrap}>
        <Image source={require('../TotemAssets/i/introVoice.png')} />
      </View>

      <LinearGradient colors={['#FBDFBC', '#FAC57F']} style={s.voiceCard}>
        <View style={s.voiceCardPadding}>
          <Text style={s.voiceCardTitle}>Voice mode</Text>
          <Text style={s.voiceCardDescription}>
            Growl, roar, or make animal sounds. The app analyzes your voice to
            find your totem animal.
          </Text>
        </View>
      </LinearGradient>

      <TouchableOpacity
        style={s.voiceActionWrap}
        activeOpacity={0.85}
        onPress={handleStart}
      >
        <LinearGradient
          colors={['#79080A', '#DF0F12']}
          style={s.voiceActionButton}
        >
          <Text style={s.voiceActionText}>Go</Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );

  const renderRecording = () => (
    <>
      <View style={s.voiceTimerRow}>
        <Image source={require('../TotemAssets/i/clock.png')} />
        <View style={s.voiceTimerBadge}>
          <Text style={s.voiceTimerText}>{`00:${String(secondsLeft).padStart(
            2,
            '0',
          )}`}</Text>
        </View>
      </View>

      <View style={s.voiceMicWrap}>
        <View style={s.voiceMicPulseContainer}>
          <Animated.View
            style={[
              s.voicePulseRing,
              {
                transform: [
                  {
                    scale: pulseAnim1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.6],
                    }),
                  },
                ],
                opacity: pulseAnim1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 0],
                }),
              },
            ]}
          />
          <Animated.View
            style={[
              s.voicePulseRing,
              {
                transform: [
                  {
                    scale: pulseAnim2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.6],
                    }),
                  },
                ],
                opacity: pulseAnim2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 0],
                }),
              },
            ]}
          />
          <View style={s.voiceMicOuter}>
            <View style={s.voiceMicInner}>
              <Image source={require('../TotemAssets/i/microphn.png')} />
            </View>
          </View>
        </View>
      </View>

      <View style={s.voiceStatusMargin}>
        <LinearGradient
          colors={['#FBDFBC', '#FAC57F']}
          style={s.voiceStatusBadge}
        >
          <View style={s.voiceStatusPadding}>
            <Text style={s.voiceStatusText}>Voice is being recorded</Text>
          </View>
        </LinearGradient>
      </View>
    </>
  );

  const renderProcessing = () => (
    <>
      <View style={s.voiceTimerRow}>
        <View style={s.voiceTimerRow}>
          <Image source={require('../TotemAssets/i/clock.png')} />
          <View style={s.voiceTimerBadge}>
            <Text style={s.voiceTimerText}>Time is up</Text>
          </View>
        </View>
      </View>

      <View style={s.voiceMicWrap}>
        <View style={s.voiceMicOuter}>
          <View style={s.voiceMicInner}>
            <Image source={require('../TotemAssets/i/microphn.png')} />
          </View>
        </View>
      </View>

      <View style={s.voiceStatusMargin}>
        <LinearGradient
          colors={['#FBDFBC', '#FAC57F']}
          style={s.voiceStatusBadge}
        >
          <View style={s.voiceStatusPadding}>
            <Text style={s.voiceStatusText}>
              Please wait... Preparing results
            </Text>
          </View>
        </LinearGradient>
      </View>
    </>
  );

  const renderResult = () => {
    if (!animal) {
      return null;
    }

    return (
      <>
        <View style={s.voiceImageWrap}>
          <Image source={animal.image} />
        </View>

        <LinearGradient colors={['#FBDFBC', '#FAC57F']} style={s.voiceCard}>
          <View style={s.voiceStatusPadding}>
            <Text style={s.voiceCardTitle}>{animal.name}</Text>
            <Text style={s.voiceCardSubtitle}>{animal.subtitle}</Text>
            <Text style={s.voiceCardDescription}>{animal.description}</Text>
          </View>
        </LinearGradient>

        <View style={s.voiceShareOuter}>
          <TouchableOpacity
            style={s.voiceShareWrap}
            activeOpacity={0.85}
            onPress={handleShareTotemAnimal}
          >
            <LinearGradient
              colors={['#79080A', '#DF0F12']}
              style={s.voiceShareButton}
            >
              <Text style={s.voiceShareText}>Share</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <TottmLayout>
      <View style={[s.voiceContainer, { paddingTop: height * 0.06 }]}>
        <View style={s.voiceTopRow}>
          <LinearGradient
            colors={['#79080A', '#DF0F12']}
            style={s.voiceTitlePill}
          >
            <View style={s.voiceTitleRow}>
              <TouchableOpacity
                style={s.voiceBackWrap}
                activeOpacity={0.85}
                onPress={() => navigation.goBack()}
              >
                <Image source={require('../TotemAssets/i/back.png')} />
              </TouchableOpacity>
              <Text style={s.voiceTitleText}>Totem beast</Text>
            </View>
          </LinearGradient>

          <View style={s.voiceThumbWrap}>
            <Image
              source={require('../TotemAssets/i/apphead.png')}
              style={s.voiceThumbImage}
            />
          </View>
        </View>

        {phase === 'intro' ? renderIntro() : null}
        {phase === 'recording' ? renderRecording() : null}
        {phase === 'processing' ? renderProcessing() : null}
        {phase === 'result' ? renderResult() : null}
      </View>
    </TottmLayout>
  );
};

export default VoiceModeScreen;
