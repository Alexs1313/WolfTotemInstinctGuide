import React, { useMemo, useState } from 'react';
import { Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TottmLayout from '../TotemInstinctComponents/TottmLayout';

const REF_WIDTH = 375;
const REF_HEIGHT = 812;

const SLIDES = [
  {
    id: 'slide-1',
    image: require('../TotemAssets/i/oboard/1.png'),
    title: 'Find Your Wolf Totem',
    description:
      'Your voice and your look reveal who you truly are. Test your instinct through sound or photo and find the animal that matches your inner nature.',
    buttonText: 'Next',
  },
  {
    id: 'slide-2',
    image: require('../TotemAssets/i/oboard/2.png'),
    title: 'Wisdom & Rewards',
    description:
      'Choose any totem animal and receive advice in its unique style. Solve daily riddles from different animals to unlock exclusive wallpapers and build your personal collection.',
    buttonText: 'Start',
  },
  {
    id: 'slide-3',
    image: require('../TotemAssets/i/oboard/3.png'),
    title: 'Voice or Photo Test',
    description:
      'Roar, growl, or show your expression — or upload a photo and choose what feels closest to you. Our system compares patterns to determine your true totem animal.',
    buttonText: 'Okay',
  },
  {
    id: 'slide-4',
    title: 'Importantly!!!',
    description:
      'The app does not use your data or files for its own use. All data is for your use and your use of this app only.',
    buttonText: 'Start',
    isImportant: true,
  },
];

const WelcomeGuideScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const rw = width / REF_WIDTH;
  const rh = height / REF_HEIGHT;
  const rs = Math.min(rw, rh);
  const s = useMemo(
    () => ({
      welcomeSlide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: width * 0.053,
      },
      welcomeImage: {
        width: width * 0.917,
        height: width * 0.917,
        maxWidth: 344,
        maxHeight: 344,
      },
      welcomeGradientBoard: {
        width: '100%',
        borderRadius: width * 0.059,
        borderWidth: 1,
        borderColor: '#79080A',
        marginTop: height * 0.037,
        marginBottom: height * 0.062,
      },
      welcomeGradientBoardSolo: {
        marginTop: height * 0.012,
        marginBottom: height * 0.037,
      },
      welcomeTextBox: { padding: width * 0.08 },
      welcomeTotemTitle: {
        fontSize: Math.round(22 * rs),
        fontWeight: 'bold',
        color: '#79080A',
        fontFamily: 'Ubuntu-Bold',
        textAlign: 'center',
      },
      welcomeTotemTitleLarge: { fontSize: Math.round(32 * rs) },
      welcomeTotemDescription: {
        fontSize: Math.round(15 * rs),
        color: '#000',
        fontFamily: 'Ubuntu-Medium',
        textAlign: 'center',
        marginTop: height * 0.012,
        lineHeight: Math.round(20 * rs),
      },
      welcomeTotemDescriptionLarge: { fontSize: Math.round(18 * rs) },
      welcomeAgreeRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.012,
      },
      welcomeCheckbox: {
        width: Math.min(width * 0.21, 79),
        height: Math.min(width * 0.21, 79),
        borderRadius: width * 0.059,
        borderWidth: 2,
        borderColor: '#79080A',
        backgroundColor: '#FBDFBC',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: width * 0.032,
        opacity: 0.9,
      },
      welcomeCheckboxChecked: { backgroundColor: '#FAC57F' },
      welcomeCheckboxMark: {
        color: '#79080A',
        fontSize: Math.round(22 * rs),
        fontFamily: 'Ubuntu-Bold',
      },
      welcomeAgreeTextBox: {
        flex: 1,
        borderRadius: width * 0.04,
        borderWidth: 1,
        borderColor: '#79080A',
        minHeight: height * 0.099,
        justifyContent: 'center',
        alignItems: 'center',
      },
      welcomeAgreePadding: { padding: width * 0.035 },
      welcomeAgreeText: {
        color: '#000',
        fontSize: Math.round(16 * rs),
        fontFamily: 'Ubuntu-Medium',
      },
      welcomeButton: {
        height: height * 0.086,
        borderRadius: width * 0.067,
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FAC57F',
      },
      welcomeButtonText: {
        color: '#FAC57F',
        fontSize: Math.round(24 * rs),
        fontFamily: 'Ubuntu-Bold',
        textAlign: 'center',
      },
      welcomeButtonContainer: {
        width: '90%',
        marginTop: height * 0.006,
        alignItems: 'center',
        justifyContent: 'center',
      },
      welcomeButtonContainerLast: { marginTop: height * 0.111 },
    }),
    [width, height, rs],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [agreed, setAgreed] = useState(false);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      setCurrentIndex(prev => prev + 1);
      return;
    }
    navigation.navigate('HomeTotemScreen');
  };

  const handlePrimaryPress = () => {
    const currentSlide = SLIDES[currentIndex];
    if (currentSlide.isImportant) {
      if (agreed) {
        navigation.navigate('HomeTotemScreen');
      }
      return;
    }

    handleNext();
  };

  const currentSlide = SLIDES[currentIndex];

  const renderSlide = item => (
    <View style={s.welcomeSlide}>
      {item.image ? (
        <Image source={item.image} style={s.welcomeImage} resizeMode="cover" />
      ) : null}

      <LinearGradient
        colors={['#FBDFBC', '#FAC57F']}
        style={[s.welcomeGradientBoard, !item.image && s.welcomeGradientBoardSolo]}
      >
        <View style={s.welcomeTextBox}>
          <Text
            style={[s.welcomeTotemTitle, currentIndex === 3 && s.welcomeTotemTitleLarge]}
          >
            {item.title}
          </Text>
          <Text
            style={[
              s.welcomeTotemDescription,
              currentIndex === 3 && s.welcomeTotemDescriptionLarge,
            ]}
          >
            {item.description}
          </Text>
        </View>
      </LinearGradient>

      {item.isImportant ? (
        <TouchableOpacity
          style={s.welcomeAgreeRow}
          activeOpacity={0.85}
          onPress={() => setAgreed(prev => !prev)}
        >
          <View style={[s.welcomeCheckbox, agreed && s.welcomeCheckboxChecked]}>
            {agreed ? (
              <Image
                source={require('../TotemAssets/i/checked.png')}
                style={s.welcomeCheckboxMark}
              />
            ) : null}
          </View>
          <LinearGradient
            colors={['#FBDFBC', '#FAC57F']}
            style={s.welcomeAgreeTextBox}
          >
            <View style={s.welcomeAgreePadding}>
              <Text style={s.welcomeAgreeText}>
                I have read the warning and agree to it.
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        style={[
          s.welcomeButtonContainer,
          currentIndex === 3 && s.welcomeButtonContainerLast,
        ]}
        onPress={handlePrimaryPress}
        disabled={item.isImportant && !agreed}
      >
        <LinearGradient
          colors={
            item.isImportant && !agreed
              ? ['#8E3A3A', '#B05050']
              : ['#79080A', '#DF0F12']
          }
          style={s.welcomeButton}
        >
          <Text style={s.welcomeButtonText}>{item.buttonText}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return <TottmLayout>{renderSlide(currentSlide)}</TottmLayout>;
};

export default WelcomeGuideScreen;
