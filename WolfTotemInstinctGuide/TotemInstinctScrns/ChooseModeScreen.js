import React, { useMemo, useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TottmLayout from '../TotemInstinctComponents/TottmLayout';

const REF_WIDTH = 375;
const REF_HEIGHT = 812;

const ChooseModeScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const [mode, setMode] = useState('');
  const rw = width / REF_WIDTH;
  const rh = height / REF_HEIGHT;
  const rs = Math.min(rw, rh);
  const s = useMemo(
    () => ({
      chooseContainer: { flex: 1, padding: width * 0.04, alignItems: 'center' },
      chooseTopRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: height * 0.037,
      },
      chooseTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: width * 0.027,
      },
      chooseBackWrap: { marginRight: width * 0.053 },
      chooseTitlePill: {
        flex: 1,
        marginRight: 10,
        borderRadius: width * 0.053,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FAC57F',
        minHeight: height * 0.108,
      },
      chooseTitleText: {
        color: '#FAC57F',
        fontSize: Math.round(20 * rs),
        fontFamily: 'Ubuntu-Bold',
      },
      chooseThumbWrap: {
        width: Math.min(width * 0.235, height * 0.108),
        height: Math.min(width * 0.235, height * 0.108),
        overflow: 'hidden',
      },
      chooseThumbImage: { width: '100%', height: '100%' },
      chooseHint: {
        width: '70%',
        height: height * 0.086,
        borderRadius: width * 0.048,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#79080A',
        marginBottom: height * 0.032,
        marginTop: height * 0.037,
      },
      chooseHintText: {
        color: '#79080A',
        fontSize: Math.round(19 * rs),
        fontFamily: 'Ubuntu-Bold',
      },
      chooseModeWrap: {
        width: '90%',
        marginBottom: height * 0.006,
        marginTop: height * 0.037,
      },
      chooseModeButton: {
        width: '100%',
        height: height * 0.108,
        borderRadius: width * 0.064,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FAC57F',
      },
      chooseModeText: {
        color: '#FAC57F',
        fontSize: Math.round(20 * rs),
        fontFamily: 'Ubuntu-Bold',
      },
      chooseActionOuter: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: height * 0.074,
        width: '100%',
      },
      chooseActionWrap: { width: '90%', marginTop: height * 0.025 },
      chooseActionButton: {
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
      chooseActionText: {
        color: '#FAC57F',
        fontSize: Math.round(20 * rs),
        fontFamily: 'Ubuntu-Bold',
      },
    }),
    [width, height, rs],
  );

  const handleChoose = () => {
    if (!mode) {
      return;
    }
    if (mode === 'voice') {
      navigation.navigate('VoiceModeScreen');
    }
    if (mode === 'photo') {
      navigation.navigate('PhotoModeScreen');
    }
  };

  return (
    <TottmLayout>
      <View style={[s.chooseContainer, { paddingTop: height * 0.06 }]}>
        <View style={s.chooseTopRow}>
          <LinearGradient
            colors={['#79080A', '#DF0F12']}
            style={s.chooseTitlePill}
          >
            <View style={s.chooseTitleRow}>
              <TouchableOpacity
                style={s.chooseBackWrap}
                activeOpacity={0.85}
                onPress={() => navigation.goBack()}
              >
                <Image source={require('../TotemAssets/i/back.png')} />
              </TouchableOpacity>
              <Text style={s.chooseTitleText}>Totem beast</Text>
            </View>
          </LinearGradient>

          <View style={s.chooseThumbWrap}>
            <Image
              source={require('../TotemAssets/i/apphead.png')}
              style={s.chooseThumbImage}
            />
          </View>
        </View>

        <LinearGradient colors={['#FBDFBC', '#FAC57F']} style={s.chooseHint}>
          <Text style={s.chooseHintText}>Choose a mod</Text>
        </LinearGradient>

        <TouchableOpacity
          style={s.chooseModeWrap}
          activeOpacity={0.85}
          onPress={() => setMode('voice')}
        >
          <LinearGradient
            colors={
              mode === 'voice' ? ['#79080A', '#DF0F12'] : ['#8E3A3A', '#B05050']
            }
            style={s.chooseModeButton}
          >
            <Text style={s.chooseModeText}>Voice mode</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={s.chooseModeWrap}
          activeOpacity={0.85}
          onPress={() => setMode('photo')}
        >
          <LinearGradient
            colors={
              mode === 'photo' ? ['#79080A', '#DF0F12'] : ['#8E3A3A', '#B05050']
            }
            style={s.chooseModeButton}
          >
            <Text style={s.chooseModeText}>Photo mode</Text>
          </LinearGradient>
        </TouchableOpacity>

        {mode && (
          <View style={s.chooseActionOuter}>
            <TouchableOpacity
              style={s.chooseActionWrap}
              activeOpacity={0.85}
              onPress={handleChoose}
            >
              <LinearGradient
                colors={['#79080A', '#DF0F12']}
                style={s.chooseActionButton}
              >
                <Text style={s.chooseActionText}>Choose</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TottmLayout>
  );
};

export default ChooseModeScreen;
