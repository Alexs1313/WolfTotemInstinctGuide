import React, { useMemo } from 'react';
import { Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TottmLayout from '../TotemInstinctComponents/TottmLayout';
import { useNavigation } from '@react-navigation/native';

const REF_WIDTH = 375;
const REF_HEIGHT = 812;

const HomeTotemScreen = () => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const rw = width / REF_WIDTH;
  const rh = height / REF_HEIGHT;
  const rs = Math.min(rw, rh);
  const s = useMemo(
    () => ({
      homeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: width * 0.053,
      },
      homeImageFrame: { alignItems: 'center' },
      homePrimaryButtonWrap: {
        width: '100%',
        marginTop: height * 0.032,
        alignItems: 'center',
      },
      homePrimaryButton: {
        width: '95%',
        height: height * 0.099,
        borderRadius: width * 0.059,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FAC57F',
      },
      homePrimaryText: {
        color: '#FAC57F',
        fontSize: Math.round(22 * rs),
        fontFamily: 'Ubuntu-Bold',
      },
      homeSecondaryButtonWrap: {
        width: '100%',
        marginTop: height * 0.017,
        alignItems: 'center',
      },
      homeSecondaryButton: {
        width: '86%',
        height: height * 0.091,
        borderRadius: width * 0.053,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#79080A',
      },
      homeSecondaryText: {
        color: '#79080A',
        fontSize: Math.round(18 * rs),
        fontFamily: 'Ubuntu-Bold',
        textAlign: 'center',
      },
      homeBottomRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: height * 0.025,
      },
      homeIconButtonWrap: { marginHorizontal: width * 0.032 },
      homeIconButton: {
        width: Math.max(width * 0.17, 56),
        height: Math.max(width * 0.17, 56),
        borderRadius: width * 0.043,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#79080A',
      },
    }),
    [width, height, rs],
  );
  return (
    <TottmLayout>
      <View style={[s.homeContainer, { paddingTop: height * 0.06 }]}>
        <View style={s.homeImageFrame}>
          <Image source={require('../TotemAssets/i/homelog.png')} />
        </View>

        <TouchableOpacity
          style={s.homePrimaryButtonWrap}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('ChooseModeScreen')}
        >
          <LinearGradient
            colors={['#79080A', '#DF0F12']}
            style={s.homePrimaryButton}
          >
            <Text style={s.homePrimaryText}>Totem beast</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={s.homeSecondaryButtonWrap}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('BeastsAdviceScreen')}
        >
          <LinearGradient
            colors={['#FBDFBC', '#FAC57F']}
            style={s.homeSecondaryButton}
          >
            <Text style={s.homeSecondaryText}>Beast's advice</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={s.homeSecondaryButtonWrap}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('RiddlesScreen')}
        >
          <LinearGradient
            colors={['#FBDFBC', '#FAC57F']}
            style={s.homeSecondaryButton}
          >
            <Text style={s.homeSecondaryText}>Riddles of the beast</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={s.homeBottomRow}>
          <TouchableOpacity
            style={s.homeIconButtonWrap}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('SavedAdvicesScreen')}
          >
            <LinearGradient
              colors={['#FBDFBC', '#FAC57F']}
              style={s.homeIconButton}
            >
              <Image source={require('../TotemAssets/i/saved.png')} />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={s.homeIconButtonWrap}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('CollectionScreen')}
          >
            <LinearGradient
              colors={['#FBDFBC', '#FAC57F']}
              style={s.homeIconButton}
            >
              <Image source={require('../TotemAssets/i/coll.png')} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </TottmLayout>
  );
};

export default HomeTotemScreen;
