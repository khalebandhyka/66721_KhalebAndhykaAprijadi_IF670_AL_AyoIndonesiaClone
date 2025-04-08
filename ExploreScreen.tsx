// ExploreScreen.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { 
  Ionicons, 
  MaterialIcons, 
  FontAwesome5, 
  Feather, 
  AntDesign 
} from '@expo/vector-icons';

// Venue data for Latest Search
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
    name: 'Md Futsal Rawa Buaya',
    location: 'Kota Jakarta Barat',
    image: require('./assets/mdrawabuaya.jpg'),
    rating: 4.2,
    reviews: 14,
    price: 'Rp100.000,-',
  },
  {
    id: '2',
    name: 'Mini Kong Soccer Arena',
    location: 'Kota Jakarta Timur',
    image: require('./assets/minikong.jpg'),
    rating: 4.8,
    reviews: 92,
    tag: 'Bisa DP',
    price: 'Rp500.000,-',
  },
  {
    id: '3',
    name: 'Rekket Space',
    location: 'Kota Tangerang Selatan',
    image: require('./assets/rekket.jpg'),
    rating: 4.9,
    reviews: 1556,
    price: 'Rp59.000,-',
  },
];

const activityOptions = [
  { id: '1', name: 'Venue Booking' },
  { id: '2', name: 'Open Play' },
  { id: '3', name: 'Sparring' },
  { id: '4', name: 'Competition' },
];

const locationOptions = [
  { id: '1', name: 'Jakarta Barat' },
  { id: '2', name: 'Jakarta Timur' },
  { id: '3', name: 'Jakarta Selatan' },
  { id: '4', name: 'Jakarta Pusat' },
  { id: '5', name: 'Jakarta Utara' },
  { id: '6', name: 'Tangerang' },
  { id: '7', name: 'Bekasi' },
];

const sportsCategoryOptions = [
  { id: '1', name: 'Futsal', icon: 'sports-soccer' },
  { id: '2', name: 'Badminton', icon: 'sports-tennis' },
  { id: '3', name: 'Basketball', icon: 'sports-basketball' },
  { id: '4', name: 'Volleyball', icon: 'sports-volleyball' },
  { id: '5', name: 'Tennis', icon: 'sports-tennis' },
];

const generateDateOptions = () => {
  const options = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dateNum = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    
    options.push({
      id: i.toString(),
      day,
      date: dateNum,
      month,
      fullDate: date.toISOString().split('T')[0],
    });
  }
  
  return options;
};

const dateOptions = generateDateOptions();

const timeOptions = [
  { id: '1', time: '08:00', period: 'AM' },
  { id: '2', time: '10:00', period: 'AM' },
  { id: '3', time: '12:00', period: 'PM' },
  { id: '4', time: '14:00', period: 'PM' },
  { id: '5', time: '16:00', period: 'PM' },
  { id: '6', time: '18:00', period: 'PM' },
  { id: '7', time: '20:00', period: 'PM' },
];

