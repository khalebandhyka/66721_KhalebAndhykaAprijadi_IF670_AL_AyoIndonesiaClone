import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

// Define the hourly rate for the venue
const HOURLY_RATE = 59000 // In Indonesian Rupiah (Rp)

const ConfirmationPage: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  // Get data from route params
  const {
    venueName = "Rekket Space BSD",
    venueLocation = "KOTA TANGERANG SELATAN",
    selectedDate,
    startTime,
    endTime,
  } = route.params || {}

  // Calculate duration in hours
  const durationMs = endTime ? endTime.getTime() - startTime.getTime() : 0
  const durationHours = Math.max(Math.round(durationMs / (1000 * 60 * 60)), 1)

  // Calculate total price
  const totalPrice = durationHours * HOURLY_RATE

  // Format date for display
  const formatDate = (date: Date) => {
    if (!date) return "N/A"

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const day = days[date.getDay()]
    const dateNum = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${day}, ${dateNum} ${month} ${year}`
  }

  // Format time for display (24-hour format)
  const formatTime = (date: Date) => {
    if (!date) return "N/A"

    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")

    return `${hours}:${minutes}`
  }

  // Generate time slots based on start and end time
  const generateTimeSlots = () => {
    if (!startTime || !endTime) return []

    const slots = []
    const currentTime = new Date(startTime)

    while (currentTime < endTime) {
      const slotStart = new Date(currentTime)
      currentTime.setHours(currentTime.getHours() + 1)
      const slotEnd = new Date(currentTime)

      slots.push({
        start: slotStart,
        end: slotEnd,
        price: HOURLY_RATE,
      })
    }

    return slots
  }

  const timeSlots = generateTimeSlots()

  // Handle payment selection
  const handleSelectPayment = () => {
    // Navigate to payment screen (to be implemented)
    navigation.navigate("PaymentMethod", {
      venueName,
      selectedDate,
      startTime,
      endTime,
      totalPrice,
    })
  }

  // Handle edit booking
  const handleEditBooking = () => {
    navigation.goBack()
  }

  // Handle delete booking
  const handleDeleteBooking = () => {
    // Show confirmation dialog and handle deletion
    // For now, just go back to previous screen
    navigation.goBack()
  }

  // Handle add booking
  const handleAddBooking = () => {
    navigation.goBack()
  }

  // Handle check schedule
  const handleCheckSchedule = () => {
    // Implementation for checking schedule
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9B0000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressItem}>
          <View style={styles.progressIconCompleted}>
            <Ionicons name="calendar-outline" size={20} color="#fff" />
          </View>
          <Text style={styles.progressTextCompleted}>Select{"\n"}Schedule</Text>
        </View>

        <View style={styles.progressLine} />

        <View style={styles.progressItem}>
          <View style={styles.progressIconActive}>
            <Ionicons name="document-text-outline" size={20} color="#fff" />
          </View>
          <Text style={styles.progressTextActive}>Review{"\n"}Order</Text>
        </View>

        <View style={styles.progressLine} />

        <View style={styles.progressItem}>
          <View style={styles.progressIconInactive}>
            <Ionicons name="card-outline" size={20} color="#fff" />
          </View>
          <Text style={styles.progressTextInactive}>Payment</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Venue Info Card */}
          <View style={styles.venueCard}>
            <Text style={styles.venueName}>{venueName}</Text>
            <View style={styles.venueRating}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.venueRatingText}>4.9</Text>
              <Text style={styles.venueLocation}> • {venueLocation}</Text>
            </View>
          </View>

          {/* Booked Schedule Card */}
          <View style={styles.scheduleCard}>
            <Text style={styles.sectionTitle}>Booked Schedule</Text>
            <View style={styles.divider} />

            <Text style={styles.courtTitle}>Court 1</Text>
            <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>

            {timeSlots.map((slot, index) => (
              <View key={index} style={styles.timeSlotRow}>
                <View style={styles.timeSlotIndicator} />
                <Text style={styles.timeSlotText}>
                  {formatTime(slot.start)} - {formatTime(slot.end)}
                </Text>
                <Text style={styles.timeSlotPrice}>Rp {slot.price.toLocaleString()}</Text>
              </View>
            ))}

            <View style={styles.actionButtonsRow}>
              <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteBooking}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.editButton} onPress={handleEditBooking}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Add Booking Button */}
          <TouchableOpacity style={styles.addBookingButton} onPress={handleAddBooking}>
            <Ionicons name="add" size={20} color="#9B0000" />
            <Text style={styles.addBookingText}>Add Booking</Text>
          </TouchableOpacity>

          {/* Use Vouchers Button */}
          <TouchableOpacity style={styles.voucherButton}>
            <View style={styles.voucherButtonLeft}>
              <Ionicons name="ticket-outline" size={20} color="#9B0000" />
              <Text style={styles.voucherButtonText}>Use Vouchers</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          {/* Payment Summary Card */}
          <View style={styles.paymentSummaryCard}>
            <Text style={styles.sectionTitle}>Payment Summary</Text>
            <View style={styles.divider} />

            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Rental Cost</Text>
              <Text style={styles.paymentValue}>Rp {totalPrice.toLocaleString()}</Text>
            </View>

            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Add-on Charges</Text>
              <Text style={styles.paymentValue}>Rp 0</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>Rp {totalPrice.toLocaleString()}</Text>
            </View>

            <TouchableOpacity style={styles.viewDetailsButton}>
              <Text style={styles.viewDetailsText}>View Details</Text>
              <Ionicons name="chevron-forward" size={20} color="#9B0000" />
            </TouchableOpacity>
          </View>

          {/* Set Payment Card */}
          <View style={styles.setPaymentCard}>
            <Text style={styles.sectionTitle}>Set Payment</Text>
            <View style={styles.divider} />

            <View style={styles.paymentOptionRow}>
              <View style={styles.radioButtonContainer}>
                <View style={styles.radioButtonOuter}>
                  <View style={styles.radioButtonInner} />
                </View>
              </View>
              <View style={styles.paymentOptionContent}>
                <Text style={styles.paymentOptionLabel}>Pay in Full</Text>
                <Text style={styles.paymentOptionValue}>Rp {totalPrice.toLocaleString()}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.rescheduleButton}>
              <View style={styles.rescheduleButtonLeft}>
                <View style={styles.warningIcon}>
                  <Ionicons name="alert" size={16} color="#fff" />
                </View>
                <Text style={styles.rescheduleButtonText}>Reschedule</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Payment Button */}
      <View style={styles.bottomContainer}>
        <View style={styles.bottomTotalContainer}>
          <Text style={styles.bottomTotalLabel}>Total Cost</Text>
          <Text style={styles.bottomTotalValue}>Rp {totalPrice.toLocaleString()}</Text>
        </View>
        <TouchableOpacity style={styles.selectPaymentButton} onPress={handleSelectPayment}>
          <Text style={styles.selectPaymentButtonText}>Select Payment</Text>
        </TouchableOpacity>
      </View>
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
  headerRight: {
    width: 40,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#9B0000",
  },
  progressItem: {
    alignItems: "center",
  },
  progressIconCompleted: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  progressIconActive: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  progressIconInactive: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  progressTextCompleted: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginTop: 4,
  },
  progressTextActive: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 4,
  },
  progressTextInactive: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
    marginTop: 4,
  },
  progressLine: {
    height: 1,
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 8,
  },
  content: {
    padding: 16,
  },
  venueCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  venueName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  venueRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  venueRatingText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 4,
  },
  venueLocation: {
    fontSize: 14,
    color: "#666",
  },
  scheduleCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginBottom: 16,
  },
  courtTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  timeSlotRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  timeSlotIndicator: {
    width: 4,
    height: 20,
    backgroundColor: "#9B0000",
    borderRadius: 2,
    marginRight: 12,
  },
  timeSlotText: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  timeSlotPrice: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  deleteButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginRight: 8,
  },
  deleteButtonText: {
    fontSize: 14,
    color: "#333",
  },
  editButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginLeft: 8,
  },
  editButtonText: {
    fontSize: 14,
    color: "#333",
  },
  addBookingButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  addBookingText: {
    fontSize: 14,
    color: "#9B0000",
    fontWeight: "500",
    marginLeft: 8,
  },
  voucherButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  voucherButtonLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  voucherButtonText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
  },
  paymentSummaryCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  paymentLabel: {
    fontSize: 14,
    color: "#666",
  },
  paymentValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  viewDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewDetailsText: {
    fontSize: 14,
    color: "#9B0000",
    fontWeight: "500",
  },
  setPaymentCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 80,
  },
  paymentOptionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  radioButtonContainer: {
    marginRight: 12,
  },
  radioButtonOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#9B0000",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#9B0000",
  },
  paymentOptionContent: {
    flex: 1,
  },
  paymentOptionLabel: {
    fontSize: 14,
    color: "#333",
  },
  paymentOptionValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  rescheduleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 16,
  },
  rescheduleButtonLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  warningIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  rescheduleButtonText: {
    fontSize: 14,
    color: "#333",
  },
  checkScheduleContainer: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
  },
  checkScheduleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  checkScheduleText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomTotalContainer: {
    flex: 1,
  },
  bottomTotalLabel: {
    fontSize: 12,
    color: "#666",
  },
  bottomTotalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  selectPaymentButton: {
    backgroundColor: "#9B0000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  selectPaymentButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
})

export default ConfirmationPage

