// Dashboard.tsx
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { 
  Ionicons, 
  FontAwesome5, 
  MaterialIcons, 
  MaterialCommunityIcons, 
  Feather 
} from '@expo/vector-icons';

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#990000" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Balance Card */}
        <TouchableOpacity style={styles.balanceCard}>
          <View style={styles.balanceContent}>
            <View style={styles.balanceIconContainer}>
              <MaterialIcons name="account-balance-wallet" size={24} color="#f5a623" />
            </View>
            <View style={styles.balanceTextContainer}>
              <Text style={styles.balanceLabel}>Balance</Text>
              <Text style={styles.balanceAmount}>Rp0</Text>
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <MenuItem 
            icon={<FontAwesome5 name="stopwatch" size={24} color="#333" />} 
            title="Sparring" 
            onPress={() => {}} 
          />
          
          <MenuItem 
            icon={<MaterialCommunityIcons name="account-group" size={24} color="#333" />} 
            title="Open Play" 
            onPress={() => {}} 
          />
          
          <MenuItem 
            icon={<MaterialIcons name="format-list-bulleted" size={24} color="#333" />} 
            title="Check-in List" 
            onPress={() => {}} 
          />
          
          <MenuItem 
            icon={<FontAwesome5 name="shield-alt" size={24} color="#333" />} 
            title="Communities" 
            onPress={() => {}} 
          />
          
          <MenuItem 
            icon={<MaterialCommunityIcons name="trophy-outline" size={24} color="#333" />} 
            title="Competition" 
            onPress={() => {}} 
          />
        </View>

        <View style={styles.menuContainer}>
          <MenuItem 
            icon={<FontAwesome5 name="ticket-alt" size={24} color="#333" />} 
            title="Venue Booking" 
            onPress={() => {}} 
          />
          
          <MenuItem 
            icon={<MaterialCommunityIcons name="card-account-details-outline" size={24} color="#333" />} 
            title="Membership" 
            onPress={() => {}} 
          />
        </View>

        <View style={styles.menuContainer}>
          <MenuItem 
            icon={<FontAwesome5 name="gift" size={24} color="#333" />} 
            title="Invite a friend" 
            badge="New"
            onPress={() => {}} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// MenuItem Component
interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  badge?: string;
  onPress: () => void;
}

const MenuItem = ({ icon, title, badge, onPress }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemContent}>
      <View style={styles.menuItemIcon}>
        {icon}
      </View>
      <Text style={styles.menuItemTitle}>{title}</Text>
    </View>
    <View style={styles.menuItemRight}>
      {badge && (
        <View style={styles.menuItemBadge}>
          <Text style={styles.menuItemBadgeText}>{badge}</Text>
        </View>
      )}
      <MaterialIcons name="chevron-right" size={24} color="#990000" />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#990000',
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  balanceCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  balanceTextContainer: {
    justifyContent: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 15,
    marginTop: 0,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemTitle: {
    fontSize: 18,
    color: '#333',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemBadge: {
    backgroundColor: '#ff3b30',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
  },
  menuItemBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  }
});

export default Dashboard;