const ExploreScreen = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const allFieldsFilled = 
    selectedActivity !== null && 
    selectedLocation !== null && 
    selectedSport !== null && 
    selectedDate !== null && 
    selectedTime !== null;

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const renderVenueItem = ({ item }: { item: VenueItem }) => (
    <TouchableOpacity style={styles.venueCard}>
      <View style={styles.imageContainer}>
        <Image source={ item.image } style={styles.venueImage} />
        <View style={styles.locationTag}>
          <Ionicons name="location" size={14} color="#fff" />
          <Text style={styles.locationTagText}>{item.location}</Text>
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
      <StatusBar barStyle="light-content" backgroundColor="#990000" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Activities Dropdown */}
        <View style={styles.dropdownSection}>
          <TouchableOpacity 
            style={styles.dropdownHeader} 
            onPress={() => toggleSection('activities')}
          >
            <View style={styles.dropdownTitleContainer}>
              <MaterialIcons name="local-activity" size={24} color="#990000" style={styles.dropdownIcon} />
              <View>
                <Text style={styles.dropdownLabel}>Activities</Text>
                {selectedActivity && (
                  <Text style={styles.dropdownSelection}>
                    {activityOptions.find(opt => opt.id === selectedActivity)?.name}
                  </Text>
                )}
              </View>
            </View>
            <MaterialIcons 
              name={expandedSection === 'activities' ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
              size={24} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {expandedSection === 'activities' && (
            <View style={styles.dropdownContent}>
              {activityOptions.map((option) => (
                <TouchableOpacity 
                  key={option.id}
                  style={[
                    styles.optionItem,
                    selectedActivity === option.id && styles.selectedOption
                  ]}
                  onPress={() => {
                    setSelectedActivity(option.id);
                    setExpandedSection(null);
                  }}
                >
                  <Text style={[
                    styles.optionText,
                    selectedActivity === option.id && styles.selectedOptionText
                  ]}>
                    {option.name}
                  </Text>
                  {selectedActivity === option.id && (
                    <MaterialIcons name="check" size={20} color="#990000" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Location Dropdown */}
        <View style={styles.dropdownSection}>
          <TouchableOpacity 
            style={styles.dropdownHeader} 
            onPress={() => toggleSection('location')}
          >
            <View style={styles.dropdownTitleContainer}>
              <Ionicons name="location-outline" size={24} color="#990000" style={styles.dropdownIcon} />
              <View>
                <Text style={styles.dropdownLabel}>Select Location</Text>
                {selectedLocation && (
                  <Text style={styles.dropdownSelection}>
                    {locationOptions.find(opt => opt.id === selectedLocation)?.name}
                  </Text>
                )}
              </View>
            </View>
            <MaterialIcons 
              name={expandedSection === 'location' ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
              size={24} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {expandedSection === 'location' && (
            <View style={styles.dropdownContent}>
              {locationOptions.map((option) => (
                <TouchableOpacity 
                  key={option.id}
                  style={[
                    styles.optionItem,
                    selectedLocation === option.id && styles.selectedOption
                  ]}
                  onPress={() => {
                    setSelectedLocation(option.id);
                    setExpandedSection(null);
                  }}
                >
                  <Text style={[
                    styles.optionText,
                    selectedLocation === option.id && styles.selectedOptionText
                  ]}>
                    {option.name}
                  </Text>
                  {selectedLocation === option.id && (
                    <MaterialIcons name="check" size={20} color="#990000" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Sports Category Dropdown */}
        <View style={styles.dropdownSection}>
          <TouchableOpacity 
            style={styles.dropdownHeader} 
            onPress={() => toggleSection('sports')}
          >
            <View style={styles.dropdownTitleContainer}>
              <MaterialIcons name="sports-soccer" size={24} color="#990000" style={styles.dropdownIcon} />
              <View>
                <Text style={styles.dropdownLabel}>Sports Category</Text>
                {selectedSport && (
                  <Text style={styles.dropdownSelection}>
                    {sportsCategoryOptions.find(opt => opt.id === selectedSport)?.name}
                  </Text>
                )}
              </View>
            </View>
            <MaterialIcons 
              name={expandedSection === 'sports' ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
              size={24} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {expandedSection === 'sports' && (
            <View style={styles.dropdownContent}>
              <View style={styles.sportsGrid}>
              {sportsCategoryOptions.map((option) => (
                <TouchableOpacity 
                  key={option.id}
                  style={[
                    styles.sportItem,
                    selectedSport === option.id && styles.selectedSportItem
                  ]}
                  onPress={() => {
                    setSelectedSport(option.id);
                    setExpandedSection(null);
                  }}
                >
                  <View style={[
                    styles.sportIconContainer,
                    selectedSport === option.id && styles.selectedSportIconContainer
                  ]}>
                    {option.name === 'Futsal' && (
                      <MaterialIcons 
                        name="sports-soccer" 
                        size={28} 
                        color={selectedSport === option.id ? "#fff" : "#666"} 
                      />
                    )}
                    {(option.name === 'Badminton' || option.name === 'Tennis') && (
                      <MaterialIcons 
                        name="sports-tennis" 
                        size={28} 
                        color={selectedSport === option.id ? "#fff" : "#666"} 
                      />
                    )}
                    {option.name === 'Basketball' && (
                      <MaterialIcons 
                        name="sports-basketball" 
                        size={28} 
                        color={selectedSport === option.id ? "#fff" : "#666"} 
                      />
                    )}
                    {option.name === 'Volleyball' && (
                      <MaterialIcons 
                        name="sports-volleyball" 
                        size={28} 
                        color={selectedSport === option.id ? "#fff" : "#666"} 
                      />
                    )}
                  </View>
                  <Text style={[
                    styles.sportText,
                    selectedSport === option.id && styles.selectedSportText
                  ]}>
                    {option.name}
                  </Text>
                </TouchableOpacity>
              ))}
              </View>
            </View>
          )}
        </View>

        {/* Activity Date Dropdown */}
        <View style={styles.dropdownSection}>
          <TouchableOpacity 
            style={styles.dropdownHeader} 
            onPress={() => toggleSection('date')}
          >
            <View style={styles.dropdownTitleContainer}>
              <MaterialIcons name="event" size={24} color="#990000" style={styles.dropdownIcon} />
              <View>
                <Text style={styles.dropdownLabel}>Activity Date</Text>
                {selectedDate && (
                  <Text style={styles.dropdownSelection}>
                    {dateOptions.find(opt => opt.id === selectedDate)?.day}, {dateOptions.find(opt => opt.id === selectedDate)?.date} {dateOptions.find(opt => opt.id === selectedDate)?.month}
                  </Text>
                )}
              </View>
            </View>
            <MaterialIcons 
              name={expandedSection === 'date' ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
              size={24} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {expandedSection === 'date' && (
            <View style={styles.dropdownContent}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.dateScrollContent}
              >
                {dateOptions.map((option) => (
                  <TouchableOpacity 
                    key={option.id}
                    style={[
                      styles.dateItem,
                      selectedDate === option.id && styles.selectedDateItem
                    ]}
                    onPress={() => {
                      setSelectedDate(option.id);
                      setExpandedSection(null);
                    }}
                  >
                    <Text style={[
                      styles.dayText,
                      selectedDate === option.id && styles.selectedDateText
                    ]}>
                      {option.day}
                    </Text>
                    <Text style={[
                      styles.dateText,
                      selectedDate === option.id && styles.selectedDateText
                    ]}>
                      {option.date}
                    </Text>
                    <Text style={[
                      styles.monthText,
                      selectedDate === option.id && styles.selectedDateText
                    ]}>
                      {option.month}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Time Dropdown */}
        <View style={styles.dropdownSection}>
          <TouchableOpacity 
            style={styles.dropdownHeader} 
            onPress={() => toggleSection('time')}
          >
            <View style={styles.dropdownTitleContainer}>
              <MaterialIcons name="access-time" size={24} color="#990000" style={styles.dropdownIcon} />
              <View>
                <Text style={styles.dropdownLabel}>Time</Text>
                {selectedTime && (
                  <Text style={styles.dropdownSelection}>
                    {timeOptions.find(opt => opt.id === selectedTime)?.time} {timeOptions.find(opt => opt.id === selectedTime)?.period}
                  </Text>
                )}
              </View>
            </View>
            <MaterialIcons 
              name={expandedSection === 'time' ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
              size={24} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {expandedSection === 'time' && (
            <View style={styles.dropdownContent}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.timeScrollContent}
              >
                {timeOptions.map((option) => (
                  <TouchableOpacity 
                    key={option.id}
                    style={[
                      styles.timeItem,
                      selectedTime === option.id && styles.selectedTimeItem
                    ]}
                    onPress={() => {
                      setSelectedTime(option.id);
                      setExpandedSection(null);
                    }}
                  >
                    <Text style={[
                      styles.timeText,
                      selectedTime === option.id && styles.selectedTimeText
                    ]}>
                      {option.time}
                    </Text>
                    <Text style={[
                      styles.periodText,
                      selectedTime === option.id && styles.selectedTimeText
                    ]}>
                      {option.period}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Search Button */}
        <TouchableOpacity 
          style={[
            styles.searchButton,
            allFieldsFilled ? styles.searchButtonActive : styles.searchButtonDisabled
          ]}
          disabled={!allFieldsFilled}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        {/* Results Section - Only show when all fields are filled */}
        {allFieldsFilled && (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsSectionTitle}>Search Results</Text>
            <Text style={styles.resultsDescription}>
              {sportsCategoryOptions.find(opt => opt.id === selectedSport)?.name} venues in {locationOptions.find(opt => opt.id === selectedLocation)?.name} for {dateOptions.find(opt => opt.id === selectedDate)?.day}, {dateOptions.find(opt => opt.id === selectedDate)?.date} {dateOptions.find(opt => opt.id === selectedDate)?.month} at {timeOptions.find(opt => opt.id === selectedTime)?.time} {timeOptions.find(opt => opt.id === selectedTime)?.period}
            </Text>
            
            <FlatList
              data={venueData}
              renderItem={renderVenueItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.venueListContainer}
            />
          </View>
        )}

        {/* Latest Search Section */}
        <View style={styles.latestSearchSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Search</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
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
  dropdownSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  dropdownTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownIcon: {
    marginRight: 10,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdownSelection: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  dropdownContent: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  selectedOption: {
    backgroundColor: '#f9f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#990000',
    fontWeight: 'bold',
  },
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  sportItem: {
    width: '30%',
    alignItems: 'center',
    marginVertical: 10,
  },
  selectedSportItem: {
    // No specific style needed here
  },
  sportIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedSportIconContainer: {
    backgroundColor: '#990000',
  },
  sportText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  selectedSportText: {
    color: '#990000',
    fontWeight: 'bold',
  },
  dateScrollContent: {
    paddingHorizontal: 10,
  },
  dateItem: {
    width: 70,
    height: 90,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedDateItem: {
    backgroundColor: '#990000',
  },
  dayText: {
    fontSize: 14,
    color: '#666',
  },
  dateText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 4,
  },
  monthText: {
    fontSize: 14,
    color: '#666',
  },
  selectedDateText: {
    color: '#fff',
  },
  timeScrollContent: {
    paddingHorizontal: 10,
  },
  timeItem: {
    width: 80,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedTimeItem: {
    backgroundColor: '#990000',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  periodText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  selectedTimeText: {
    color: '#fff',
  },
  searchButton: {
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  searchButtonActive: {
    backgroundColor: '#990000',
  },
  searchButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsSection: {
    marginTop: 20,
    marginBottom: 10,
  },
  resultsSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 15,
    marginBottom: 5,
  },
  resultsDescription: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 15,
    marginBottom: 15,
  },
  latestSearchSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#990000',
    fontWeight: 'bold',
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
  locationTagText: {
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

export default ExploreScreen;