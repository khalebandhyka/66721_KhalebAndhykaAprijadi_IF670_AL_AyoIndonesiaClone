"use client"

import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

// Types
interface Venue {
  id: string
  name: string
  location: string
  image: string
  rating: number
  price: string
  distance: string
  description?: string
  facilities?: string[]
  regulations?: string[]
  activities?: string[]
  communities?: Community[]
  reviews?: Review[]
  nearbyVenues?: NearbyVenue[]
  hourlyRate?: string
  openHours?: string
  address?: string
  images?: string[]
}

interface Community {
  id: string
  name: string
  members: number
  image: string
}

interface Review {
  id: string
  user: string
  userImage: string
  rating: number
  comment: string
  date: string
}

interface NearbyVenue {
  id: string
  name: string
  image: string
  distance: string
  price: string
}

const { width } = Dimensions.get("window")

const VenueDetailScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // In a real app, you would get the venue data from route.params
  // const { venueId } = route.params;

  // Mock data for the selected venue
  const venue: Venue = {
    id: "5",
    name: "Basketball Court",
    location: "Central Park",
    image: "https://placeholder.svg?height=300&width=400",
    rating: 4.5,
    price: "$18/hr",
    distance: "1.2 km",
    description:
      "Professional basketball court with high-quality flooring, proper lighting, and standard dimensions. Perfect for both casual games and serious training sessions.",
    facilities: ["Changing Rooms", "Showers", "Parking", "Water Dispensers", "Seating Area", "First Aid Kit"],
    regulations: [
      "No food or drinks on the court",
      "Proper sports shoes required",
      "Maximum 12 players per court",
      "Booking cancellation must be 24 hours in advance",
      "No smoking in the venue",
    ],
    activities: ["Basketball Training", "Amateur Tournaments", "Professional Coaching", "Youth Programs"],
    communities: [
      {
        id: "c1",
        name: "Downtown Ballers",
        members: 124,
        image: "https://placeholder.svg?height=50&width=50",
      },
      {
        id: "c2",
        name: "Weekend Warriors",
        members: 87,
        image: "https://placeholder.svg?height=50&width=50",
      },
      {
        id: "c3",
        name: "City Hoops",
        members: 156,
        image: "https://placeholder.svg?height=50&width=50",
      },
    ],
    reviews: [
      {
        id: "r1",
        user: "John Smith",
        userImage: "https://placeholder.svg?height=40&width=40",
        rating: 5,
        comment: "Great court! The surface is well-maintained and the facilities are clean.",
        date: "2 days ago",
      },
      {
        id: "r2",
        user: "Sarah Johnson",
        userImage: "https://placeholder.svg?height=40&width=40",
        rating: 4,
        comment: "Good lighting and ventilation. Would recommend for evening games.",
        date: "1 week ago",
      },
      {
        id: "r3",
        user: "Mike Williams",
        userImage: "https://placeholder.svg?height=40&width=40",
        rating: 4.5,
        comment: "Professional setup. The staff is friendly and helpful.",
        date: "2 weeks ago",
      },
    ],
    nearbyVenues: [
      {
        id: "n1",
        name: "Tennis Court",
        image: "https://placeholder.svg?height=120&width=200",
        distance: "0.5 km",
        price: "$22/hr",
      },
      {
        id: "n2",
        name: "Soccer Field",
        image: "https://placeholder.svg?height=120&width=200",
        distance: "0.8 km",
        price: "$25/hr",
      },
      {
        id: "n3",
        name: "Volleyball Court",
        image: "https://placeholder.svg?height=120&width=200",
        distance: "1.0 km",
        price: "$20/hr",
      },
      {
        id: "n4",
        name: "Badminton Hall",
        image: "https://placeholder.svg?height=120&width=200",
        distance: "1.5 km",
        price: "$15/hr",
      },
    ],
    hourlyRate: "$18/hr",
    openHours: "6:00 AM - 10:00 PM",
    address: "123 Central Park West, New York, NY 10023",
    images: [
      "https://placeholder.svg?height=300&width=400",
      "https://placeholder.svg?height=300&width=400",
      "https://placeholder.svg?height=300&width=400",
      "https://placeholder.svg?height=300&width=400",
    ],
  }

  // Render venue image carousel
  const renderImageItem = ({ item, index }: { item: string; index: number }) => (
    <Image source={{ uri: item }} style={styles.venueImage} resizeMode="cover" />
  )

  // Render image pagination dots
  const renderPaginationDots = () => {
    return (
      <View style={styles.paginationContainer}>
        {venue.images?.map((_, index) => (
          <View
            key={index}
            style={[styles.paginationDot, index === activeImageIndex ? styles.paginationDotActive : {}]}
          />
        ))}
      </View>
    )
  }

  // Render community item
  const renderCommunityItem = ({ item }: { item: Community }) => (
    <TouchableOpacity style={styles.communityCard}>
      <Image source={{ uri: item.image }} style={styles.communityImage} />
      <Text style={styles.communityName}>{item.name}</Text>
      <Text style={styles.communityMembers}>{item.members} members</Text>
    </TouchableOpacity>
  )

  // Render nearby venue item
  const renderNearbyVenueItem = ({ item }: { item: NearbyVenue }) => (
    <TouchableOpacity style={styles.nearbyVenueCard}>
      <Image source={{ uri: item.image }} style={styles.nearbyVenueImage} />
      <View style={styles.nearbyVenueInfo}>
        <Text style={styles.nearbyVenueName}>{item.name}</Text>
        <View style={styles.nearbyVenueDetails}>
          <View style={styles.distanceContainer}>
            <Ionicons name="navigate-outline" size={12} color="#666" />
            <Text style={styles.nearbyVenueDistance}>{item.distance}</Text>
          </View>
          <Text style={styles.nearbyVenuePrice}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  // Handle image scroll
  const handleImageScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width)
    if (slideIndex !== activeImageIndex) {
      setActiveImageIndex(slideIndex)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Venue Images Carousel */}
        <View style={styles.imageCarouselContainer}>
          <FlatList
            data={venue.images}
            renderItem={renderImageItem}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleImageScroll}
            scrollEventThrottle={16}
          />
          {renderPaginationDots()}
        </View>

        {/* Venue Info */}
        <View style={styles.venueInfoContainer}>
          <View style={styles.venueHeaderContainer}>
            <View>
              <Text style={styles.venueName}>{venue.name}</Text>
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text style={styles.venueLocation}>{venue.location}</Text>
              </View>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={18} color="#FFD700" />
              <Text style={styles.venueRating}>{venue.rating}</Text>
            </View>
          </View>

          <View style={styles.venueDetailsContainer}>
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={20} color="#9B0000" />
              <Text style={styles.detailText}>{venue.openHours}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="navigate-outline" size={20} color="#9B0000" />
              <Text style={styles.detailText}>{venue.distance}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{venue.description}</Text>
          </View>

          {/* Facilities */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Facilities</Text>
            <View style={styles.facilitiesContainer}>
              {venue.facilities?.map((facility, index) => (
                <View key={index} style={styles.facilityItem}>
                  <View style={styles.facilityIconContainer}>
                    <Ionicons name="checkmark" size={16} color="#9B0000" />
                  </View>
                  <Text style={styles.facilityText}>{facility}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Location */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.mapContainer}>
              <Image
                source={{ uri: "https://placeholder.svg?height=200&width=400&text=Map" }}
                style={styles.mapImage}
              />
            </View>
            <Text style={styles.addressText}>{venue.address}</Text>
          </View>

          {/* Regulations */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Regulations</Text>
            <View style={styles.regulationsContainer}>
              {venue.regulations?.map((regulation, index) => (
                <View key={index} style={styles.regulationItem}>
                  <Text style={styles.regulationNumber}>{index + 1}</Text>
                  <Text style={styles.regulationText}>{regulation}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Activities */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Fun Activities</Text>
            <View style={styles.activitiesContainer}>
              {venue.activities?.map((activity, index) => (
                <View key={index} style={styles.activityItem}>
                  <View style={styles.activityIconContainer}>
                    <Ionicons name="basketball-outline" size={20} color="#9B0000" />
                  </View>
                  <Text style={styles.activityText}>{activity}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Communities */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionTitle}>Communities</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={venue.communities}
              renderItem={renderCommunityItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.communitiesContainer}
            />
          </View>

          {/* Reviews */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            {venue.reviews?.map((review) => (
              <View key={review.id} style={styles.reviewContainer}>
                <View style={styles.reviewHeader}>
                  <Image source={{ uri: review.userImage }} style={styles.reviewUserImage} />
                  <View style={styles.reviewUserInfo}>
                    <Text style={styles.reviewUserName}>{review.user}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                  <View style={styles.reviewRatingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.reviewRating}>{review.rating}</Text>
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>

          {/* Nearby Venues */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionTitle}>Nearby Venues</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={venue.nearbyVenues}
              renderItem={renderNearbyVenueItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.nearbyVenuesContainer}
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar with Price and Book Button */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>{venue.hourlyRate}</Text>
        </View>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() =>
            navigation.navigate("DatePickingScreen", {
              venueName: venue.name,
              venueImage: venue.image,
              venueId: venue.id,
            })
          }
        >
          <Text style={styles.bookButtonText}>Select Schedule</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageCarouselContainer: {
    height: 300,
    width: "100%",
  },
  venueImage: {
    width: width,
    height: 300,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 16,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#fff",
    width: 12,
    height: 8,
  },
  venueInfoContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 100,
  },
  venueHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  venueName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  venueLocation: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  venueRating: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 4,
  },
  venueDetailsContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  facilitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  facilityItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    marginBottom: 12,
  },
  facilityIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(74, 128, 240, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  facilityText: {
    fontSize: 14,
    color: "#000000",
  },
  mapContainer: {
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  addressText: {
    fontSize: 14,
    color: "#666",
  },
  regulationsContainer: {
    marginTop: 8,
  },
  regulationItem: {
    flexDirection: "row",
    marginBottom: 12,
  },
  regulationNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(74, 128, 240, 0.1)",
    textAlign: "center",
    lineHeight: 24,
    color: "#9B0000",
    fontWeight: "bold",
    marginRight: 12,
  },
  regulationText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  activitiesContainer: {
    marginTop: 8,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  activityIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(74, 128, 240, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityText: {
    fontSize: 14,
    color: "#666",
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: "#9B0000",
    fontWeight: "500",
  },
  communitiesContainer: {
    paddingRight: 16,
  },
  communityCard: {
    width: 120,
    marginRight: 16,
    alignItems: "center",
  },
  communityImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  communityName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  communityMembers: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  reviewContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 16,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  reviewUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewUserInfo: {
    flex: 1,
  },
  reviewUserName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  reviewDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  reviewRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reviewRating: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 4,
  },
  reviewComment: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  nearbyVenuesContainer: {
    paddingRight: 16,
  },
  nearbyVenueCard: {
    width: 200,
    marginRight: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nearbyVenueImage: {
    width: "100%",
    height: 120,
  },
  nearbyVenueInfo: {
    padding: 12,
  },
  nearbyVenueName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  nearbyVenueDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  nearbyVenueDistance: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  nearbyVenuePrice: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#9B0000",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: "#999",
  },
  priceValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  bookButton: {
    backgroundColor: "#9B0000",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default VenueDetailScreen

