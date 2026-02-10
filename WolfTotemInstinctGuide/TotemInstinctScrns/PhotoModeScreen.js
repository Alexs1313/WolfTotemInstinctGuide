import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  Share,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
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

const ATTRIBUTES = [
  { id: 'kind', label: 'Kind', icon: '😊' },
  { id: 'dominant', label: 'Dominant', icon: '🐺' },
  { id: 'loyal', label: 'Loyal', icon: '🤝' },
  { id: 'swift', label: 'Swift', icon: '⚡' },
  { id: 'silent', label: 'Silent', icon: '👁' },
  { id: 'strong', label: 'Strong', icon: '🦏' },
];

const getRandomAnimal = () => {
  const index = Math.floor(Math.random() * TOTEM_ANIMALS.length);
  return TOTEM_ANIMALS[index];
};

const PhotoModeScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const rw = width / REF_WIDTH;
  const rh = height / REF_HEIGHT;
  const rs = Math.min(rw, rh);
  const s = useMemo(() => {
    const headerThumbSize = Math.min(
      Math.max(width * 0.235, 72),
      height * 0.108,
    );
    return {
      photoContainer: { flex: 1, padding: width * 0.04, alignItems: 'center' },
      photoTopRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: height * 0.037,
      },
      photoTitlePill: {
        flex: 1,
        marginRight: 10,
        borderRadius: width * 0.053,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FAC57F',
        minHeight: height * 0.108,
      },
      photoTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: width * 0.027,
      },
      photoBackWrap: { marginRight: width * 0.053 },
      photoTitleText: {
        color: '#FAC57F',
        fontSize: Math.round(20 * rs),
        fontFamily: 'Ubuntu-Bold',
      },
      photoThumbWrap: {
        width: headerThumbSize,
        height: headerThumbSize,
        overflow: 'hidden',
      },
      photoThumbImage: { width: '100%', height: '100%' },
      photoCard: {
        width: '100%',
        alignSelf: 'center',
        borderRadius: width * 0.059,
        borderWidth: 1,
        borderColor: '#79080A',
        alignItems: 'center',
        marginBottom: height * 0.025,
      },
      photoCardW88: { width: '88%' },
      photoUploadArea: {
        width: '90%',
        minHeight: height * 0.37,
        borderRadius: width * 0.053,
        alignItems: 'center',
        justifyContent: 'center',
        padding: width * 0.064,
      },
      photoAddIconWrap: { position: 'relative', marginBottom: height * 0.015 },
      photoAddLabel: {
        color: '#000',
        fontSize: Math.round(20 * rs),
        fontFamily: 'Ubuntu-Medium',
      },
      photoPreview: {
        width: '100%',
        height: height * 0.27,
        borderRadius: width * 0.043,
      },
      photoAttributeHeader: {
        width: '100%',
        paddingTop: width * 0.043,
        paddingHorizontal: width * 0.043,
      },
      photoAttributeTitle: {
        color: '#79080A',
        fontSize: Math.round(16 * rs),
        fontFamily: 'Ubuntu-Bold',
        marginBottom: height * 0.026,
        textAlign: 'center',
      },
      photoAttributeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: width * 0.032,
        paddingTop: width * 0.011,
      },
      photoAttributeWrap: { width: '30%', marginBottom: height * 0.012 },
      photoAttributeButton: {
        borderRadius: width * 0.027,
        borderWidth: 1,
        borderColor: '#79080A',
      },
      photoAttributeRow: {
        padding: width * 0.027,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: width * 0.011,
      },
      photoAttributeIcon: { fontSize: Math.round(24 * rs) },
      photoAttributeLabel: {
        color: '#79080A',
        fontSize: Math.round(12 * rs),
        fontFamily: 'Ubuntu-Bold',
      },
      photoActionWrap: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: height * 0.062,
        width: '100%',
      },
      photoActionTouch: { width: '90%' },
      photoActionButton: {
        width: '100%',
        height: height * 0.084,
        borderRadius: width * 0.064,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FAC57F',
      },
      photoActionText: {
        color: '#FAC57F',
        fontSize: Math.round(20 * rs),
        fontFamily: 'Ubuntu-Bold',
      },
      photoStatusWrap: {
        width: '100%',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
      },
      photoStatusBadge: {
        width: '80%',
        borderRadius: width * 0.053,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#79080A',
      },
      photoStatusPadding: {
        padding: height * 0.025,
        paddingHorizontal: width * 0.043,
      },
      photoStatusText: {
        color: '#79080A',
        fontSize: Math.round(18 * rs),
        fontFamily: 'Ubuntu-Bold',
        textAlign: 'center',
      },
      resultImageWrap: {
        width: '100%',
        alignItems: 'center',
        marginBottom: height * 0.022,
      },
      resultCard: {
        width: '95%',
        alignSelf: 'center',
        borderRadius: width * 0.059,
        borderWidth: 1,
        borderColor: '#79080A',
        alignItems: 'center',
      },
      resultCardPadding: {
        padding: height * 0.025,
        paddingHorizontal: width * 0.043,
      },
      resultCardTitle: {
        color: '#79080A',
        fontSize: Math.round(32 * rs),
        fontFamily: 'Ubuntu-Bold',
        textAlign: 'center',
        marginBottom: height * 0.012,
      },
      resultCardSubtitle: {
        color: '#79080A',
        fontSize: Math.round(15 * rs),
        fontFamily: 'Ubuntu-Regular',
        textAlign: 'center',
        marginTop: height * 0.007,
      },
      resultCardDescription: {
        color: '#000',
        fontSize: Math.round(15 * rs),
        fontFamily: 'Ubuntu-Regular',
        textAlign: 'center',
        marginTop: height * 0.015,
        lineHeight: Math.round(20 * rs),
      },
      resultShareWrap: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: height * 0.062,
        width: '100%',
        marginTop: 20,
      },
      resultShareTouch: { width: '90%' },
      resultShareButton: {
        width: '100%',
        height: height * 0.084,
        borderRadius: width * 0.064,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FAC57F',
      },
      resultShareText: {
        color: '#FAC57F',
        fontSize: Math.round(20 * rs),
        fontFamily: 'Ubuntu-Bold',
      },
    };
  }, [width, height, rs]);
  const [phase, setPhase] = useState('addPhoto');
  const [photoUri, setPhotoUri] = useState(null);
  const [selectedAttributeIds, setSelectedAttributeIds] = useState([]);
  const [animal, setAnimal] = useState(null);
  const processingRef = useRef(null);

  useEffect(() => {
    if (phase !== 'processing') {
      return;
    }
    processingRef.current = setTimeout(() => {
      setAnimal(getRandomAnimal());
      setPhase('result');
    }, 2500);
    return () => {
      if (processingRef.current) {
        clearTimeout(processingRef.current);
        processingRef.current = null;
      }
    };
  }, [phase]);

  const handleAddPhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        selectionLimit: 1,
      },
      res => {
        if (res.didCancel || !res.assets?.length) {
          return;
        }
        const uri = res.assets[0].uri;
        setPhotoUri(uri);
      },
    );
  };

  const toggleAttribute = id => {
    setSelectedAttributeIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    );
  };

  const handleChoose = () => {
    if (!photoUri || selectedAttributeIds.length === 0) {
      return;
    }
    setPhase('processing');
  };

  const handleShareTotemAnimal = () => {
    if (!animal) return;
    Share.share({
      message: `I found my totem animal: ${animal.name}\n${animal.description}`,
    });
  };

  const renderAddPhoto = () => (
    <>
      <LinearGradient
        colors={['#FBDFBC', '#FAC57F']}
        style={[s.photoCard, s.photoCardW88]}
      >
        <TouchableOpacity
          style={s.photoUploadArea}
          activeOpacity={0.85}
          onPress={handleAddPhoto}
        >
          {photoUri ? (
            <Image
              source={{ uri: photoUri }}
              style={s.photoPreview}
              resizeMode="cover"
            />
          ) : (
            <>
              <View style={s.photoAddIconWrap}>
                <Image source={require('../TotemAssets/i/addImg.png')} />
              </View>
              <Text style={s.photoAddLabel}>Add your photo</Text>
            </>
          )}
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient colors={['#FBDFBC', '#FAC57F']} style={s.photoCard}>
        <View style={s.photoAttributeHeader}>
          <Text style={s.photoAttributeTitle}>Choose something about you</Text>
        </View>
        <View style={s.photoAttributeGrid}>
          {ATTRIBUTES.map(attr => {
            const isSelected = selectedAttributeIds.includes(attr.id);
            return (
              <TouchableOpacity
                key={attr.id}
                style={s.photoAttributeWrap}
                activeOpacity={0.85}
                onPress={() => toggleAttribute(attr.id)}
              >
                <LinearGradient
                  colors={
                    isSelected ? ['#79080A', '#DF0F12'] : ['#FBDFBC', '#FAC57F']
                  }
                  style={s.photoAttributeButton}
                >
                  <View style={s.photoAttributeRow}>
                    <Text style={s.photoAttributeIcon}>{attr.icon}</Text>
                    <Text
                      style={[
                        s.photoAttributeLabel,
                        isSelected && { color: '#FAC57F' },
                      ]}
                    >
                      {attr.label}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>

      {photoUri && selectedAttributeIds.length > 0 && (
        <View style={s.photoActionWrap}>
          <TouchableOpacity
            style={s.photoActionTouch}
            activeOpacity={0.85}
            onPress={handleChoose}
            disabled={!photoUri || selectedAttributeIds.length === 0}
          >
            <LinearGradient
              colors={
                photoUri && selectedAttributeIds.length > 0
                  ? ['#79080A', '#DF0F12']
                  : ['#8E3A3A', '#B05050']
              }
              style={s.photoActionButton}
            >
              <Text style={s.photoActionText}>Choose</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </>
  );

  const renderProcessing = () => (
    <>
      <View style={s.photoStatusWrap}>
        <LinearGradient
          colors={['#FBDFBC', '#FAC57F']}
          style={s.photoStatusBadge}
        >
          <View style={s.photoStatusPadding}>
            <Text style={s.photoStatusText}>
              Please wait... Preparing results
            </Text>
          </View>
        </LinearGradient>
      </View>
    </>
  );

  const renderResult = () => {
    if (!animal) return null;
    return (
      <>
        <View style={s.resultImageWrap}>
          <Image source={animal.image} />
        </View>

        <LinearGradient colors={['#FBDFBC', '#FAC57F']} style={s.resultCard}>
          <View style={s.resultCardPadding}>
            <Text style={s.resultCardTitle}>{animal.name}</Text>
            <Text style={s.resultCardSubtitle}>{animal.subtitle}</Text>
            <Text style={s.resultCardDescription}>{animal.description}</Text>
          </View>
        </LinearGradient>

        <View style={s.resultShareWrap}>
          <TouchableOpacity
            style={s.resultShareTouch}
            activeOpacity={0.85}
            onPress={handleShareTotemAnimal}
          >
            <LinearGradient
              colors={['#79080A', '#DF0F12']}
              style={s.resultShareButton}
            >
              <Text style={s.resultShareText}>Share</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <TottmLayout>
      <View style={[s.photoContainer, { paddingTop: height * 0.06 }]}>
        <View style={s.photoTopRow}>
          <LinearGradient
            colors={['#79080A', '#DF0F12']}
            style={s.photoTitlePill}
          >
            <View style={s.photoTitleRow}>
              <TouchableOpacity
                style={s.photoBackWrap}
                activeOpacity={0.85}
                onPress={() => navigation.goBack()}
              >
                <Image source={require('../TotemAssets/i/back.png')} />
              </TouchableOpacity>
              <Text style={s.photoTitleText}>Totem beast</Text>
            </View>
          </LinearGradient>

          <View style={s.photoThumbWrap}>
            <Image
              source={require('../TotemAssets/i/apphead.png')}
              style={s.photoThumbImage}
            />
          </View>
        </View>

        {phase === 'addPhoto' && renderAddPhoto()}
        {phase === 'processing' && renderProcessing()}
        {phase === 'result' && renderResult()}
      </View>
    </TottmLayout>
  );
};

export default PhotoModeScreen;
