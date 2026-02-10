import { NavigationContainer } from '@react-navigation/native';
import TotemStackRoutes from './WolfTotemInstinctGuide/TotemInstinctNav/TotemStackRoutes';

const App = () => {
  return (
    <NavigationContainer>
      <TotemStackRoutes />
    </NavigationContainer>
  );
};

export default App;
