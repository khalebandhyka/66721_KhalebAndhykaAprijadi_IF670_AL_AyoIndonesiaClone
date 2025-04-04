import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Types
type Activity = {
  id: string;
  name: string;
};

type Location = {
  id: string;
  name: string;
};

type SportsCategory = {
  id: string;
  name: string;
};

type Venue = {
  id: string;
  name: string;
  category: string;
  location: string;
  image: string;
  rating: number;
};

// Component for filter section
interface FilterSectionProps {
  title: string;
  value: string;
  onPress: () => void;
  icon?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, value, onPress, icon }) => {
  return (
    <TouchableOpacity style={styles.filterSection} onPress={onPress}>
      <View style={styles.filterTitleContainer}>
        <Text style={styles.filterTitle}>{title}</Text>
      </View>
      <View style={styles.filterValueContainer}>
        <Text style={value ? styles.filterValueSelected : styles.filterValue}>
          {value || `Pilih ${title}`}
        </Text>
        {icon && <Ionicons name={icon as any} size={20} color="#666" style={styles.filterIcon} />}
      </View>
    </TouchableOpacity>
  );
};

// Venue Card Component
interface VenueCardProps {
  venue: Venue;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  return (
    <View style={styles.venueCard}>
      <View style={styles.venueImagePlaceholder}>
        <Text style={styles.venueImageText}>{venue.name.charAt(0)}</Text>
      </View>
      <View style={styles.venueInfo}>
        <Text style={styles.venueName}>{venue.name}</Text>
        <Text style={styles.venueCategory}>{venue.category}</Text>
        <View style={styles.venueLocation}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.venueLocationText}>{venue.location}</Text>
        </View>
        <View style={styles.venueRating}>
          <Ionicons name="star" size={14} color="#F9A826" />
          <Text style={styles.venueRatingText}>{venue.rating.toFixed(1)}</Text>
        </View>
      </View>
    </View>
  );
};

export default function ExploreScreen() {
  // State for selected filters
  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Sample data for latest searches
  const latestVenues: Venue[] = [
    {
      id: '1',
      name: 'Lapangan Futsal ABC',
      category: 'Futsal',
      location: 'Jakarta Selatan',
      image: '',
      rating: 4.7,
    },
    {
      id: '2',
      name: 'GOR Badminton XYZ',
      category: 'Badminton',
      location: 'Jakarta Pusat',
      image: '',
      rating: 4.5,
    },
    {
      id: '3',
      name: 'Lapangan Basket 123',
      category: 'Basket',
      location: 'Jakarta Utara',
      image: '',
      rating: 4.2,
    },
    {
      id: '4',
      name: 'Tennis Arena',
      category: 'Tennis',
      location: 'Jakarta Barat',
      image: '',
      rating: 4.8,
    },
  ];

  // Mock functions for opening filter selection modals
  const openActivitySelection = () => {
    // In real implementation, this would open a modal or navigation
    setSelectedActivity('Futsal');
  };

  const openLocationSelection = () => {
    setSelectedLocation('Jakarta Selatan');
  };

  const openCategorySelection = () => {
    setSelectedCategory('Indoor');
  };

  const openDateSelection = () => {
    setSelectedDate('2025-04-05');
  };

  const openTimeSelection = () => {
    setSelectedTime('19:00');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* Filter Sections */}
        <View style={styles.filtersContainer}>
          <FilterSection
            title="Activities"
            value={selectedActivity}
            onPress={openActivitySelection}
            icon="chevron-down"
          />
          
          <FilterSection
            title="Select Location"
            value={selectedLocation}
            onPress={openLocationSelection}
            icon="chevron-down"
          />
          
          <FilterSection
            title="Sports Category"
            value={selectedCategory}
            onPress={openCategorySelection}
            icon="chevron-down"
          />
          
          <FilterSection
            title="Activity Date"
            value={selectedDate ? new Date(selectedDate).toLocaleDateString('id-ID', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            }) : ''}
            onPress={openDateSelection}
            icon="calendar-outline"
          />
          
          <FilterSection
            title="Time"
            value={selectedTime}
            onPress={openTimeSelection}
            icon="time-outline"
          />
        </View>
        
        {/* Latest Search Section */}
        <View style={styles.latestSearchContainer}>
          <Text style={styles.latestSearchTitle}>Latest Search</Text>
          
          <FlatList
            data={latestVenues}
            renderItem={({ item }) => <VenueCard venue={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.venueList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  scrollView: {
    flex: 1,
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
  },
  filterSection: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  filterTitleContainer: {
    marginBottom: 4,
  },
  filterTitle: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '500',
  },
  filterValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterValue: {
    fontSize: 16,
    color: '#BBBBBB',
  },
  filterValueSelected: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  filterIcon: {
    marginLeft: 8,
  },
  latestSearchContainer: {
    padding: 16,
  },
  latestSearchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333333',
  },
  venueList: {
    paddingRight: 16,
  },
  venueCard: {
    width: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  venueImagePlaceholder: {
    width: 80,
    height: 100,
    backgroundColor: '#E1E8ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  venueImageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#98A4AE',
  },
  venueInfo: {
    flex: 1,
    padding: 12,
  },
  venueName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  venueCategory: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 6,
  },
  venueLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  venueLocationText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  venueRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  venueRatingText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
    fontWeight: '500',
  },
});