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

interface Venue {
  id: string
  name: string
  location: string
  image: any
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
  image: any
}

interface Review {
  id: string
  user: string
  userImage: any
  rating: number
  comment: string
  date: string
}

interface NearbyVenue {
  id: string
  name: string
  image: any
  distance: string
  price: string
}

const { width } = Dimensions.get("window")

const VenueDetailScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)


  const venue: Venue = {
    id: "5",
    name: "Rekket Space Badminton Hall",
    location: "Rawa Buntu",
    image: require('./assets/rekket.jpg'),
    rating: 4.8,
    price: "Rp59.000,-/jam",
    distance: "2.5 km",
    description:
    "The best and biggest badminton venue in South Tangerang.Hosting 14 BWF certified badminton courts. With a greatambiance making your badminton experience like never before.",
        facilities: ["Jual Makanan Ringan", "Jual Minuman", "Parkir Mobil / Motor", "Ruang Ganti Shower", "Toilet Tribun Penonton", "Toko Badminton"],
    regulations: [
      "WAJIB lepas alas kaki dari luar.",
      "WAJIB memakai sepatu badminton ketika bermain",
      "DILARANG Merokok",
      "DILARANG Meludah",
      "HINDARI membawa anak kecil karena resiko terluka",
      "Membawa anak kecil WAJIB ditertibkan",
      "DILARANG Bermain di Luar lapangan",
      "MAKSIMAL 10 orang per lapangan",
    ],
    activities: ["Badminton Training", "Amateur Tournaments", "Professional Coaching", "Youth Programs"],
    communities: [
      {
        id: "c1",
        name: "Pegasus Badminton",
        members: 124,
        image: require('./assets/pegasus.jpg'),
      },
      {
        id: "c2",
        name: "Badminton Tangerang Selatan",
        members: 87,
        image: require('./assets/badmintangsel.jpeg'),
      },
      {
        id: "c3",
        name: "Connexion Badminton",
        members: 156,
        image: require('./assets/connexion.jpeg'),
      },
    ],
    reviews: [
      {
        id: "r1",
        user: "Bernika Averina",
        userImage: require('./assets/bernika.jpeg'),
        rating: 5,
        comment: "Lapangannya Bagus! Permukaannya terawat dengan baik dan fasilitasnya bersih.",
        date: "2 days ago",
      },
      {
        id: "r2",
        user: "Nathanael Abednego",
        userImage: require('./assets/abednego.jpg'),
        rating: 4.9,
        comment: "Pencahayaan dan ventilasi yang baik. Direkomendasikan untuk pertandingan malam.",
        date: "1 week ago",
      },
      {
        id: "r3",
        user: "Greysia Polii",
        userImage: require('./assets/greysia.jpg'),
        rating: 4.5,
        comment: "Penataannya profesional. Stafnya ramah dan membantu.",
        date: "2 weeks ago",
      },
    ],
    nearbyVenues: [
      {
        id: "n1",
        name: "GOR PANCA PUTRA",
        image: require('./assets/pancaputra.jpg'),
        distance: "0.5 km",
        price: "Rp60.000,- /jam",
      },
      {
        id: "n2",
        name: "Dewantara Sports Center",
        image: require('./assets/dewantara.jpeg'),
        distance: "1.5 km",
        price: "Rp2.000.000,- /jam",
      },
      {
        id: "n3",
        name: "Matrix Badminton Hall",
        image: require('./assets/matrixbadminton.jpeg'),
        distance: "4.0 km",
        price: "Rp80.000,- /jam",
      },
      {
        id: "n4",
        name: "DM Sports Ciledug",
        image: require('./assets/dmsport.jpg'),
        distance: "6.5 km",
        price: "Rp2.000.000,- /jam",
      },
    ],
    hourlyRate: "Rp59.000,- /jam",
    openHours: "6:00 AM - 11:00 PM",
    address: "Sebelah SPBU dan KFC, Jl. Buaran raya, Buaran, Kec. Serpong, Kota Tangerang Selatan, Banten 15310",
    images: [
      require('./assets/rekket.jpg'),
      require('./assets/rekket2.jpg'),
      require('./assets/rekket3.jpg'),
      require('./assets/rekket4.jpeg'),
    ],
  }

  const renderImageItem = ({ item, index }: { item: any; index: number }) => (
    <Image source={item} style={styles.venueImage} resizeMode="cover" />
  )

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

  const renderCommunityItem = ({ item }: { item: Community }) => (
    <TouchableOpacity style={styles.communityCard}>
      <Image source={item.image} style={styles.communityImage} />
      <Text style={styles.communityName}>{item.name}</Text>
      <Text style={styles.communityMembers}>{item.members} members</Text>
    </TouchableOpacity>
  )

  const renderNearbyVenueItem = ({ item }: { item: NearbyVenue }) => (
    <TouchableOpacity style={styles.nearbyVenueCard}>
      <Image source={item.image} style={styles.nearbyVenueImage} />
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
                source={require('./assets/lokasirekket.jpg')}
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
                  <Image source={review.userImage} style={styles.reviewUserImage} />
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
    backgroundColor: "rgba(155, 0, 0, 0.1)",
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
    backgroundColor: "rgba(155, 0, 0, 0.1)",
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
    backgroundColor: "rgba(155, 0, 0, 0.1)",
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

