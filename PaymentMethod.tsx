"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"

// Define payment methods with their fees
const PAYMENT_METHODS = [
  {
    id: "virtual_account",
    name: "Virtual Account",
    fee: 0,
    icon: "https://placeholder.svg?height=40&width=40&text=VA",
    isExpandable: true,
  },
  {
    id: "alfamart",
    name: "Alfamart",
    fee: 6500,
    icon: "https://placeholder.svg?height=40&width=40&text=Alfa",
  },
  {
    id: "gopay",
    name: "GoPay",
    fee: 4068,
    icon: "https://placeholder.svg?height=40&width=40&text=GP",
  },
  {
    id: "shopeepay",
    name: "ShopeePay",
    fee: 3714,
    icon: "https://placeholder.svg?height=40&width=40&text=SP",
  },
  {
    id: "ovo",
    name: "OVO",
    fee: 3478,
    icon: "https://placeholder.svg?height=40&width=40&text=OVO",
    disabled: true,
    disabledReason: "OVO is Currently under maintenance, please use another payment option.",
  },
  {
    id: "dana",
    name: "DANA",
    fee: 3478,
    icon: "https://placeholder.svg?height=40&width=40&text=DANA",
  },
  {
    id: "qris",
    name: "QRIS",
    fee: 2770,
    icon: "https://placeholder.svg?height=40&width=40&text=QRIS",
  },
  {
    id: "credit_card",
    name: "Kartu Kredit",
    fee: 7148,
    icon: "https://placeholder.svg?height=40&width=40&text=CC",
  },
]

const PaymentMethod: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  // Get total price from route params
  const { totalPrice = 118000 } = route.params || {}

  // State for selected payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("virtual_account")

  // Handle payment method selection
  const handleSelectPaymentMethod = (id: string) => {
    setSelectedPaymentMethod(id)
  }

  // Handle pay button press
  const handlePay = () => {
    // Navigate to payment confirmation or processing screen
    navigation.navigate("PaymentConfirmation", {
      paymentMethod: selectedPaymentMethod,
      totalPrice,
    })
  }

  // Handle view details
  const handleViewDetails = () => {
    // Implementation for viewing payment details
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9B0000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
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
          <View style={styles.progressIconCompleted}>
            <Ionicons name="document-text-outline" size={20} color="#fff" />
          </View>
          <Text style={styles.progressTextCompleted}>Review{"\n"}Order</Text>
        </View>

        <View style={styles.progressLine} />

        <View style={styles.progressItem}>
          <View style={styles.progressIconActive}>
            <Ionicons name="card-outline" size={20} color="#fff" />
          </View>
          <Text style={styles.progressTextActive}>Payment</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Total Payment Card */}
        <View style={styles.totalPaymentCard}>
          <View style={styles.totalPaymentContent}>
            <View>
              <Text style={styles.totalPaymentLabel}>Total Payment</Text>
              <Text style={styles.totalPaymentValue}>Rp {totalPrice.toLocaleString()}</Text>
            </View>
            <TouchableOpacity onPress={handleViewDetails}>
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Method Section */}
        <View style={styles.paymentMethodSection}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          {/* Payment Method Options */}
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[styles.paymentMethodCard, method.disabled && styles.paymentMethodCardDisabled]}
              onPress={() => !method.disabled && handleSelectPaymentMethod(method.id)}
              disabled={method.disabled}
            >
              <View style={styles.paymentMethodLeft}>
                <Image source={{ uri: method.icon }} style={styles.paymentMethodIcon} />
                <View style={styles.paymentMethodInfo}>
                  <Text style={styles.paymentMethodName}>{method.name}</Text>
                  {method.fee > 0 && <Text style={styles.paymentMethodFee}>Rp {method.fee.toLocaleString()}</Text>}
                </View>
              </View>

              <View
                style={[
                  styles.radioButton,
                  selectedPaymentMethod === method.id && styles.radioButtonSelected,
                  method.disabled && styles.radioButtonDisabled,
                ]}
              >
                {selectedPaymentMethod === method.id && !method.disabled && <View style={styles.radioButtonInner} />}
              </View>

              {method.isExpandable && selectedPaymentMethod === method.id && (
                <Ionicons name="chevron-down" size={20} color="#666" style={styles.expandIcon} />
              )}
            </TouchableOpacity>
          ))}

          {/* Disabled Method Message */}
          {PAYMENT_METHODS.find((m) => m.id === "ovo")?.disabled && (
            <View style={styles.disabledMessageContainer}>
              <Ionicons name="alert-circle" size={16} color="#F5A623" />
              <Text style={styles.disabledMessageText}>
                {PAYMENT_METHODS.find((m) => m.id === "ovo")?.disabledReason}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Secure Payment Text */}
      <View style={styles.securePaymentContainer}>
        <Ionicons name="lock-closed" size={14} color="#999" />
        <Text style={styles.securePaymentText}>Secure Payment</Text>
      </View>

      {/* Pay Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.payButtonText}>Pay</Text>
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
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  progressIconActive: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
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
  progressLine: {
    height: 1,
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 8,
  },
  totalPaymentCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    marginTop: 20,
  },
  totalPaymentContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalPaymentLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  totalPaymentValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  viewDetailsText: {
    fontSize: 14,
    color: "#9B0000",
    fontWeight: "500",
  },
  paymentMethodSection: {
    paddingHorizontal: 16,
    marginBottom: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  paymentMethodCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  paymentMethodCardDisabled: {
    opacity: 0.7,
  },
  paymentMethodLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 12,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  paymentMethodFee: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#9B0000",
  },
  radioButtonDisabled: {
    borderColor: "#ccc",
    backgroundColor: "#f0f0f0",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#9B0000",
  },
  expandIcon: {
    position: "absolute",
    right: 40,
  },
  disabledMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9E6",
    borderRadius: 8,
    padding: 12,
    marginTop: -4,
    marginBottom: 8,
  },
  disabledMessageText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8,
    flex: 1,
  },
  securePaymentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
  },
  securePaymentText: {
    fontSize: 12,
    color: "#999",
    marginLeft: 4,
  },
  bottomContainer: {
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
  payButton: {
    backgroundColor: "#9B0000",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default PaymentMethod

