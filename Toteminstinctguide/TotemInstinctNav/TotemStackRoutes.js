import AttentionGameScreen from '../[Toteminstinctscrns]/AttentionGameScreen';
import CollectionScreen from '../[Toteminstinctscrns]/CollectionScreen';
import BottomTabs from '../../BottomTabs';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeGuideScreen from '../[Toteminstinctscrns]/WelcomeGuideScreen';

import TotemGuideSpnr from '../[Toteminstinctcompts]/TotemGuideSpnr';
import ChooseModeScreen from '../[Toteminstinctscrns]/ChooseModeScreen';
import VoiceModeScreen from '../[Toteminstinctscrns]/VoiceModeScreen';

import PhotoModeScreen from '../[Toteminstinctscrns]/PhotoModeScreen';
import BeastsAdviceScreen from '../[Toteminstinctscrns]/BeastsAdviceScreen';
import BeastsAdviceResultScreen from '../[Toteminstinctscrns]/BeastsAdviceResultScreen';
import SavedAdvicesScreen from '../[Toteminstinctscrns]/SavedAdvicesScreen';
import RiddlesScreen from '../[Toteminstinctscrns]/RiddlesScreen';
import RiddlesGameScreen from '../[Toteminstinctscrns]/RiddlesGameScreen';

const Stack = createStackNavigator();

const TotemStackRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TotemGuideSpnr" component={TotemGuideSpnr} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="WelcomeGuideScreen" component={WelcomeGuideScreen} />
      <Stack.Screen name="ChooseModeScreen" component={ChooseModeScreen} />
      <Stack.Screen name="VoiceModeScreen" component={VoiceModeScreen} />
      <Stack.Screen name="PhotoModeScreen" component={PhotoModeScreen} />
      <Stack.Screen name="BeastsAdviceScreen" component={BeastsAdviceScreen} />
      <Stack.Screen
        name="BeastsAdviceResultScreen"
        component={BeastsAdviceResultScreen}
      />
      <Stack.Screen name="SavedAdvicesScreen" component={SavedAdvicesScreen} />
      <Stack.Screen name="RiddlesScreen" component={RiddlesScreen} />
      <Stack.Screen name="RiddlesGameScreen" component={RiddlesGameScreen} />
      <Stack.Screen
        name="AttentionGameScreen"
        component={AttentionGameScreen}
      />
      <Stack.Screen name="CollectionScreen" component={CollectionScreen} />
    </Stack.Navigator>
  );
};

export default TotemStackRoutes;
