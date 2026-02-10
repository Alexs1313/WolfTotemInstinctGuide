import { createStackNavigator } from '@react-navigation/stack';

import WelcomeGuideScreen from '../TotemInstinctScrns/WelcomeGuideScreen';
import HomeTotemScreen from '../TotemInstinctScrns/HomeTotemScreen';
import TotemGuideSpnr from '../TotemInstinctComponents/TotemGuideSpnr';
import ChooseModeScreen from '../TotemInstinctScrns/ChooseModeScreen';
import VoiceModeScreen from '../TotemInstinctScrns/VoiceModeScreen';
import PhotoModeScreen from '../TotemInstinctScrns/PhotoModeScreen';
import BeastsAdviceScreen from '../TotemInstinctScrns/BeastsAdviceScreen';
import SavedAdvicesScreen from '../TotemInstinctScrns/SavedAdvicesScreen';
import RiddlesScreen from '../TotemInstinctScrns/RiddlesScreen';
import CollectionScreen from '../TotemInstinctScrns/CollectionScreen';

const Stack = createStackNavigator();

// stack  screens

const TotemStackRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TotemGuideSpnr" component={TotemGuideSpnr} />
      <Stack.Screen name="HomeTotemScreen" component={HomeTotemScreen} />
      <Stack.Screen name="WelcomeGuideScreen" component={WelcomeGuideScreen} />
      <Stack.Screen name="ChooseModeScreen" component={ChooseModeScreen} />
      <Stack.Screen name="VoiceModeScreen" component={VoiceModeScreen} />
      <Stack.Screen name="PhotoModeScreen" component={PhotoModeScreen} />
      <Stack.Screen name="BeastsAdviceScreen" component={BeastsAdviceScreen} />
      <Stack.Screen name="SavedAdvicesScreen" component={SavedAdvicesScreen} />
      <Stack.Screen name="RiddlesScreen" component={RiddlesScreen} />
      <Stack.Screen name="CollectionScreen" component={CollectionScreen} />
    </Stack.Navigator>
  );
};

export default TotemStackRoutes;
