import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Image,
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

import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { captureRef } from 'react-native-view-shot';

const REF_WIDTH = 375;
const REF_HEIGHT = 812;

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

const CollectionScreen = ({ navigation }) => {
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
      container: { flex: 1, padding: width * 0.04 },
      headerRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: height * 0.042,
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
      headerBackWrap: { marginRight: width * 0.053 },
      headerTitleText: {
        color: '#FAC57F',
        fontSize: Math.round(20 * rs),
        fontFamily: 'Ubuntu-Bold',
      },
      headerThumbWrap: {
        width: headerThumbSize,
        height: headerThumbSize,
        overflow: 'hidden',
      },
      headerThumbImage: { width: '100%', height: '100%' },
      emptyCard: {
        width: '85%',
        borderRadius: width * 0.059,
        borderWidth: 1,
        borderColor: '#79080A',
        alignItems: 'center',
        justifyContent: 'center',
      },
      emptyPadding: { padding: height * 0.025 },
      emptyText: {
        color: '#79080A',
        fontSize: Math.round(18 * rs),
        fontFamily: 'Ubuntu-Bold',
        textAlign: 'center',
      },
      scroll: { flex: 1 },
      scrollContent: { paddingBottom: height * 0.049 },
      grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.011,
      },
      tileWrap: {
        width: '48%',
        marginBottom: height * 0.02,
        borderRadius: width * 0.053,
        borderWidth: 2,
        borderColor: '#79080A',
        overflow: 'hidden',
      },
      tileImageWrap: { width: '100%', aspectRatio: 9 / 15 },
      tileImage: { width: '100%', height: '100%' },
      tileActions: {
        flexDirection: 'row',
        gap: width * 0.021,
        justifyContent: 'center',
        zIndex: 1000,
      },
      tileBtnWrap: {
        flex: 0,
        position: 'absolute',
        alignSelf: 'center',
        bottom: height * 0.012,
      },
      tileBtn: {
        width: Math.max(width * 0.128, 44),
        height: Math.max(width * 0.128, 44),
        borderRadius: width * 0.037,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.8,
        borderColor: '#FAC57F',
      },
      captureWrap: {
        position: 'absolute',
        left: -9999,
        top: 0,
        width: 1080,
        height: 1920,
      },
      captureImage: { width: 1080, height: 1920 },
    };
  }, [width, height, rs]);
  const [unlockedCount, setUnlockedCount] = useState(0);
  const [captureIndex, setCaptureIndex] = useState(null);

  const imageRef = useRef(null);

  const loadCount = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(WALLPAPER_WIN_COUNT_KEY);
      const n = Math.min(parseInt(raw || '0', 10), WALLPAPER_COUNT);
      setUnlockedCount(n);
    } catch (_) {
      setUnlockedCount(0);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCount();
    }, [loadCount]),
  );

  const handleShare = index => {
    Share.share({
      message: `Wallpaper ${
        index + 1
      }/${WALLPAPER_COUNT} from Totem Beast Collection!`,
    });
  };

  const handleDownload = index => {
    setCaptureIndex(index);
  };

  const shareImageOrchardWoods = async () => {
    try {
      const tmpUriOrchardWoods = await captureRef(imageRef, {
        format: 'png',
        quality: 1,
        result: 'tmpfile',
      });

      const fileUriOrchardWoods = tmpUriOrchardWoods.startsWith('file://')
        ? tmpUriOrchardWoods
        : 'file://' + tmpUriOrchardWoods;

      const pathToCheckOrchardWoods = fileUriOrchardWoods.replace(
        'file://',
        '',
      );
      const existsOrchardWoods = await RNFS.exists(pathToCheckOrchardWoods);
      if (!existsOrchardWoods) return;

      await Share.open({
        url: fileUriOrchardWoods,
        type: 'image/png',
        failOnCancel: false,
      });
    } catch (error) {
      if (!error?.message?.includes('User did not share')) {
        console.error('shareWallpaper error', error);
      }
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
          <Text style={s.headerTitleText}>Collection</Text>
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
          <Text style={s.emptyText}>You don't have any wallpaper...</Text>
        </View>
      </LinearGradient>
    </View>
  );

  const renderGrid = () => {
    const list = [];
    for (let i = 0; i < unlockedCount; i++) {
      list.push(
        <View key={i} style={s.tileWrap}>
          <View style={s.tileImageWrap}>
            <Image
              source={WALLPAPERS[i]}
              style={s.tileImage}
              ref={imageRef}
              resizeMode="cover"
            />
          </View>
          <View style={s.tileActions}>
            <TouchableOpacity
              style={s.tileBtnWrap}
              activeOpacity={0.85}
              onPress={() => shareImageOrchardWoods()}
            >
              <LinearGradient colors={['#79080A', '#DF0F12']} style={s.tileBtn}>
                <Image source={require('../TotemAssets/i/shr.png')} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>,
      );
    }
    return (
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.grid}>{list}</View>
      </ScrollView>
    );
  };

  return (
    <TottmLayout>
      <View style={[s.container, { paddingTop: height * 0.06 }]}>
        {renderHeader()}
        {unlockedCount === 0 ? renderEmpty() : renderGrid()}
        {captureIndex !== null && (
          <View style={s.captureWrap} pointerEvents="none">
            <Image
              source={WALLPAPERS[captureIndex]}
              style={s.captureImage}
              resizeMode="contain"
              ref={imageRef}
            />
          </View>
        )}
      </View>
    </TottmLayout>
  );
};

export default CollectionScreen;
