import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import DashboardScreen from './DashboardScreen';
import ChatScreen from './ChatScreen';
import ProfileScreen from './ProfileScreen';
import ExploreScreen from './ExploreScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
  },
  centerTabContainer: {
    position: 'absolute',
    bottom: 0,  // Agar lebih ke tengah
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
  }
});
