import React, { useState } from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, FlatList, Dimensions, ImageBackground} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, Feather, AntDesign } from '@expo/vector-icons';
import CarouselCard from './CarouselCard'; 
import PaymentConfirmation from './PaymentConfirmation';

interface VenueItem {
    id: string;
    name: string;
    location: string;
    image: any;
    rating: number;
    reviews: number;
    tag?: string;
    price: string;
  }
  
  const venueData: VenueItem[] = [
    {
      id: '1',
      name: 'DM Sport Ciledug',
      location: 'Kota Tangerang',
      image: require('./assets/dmsport.jpg'),
      rating: 4.9,
      reviews: 100,
      tag: 'Bisa DP',
      price: 'Rp2.000.000,-',
    },
    {
      id: '2',
      name: 'Dewantara Sport',
      location: 'Kota Tangerang Selatan',
      image: require('./assets/dewantara.jpeg'),
      rating: 4.8,
      reviews: 92,
      tag: 'Bisa DP',
      price: 'Rp1.500.000,-',
    },
    {
      id: '3',
      name: 'Estadio Arena Mini Soccer',
      location: 'Kota Bekasi',
      image: require('./assets/estadioarena.jpg'),
      rating: 4.5,
      reviews: 63,
      tag: 'Premium',
      price: 'Rp2.500.000,-',
    },
    {
      id: '4',
      name: 'Kicktopia Arena',
      location: 'Gading Serpong',
      image: require('./assets/kicktopia.jpg'),
      rating: 4.7,
      reviews: 128,
      tag: 'Premium',
      price: 'Rp2.400.000,-',
    },
    {
      id: '5',
      name: 'Seven Arena Mini Soccer',
      location: 'BSD',
      image: require('./assets/sevenarena.jpg'),
      rating: 4.3,
      reviews: 47,
      tag: 'Bisa DP',
      price: 'Rp1.800.000,-',
    },
  ];

  interface HomeScreenProps {
    navigation: {
      navigate: (screen: string) => void;
    };
  } 

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [showChallenge, setShowChallenge] = useState(true);

    // Venue item renderer for FlatList
    const renderVenueItem = ({ item }: { item: VenueItem }) => (
        <TouchableOpacity style={styles.venueCard}>
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.venueImage} />
            <View style={styles.locationTag}>
              <Ionicons name="location" size={14} color="#fff" />
              <Text style={styles.locationTeks}>{item.location}</Text>
            </View>
          </View>
          <View style={styles.venueDetails}>
            <Text style={styles.venueName} numberOfLines={2}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFC107" />
              <Text style={styles.ratingText}>{item.rating}</Text>
              <Text style={styles.reviewCount}>({item.reviews})</Text>
            </View>
            {item.tag && (
              <View style={styles.tagContainer}>
                <Text style={styles.tagText}>{item.tag}</Text>
              </View>
            )}
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Mulai</Text>
              <Text style={styles.priceValue}>{item.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for Competition"
            placeholderTextColor="#ccc"
          />
        </View>
        <View style={styles.iconGroup}>
          <View style={styles.iconBadge}>
            <Ionicons name="people" size={24} color="#000" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>6</Text>
            </View>
          </View>
          <View style={styles.iconBadge}>
            <Ionicons name="notifications-outline" size={24} color="#000" />
            <View style={[styles.badge, styles.redBadge]}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Location */}
      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={24} color="#000" />
        <Text style={styles.locationText}>All Location</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Main Cards */}
        <View style={styles.cardsContainer}>
          {/* Venue Booking Card */}
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('VenueBookingScreen')}>
            <Image
              source={require('./assets/lapanganbadminton.jpeg')}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardIconContainer}>
              <View style={[styles.cardIcon, { backgroundColor: '#b30000' }]}>
                <FontAwesome5 name="ticket-alt" size={24} color="#fff" />
              </View>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Venue Booking</Text>
              <Text style={styles.cardSubtitle}>Quick & Easy!</Text>
            </View>
          </TouchableOpacity>

          {/* Open Play Card */}
          <View style={styles.card}>
            <Image
            source={require('./assets/minisoccer.jpg')}
            style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardIconContainer}>
              <View style={[styles.cardIcon, { backgroundColor: '#b30000' }]}>
                <FontAwesome5 name="user-friends" size={24} color="#fff" />
              </View>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Open Play</Text>
              <Text style={styles.cardSubtitle}>Make New Friends!</Text>
            </View>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          {/* Sparring */}
          <View style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>NEW</Text>
              </View>
              <View style={[styles.menuIcon, { backgroundColor: '#fff' }]}>
                <FontAwesome5 name="stopwatch" size={24} color="#b30000" />
              </View>
            </View>
            <Text style={styles.menuText}>Sparring</Text>
          </View>

          {/* Community */}
          <View style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: '#fff' }]}>
              <FontAwesome5 name="shield-alt" size={24} color="#b30000" />
            </View>
            <Text style={styles.menuText}>Community</Text>
          </View>

          {/* Competition */}
          <View style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: '#fff' }]}>
              <FontAwesome5 name="trophy" size={24} color="#b30000" />
            </View>
            <Text style={styles.menuText}>Competition</Text>
          </View>

          {/* Leaderboard */}
          <View style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <View style={styles.soonBadge}>
                <Text style={styles.soonBadgeText}>SOON</Text>
              </View>
              <View style={[styles.menuIcon, { backgroundColor: '#fff' }]}>
                <FontAwesome5 name="chart-bar" size={24} color="#b30000" />
              </View>
            </View>
            <Text style={styles.menuText}>Leaderboard</Text>
          </View>
        </View>

        {/* Challenge Card */}
        {showChallenge && (
          <View style={styles.challengeCard}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowChallenge(false)}
            >
              <AntDesign name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.vsContainer}>
              <Text style={styles.vsText}>VS</Text>
            </View>
            <Text style={styles.challengeTitle}>Ready to compete with new opponents?</Text>
            <TouchableOpacity style={styles.challengeButton}>
              <Text style={styles.challengeButtonText}>Activate the challenge</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Promo Banner*/}
        <View style={styles.promoBanner}>
            <CarouselCard />
        </View>
      
      {/* Venue Choices Section - NEW */}
      <View style={styles.venueSection}>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionTitle}>Our venue choices for you</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <MaterialIcons name="arrow-forward" size={24} color="#b30000" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={venueData}
            renderItem={renderVenueItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.venueListContainer}
          />
        </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  headerTime: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerNetwork: {
    marginRight: 5,
  },
  headerBattery: {
    backgroundColor: '#000',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  headerBatteryText: {
    color: '#fff',
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  iconGroup: {
    flexDirection: 'row',
    marginLeft: 15,
  },
  iconBadge: {
    position: 'relative',
    marginLeft: 15,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#333',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redBadge: {
    backgroundColor: '#ff3b30',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  scrollView: {
    flex: 1,
  },
  cardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
  },
  cardImage: {
    width: '100%',
    height: 140,
  },
  cardIconContainer: {
    position: 'absolute',
    bottom: 50,
    left: 10,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  menuItem: {
    alignItems: 'center',
    width: '22%',
  },
  menuIconContainer: {
    position: 'relative',
  },
  menuIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  menuText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  newBadge: {
    position: 'absolute',
    top: -10,
    left: -5,
    backgroundColor: '#ff3b30',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    zIndex: 1,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  soonBadge: {
    position: 'absolute',
    top: -10,
    right: -5,
    backgroundColor: '#f0ad4e',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    zIndex: 1,
  },
  soonBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  challengeCard: {
    backgroundColor: '#1e6e87',
    borderRadius: 15,
    padding: 20,
    margin: 15,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  vsContainer: {
    backgroundColor: '#f0ad4e',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  vsText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  challengeTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  challengeButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  challengeButtonText: {
    color: '#1e6e87',
    fontWeight: 'bold',
  },
  promoBanner: {
    margin: 15,
    borderRadius: 15,
    overflow: 'hidden',
    height: 250,
  },
  promoBannerImage: {
    width: '100%',
    height: '100%',
  },
  promoContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  promoLogo: {
    width: '70%',
    height: 100,
  },
  promoButtons: {
    alignItems: 'center',
  },
  promoButton: {
    backgroundColor: '#8b0000',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  promoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  whiteButton: {
    backgroundColor: '#fff',
  },
  whiteButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  venueSection: {
    marginVertical: 20,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  venueListContainer: {
    paddingLeft: 15,
    paddingRight: 5,
  },
  venueCard: {
    width: Dimensions.get('window').width * 0.7,
    marginRight: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  venueImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  locationTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTeks: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  venueDetails: {
    padding: 12,
  },
  venueName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#777',
    marginLeft: 4,
  },
  tagContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default HomeScreen;