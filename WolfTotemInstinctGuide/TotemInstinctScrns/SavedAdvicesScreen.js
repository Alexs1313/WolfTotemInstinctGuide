import React, { useCallback, useMemo, useState } from 'react';
import {
  Image,
  Share,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import TottmLayout from '../TotemInstinctComponents/TottmLayout';

const REF_WIDTH = 375;
const REF_HEIGHT = 812;
const SAVED_ADVICE_KEY = '@BeastsAdvice_saved';

const BEAST_IMAGES = {
  wolf: require('../TotemAssets/i/wolf.png'),
  bison: require('../TotemAssets/i/bison.png'),
  falcon: require('../TotemAssets/i/falcon.png'),
  lynx: require('../TotemAssets/i/lynx.png'),
};

const getBeastImage = item => {
  const beastId = item.id.split('_')[0];
  return BEAST_IMAGES[beastId] || BEAST_IMAGES.wolf;
};

const SavedAdvicesScreen = ({ navigation }) => {
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
        container: { flex: 1, padding: width * 0.04 },
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
        headerTitleRow: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: width * 0.027,
        },
        headerBackWrap: { marginRight: width * 0.107 },
        headerTitleText: {
          color: '#FAC57F',
          fontSize: Math.round(20 * rs),
          fontFamily: 'Ubuntu-Medium',
        },
        headerThumbWrap: {
          width: headerThumbSize,
          height: headerThumbSize,
          overflow: 'hidden',
        },
        headerThumbImage: { width: '100%', height: '100%' },
        emptyCard: {
          width: '85%',
          alignSelf: 'center',
          borderRadius: width * 0.053,
          borderWidth: 1,
          borderColor: '#79080A',
          minHeight: height * 0.086,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: height * 0.025,
        },
        emptyPadding: { padding: height * 0.025 },
        emptyText: {
          color: '#79080A',
          fontSize: Math.round(18 * rs),
          fontFamily: 'Ubuntu-Bold',
          textAlign: 'center',
        },
        card: {
          width: '95%',
          alignSelf: 'center',
          borderRadius: width * 0.059,
          borderWidth: 1,
          borderColor: '#79080A',
          marginBottom: height * 0.02,
          overflow: 'hidden',
        },
        cardInner: {
          flexDirection: 'row',
          padding: width * 0.032,
        },
        cardImageWrap: {
          width: width * 0.33,
          height: height * 0.19,
          marginRight: width * 0.032,
        },
        cardImage: { width: '100%', height: '100%', borderRadius: width * 0.032 },
        cardContent: {
          flex: 1,
          justifyContent: 'space-between',
          minHeight: height * 0.12,
        },
        cardTitle: {
          color: '#79080A',
          fontSize: Math.round(18 * rs),
          fontFamily: 'Ubuntu-Bold',
          marginBottom: height * 0.005,
        },
        cardText: {
          color: '#000',
          fontSize: Math.round(18 * rs),
          fontFamily: 'Ubuntu-Regular',
          lineHeight: Math.round(20 * rs),
          marginBottom: height * 0.005,
        },
        cardActions: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: width * 0.027,
        },
        shareBtnWrap: { flex: 1 },
        shareBtn: {
          height: height * 0.057,
          borderRadius: width * 0.04,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#FAC57F',
        },
        shareBtnText: {
          color: '#FAC57F',
          fontSize: Math.round(16 * rs),
          fontFamily: 'Ubuntu-Bold',
        },
        deleteBtnWrap: { flex: 0 },
        deleteBtn: {
          width: height * 0.057,
          height: height * 0.057,
          borderRadius: width * 0.04,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#FAC57F',
        },
      };
    },
    [width, height, rs],
  );
  const [list, setList] = useState([]);

  const loadSaved = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(SAVED_ADVICE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setList(Array.isArray(data) ? data : []);
      } else {
        setList([]);
      }
    } catch (_) {
      setList([]);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSaved();
    }, [loadSaved]),
  );

  const handleShare = item => {
    Share.share({
      message: `${item.beastName}: ${item.text}`,
    });
  };

  const handleDelete = async item => {
    const nextList = list.filter(entry => entry.id !== item.id);
    setList(nextList);
    try {
      await AsyncStorage.setItem(SAVED_ADVICE_KEY, JSON.stringify(nextList));
    } catch (_) {
      setList(list);
    }
  };

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
          <Text style={s.headerTitleText}>Saved</Text>
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

  const renderEmpty = () => (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        bottom: height * 0.037,
      }}
    >
      <LinearGradient colors={['#FBDFBC', '#FAC57F']} style={s.emptyCard}>
        <View style={s.emptyPadding}>
          <Text style={s.emptyText}>You have no saved...</Text>
        </View>
      </LinearGradient>
    </View>
  );

  const renderCard = item => (
    <LinearGradient key={item.id} colors={['#FBDFBC', '#FAC57F']} style={s.card}>
      <View style={s.cardInner}>
        <View style={s.cardImageWrap}>
          <Image source={getBeastImage(item)} style={s.cardImage} />
        </View>
        <View style={s.cardContent}>
          <Text style={s.cardTitle}>
            Advice from {item.beastName.toLowerCase()}
          </Text>
          <Text style={s.cardText}>{item.text}</Text>
          <View style={s.cardActions}>
            <TouchableOpacity
              style={s.shareBtnWrap}
              activeOpacity={0.85}
              onPress={() => handleShare(item)}
            >
              <LinearGradient colors={['#79080A', '#DF0F12']} style={s.shareBtn}>
                <Text style={s.shareBtnText}>Share</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={s.deleteBtnWrap}
              activeOpacity={0.85}
              onPress={() => handleDelete(item)}
            >
              <LinearGradient colors={['#79080A', '#DF0F12']} style={s.deleteBtn}>
                <Image source={require('../TotemAssets/i/delete.png')} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <TottmLayout>
      <View style={[s.container, { paddingTop: height * 0.06 }]}>
        {renderHeader()}

        {list.length === 0 ? renderEmpty() : list.map(renderCard)}
      </View>
    </TottmLayout>
  );
};

export default SavedAdvicesScreen;
