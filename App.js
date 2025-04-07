import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

// Screens
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import DashboardScreen from './DashboardScreen';
import ChatScreen from './ChatScreen';
import ProfileScreen from './ProfileScreen';
import ExploreScreen from './ExploreScreen';
import VenueBookingScreen from './VenueBookingScreen';
import VenueDetailScreen from './VenueDetailScreen';
import DatePickingScreen from './DatePickingScreen';
import ConfirmationPage from './ConfirmationPage';
import PaymentMethod from './PaymentMethod';
import PaymentConfirmation from './PaymentConfirmation';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent;

          if (route.name === 'Home') {
            iconComponent = <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
          } else if (route.name === 'Dashboard') {
            iconComponent = <Ionicons name={focused ? 'grid' : 'grid-outline'} size={size} color={color} />;
          } else if (route.name === 'Chat') {
            iconComponent = <Ionicons name={focused ? 'chatbubble' : 'chatbubble-outline'} size={size} color={color} />;
          } else if (route.name === 'Profile') {
            return (
              <View style={[styles.profileAvatar, { backgroundColor: focused ? '#8a56ff' : '#d8d8d8' }]}>
                <Text style={[styles.profileAvatarText, { color: focused ? '#fff' : '#666' }]}>KA</Text>
              </View>
            );
          }

          return iconComponent;
        },
        tabBarActiveTintColor: '#b30000',
        tabBarInactiveTintColor: '#777',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarButton: (props) => (
            <View style={styles.centerTabContainer}>
              <TouchableOpacity {...props} style={styles.centerTabButton}>
                <View style={styles.centerTabBackground}>
                  <FontAwesome5 name="dragon" size={24} color="#fff" />
                </View>
                <Text style={styles.centerTabText}>Explore</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="VenueBookingScreen" component={VenueBookingScreen} />
        <Stack.Screen name="VenueDetailScreen" component={VenueDetailScreen} />
        <Stack.Screen name="DatePickingScreen" component={DatePickingScreen} />
        <Stack.Screen name="ConfirmationPage" component={ConfirmationPage} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
        <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmation} />           
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  profileAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8a56ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileAvatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: 'Poppins_Bold',
  },
  centerTabContainer: {
    position: 'absolute',
    bottom: 0,
    width: 80,
    height: 80,
    alignItems: 'center',
  },
  centerTabButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerTabBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#b30000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  centerTabText: {
    marginTop: 5,
    fontSize: 12,
    color: '#b30000',
    fontWeight: 'bold',
    fontFamily: 'Poppins_Bold',
  }
});
