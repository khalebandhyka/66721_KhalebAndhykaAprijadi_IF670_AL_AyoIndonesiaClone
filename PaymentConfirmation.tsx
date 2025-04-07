import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const PaymentConfirmation: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  // Get data from route params
  const {
    paymentMethod = "virtual_account",
    totalPrice = 123000,
    orderId = "AYOIN2504070000793",
    accountNumber = "3816532811757016",
    venueName = "Rekket Space BSD",
    venueAddress = "Jalan Buaran viktor, BSD, Tangerang Selatan. Sebelah SPBU Pertamina dan KFC",
    courtNumber = "Court 2",
    bookingSlots = [
      {
        date: "Selasa, 8 April 2025",
        startTime: "10:00",
        endTime: "11:00",
        bookingId: "BK/0556/250407/0002721",
      },
      {
        date: "Selasa, 8 April 2025",
        startTime: "11:00",
        endTime: "12:00",
        bookingId: "BK/0556/250407/0002722",
      },
    ],
  } = route.params || {}

  // Handle copy account number
  const handleCopy = () => {
    // Implementation for copying to clipboard
  }

  // Handle return to home
  const handleReturnHome = () => {
    navigation.navigate("MainTabs")
  }

  // Handle book another venue
  const handleBookAnotherVenue = () => {
    navigation.navigate("VenueBookingScreen")
  }

  // Handle help
  const handleHelp = () => {
    // Implementation for help
  }

  // Handle view payment details
  const handleViewPaymentDetails = () => {
    // Implementation for viewing payment details
  }

  // Handle directions
  const handleDirections = () => {
    // Implementation for directions
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9B0000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Detail</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Payment Status Card */}
          <View style={styles.paymentStatusCard}>
            <View style={styles.paymentStatusRow}>
              <Text style={styles.paymentStatusText}>Payment Complete</Text>
              <View style={styles.successIcon}>
                <Ionicons name="checkmark" size={20} color="#fff" />
              </View>
            </View>

            <View style={styles.orderIdRow}>
              <Text style={styles.orderIdLabel}>Order ID</Text>
              <Text style={styles.orderIdValue}>{orderId}</Text>
            </View>

            {/* Payment Method Details */}
            <View style={styles.paymentMethodCard}>
              <View style={styles.paymentMethodRow}>
                <Image
                  source={{ uri: "https://placeholder.svg?height=30&width=60&text=BCA" }}
                  style={styles.bankLogo}
                />
                <Text style={styles.accountNumber}>{accountNumber}</Text>
              </View>
              <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
                <Ionicons name="copy-outline" size={16} color="#9B0000" />
                <Text style={styles.copyButtonText}>Copy</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.totalPaymentRow} onPress={handleViewPaymentDetails}>
              <Text style={styles.totalPaymentLabel}>Total Payment</Text>
              <View style={styles.totalPaymentRight}>
                <Text style={styles.totalPaymentValue}>Rp {totalPrice.toLocaleString()}</Text>
                <Ionicons name="chevron-down" size={16} color="#666" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Booking Details */}
          <View style={styles.bookingDetailsSection}>
            <Text style={styles.sectionTitle}>Booking Details</Text>

            <View style={styles.venueInfoCard}>
              <View style={styles.venueNameRow}>
                <View style={styles.venueIndicator} />
                <Text style={styles.venueName}>{venueName}</Text>
              </View>

              <Text style={styles.venueAddress}>{venueAddress}</Text>

              <TouchableOpacity onPress={handleDirections}>
                <Text style={styles.directionsLink}>Directions</Text>
              </TouchableOpacity>

              <Text style={styles.courtTitle}>{courtNumber}</Text>

              {bookingSlots.map((slot, index) => (
                <View key={index} style={styles.bookingSlotCard}>
                  <View style={styles.bookingSlotIndicator} />
                  <View style={styles.bookingSlotContent}>
                    <Text style={styles.bookingSlotDateTime}>
                      {slot.date} • {slot.startTime} - {slot.endTime}
                    </Text>
                    <Text style={styles.bookingSlotId}>{slot.bookingId}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Action Buttons */}
            <TouchableOpacity style={styles.primaryButton} onPress={handleReturnHome}>
              <Text style={styles.primaryButtonText}>Return to Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={handleBookAnotherVenue}>
              <Text style={styles.secondaryButtonText}>Book Another Venue</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tertiaryButton} onPress={handleHelp}>
              <Text style={styles.tertiaryButtonText}>Help</Text>
            </TouchableOpacity>

            <Text style={styles.csHoursText}>CS Operational Hours: Monday-Saturday from 09:00-21:00 WIB</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#9B0000",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  menuButton: {
    padding: 8,
  },
  content: {
    padding: 16,
  },
  paymentStatusCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  paymentStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  paymentStatusText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  successIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  orderIdRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  orderIdLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
  },
  orderIdValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  paymentMethodCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  paymentMethodRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  bankLogo: {
    width: 60,
    height: 30,
    marginRight: 12,
    borderRadius: 4,
  },
  accountNumber: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  copyButtonText: {
    fontSize: 14,
    color: "#9B0000",
    fontWeight: "500",
    marginLeft: 4,
  },
  totalPaymentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalPaymentLabel: {
    fontSize: 14,
    color: "#666",
  },
  totalPaymentRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalPaymentValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 4,
  },
  divider: {
    height: 8,
    backgroundColor: "#f0f0f0",
    marginVertical: 16,
  },
  bookingDetailsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  venueInfoCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  venueNameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  venueIndicator: {
    width: 4,
    height: 20,
    backgroundColor: "#9B0000",
    borderRadius: 2,
    marginRight: 12,
  },
  venueName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  venueAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    marginLeft: 16,
  },
  directionsLink: {
    fontSize: 14,
    color: "#9B0000",
    fontWeight: "500",
    marginBottom: 16,
    marginLeft: 16,
  },
  courtTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  bookingSlotCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  bookingSlotIndicator: {
    width: 4,
    height: 40,
    backgroundColor: "#9B0000",
    borderRadius: 2,
    marginRight: 12,
  },
  bookingSlotContent: {
    flex: 1,
  },
  bookingSlotDateTime: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  bookingSlotId: {
    fontSize: 12,
    color: "#666",
  },
  primaryButton: {
    backgroundColor: "#9B0000",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#9B0000",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9B0000",
  },
  tertiaryButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  tertiaryButtonText: {
    fontSize: 16,
    color: "#333",
  },
  csHoursText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
})

export default PaymentConfirmation

