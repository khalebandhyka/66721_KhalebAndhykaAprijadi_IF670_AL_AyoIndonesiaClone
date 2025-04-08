import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const { width: SCREEN_WIDTH } = Dimensions.get("window")

const DatePickingScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  // Get venue data from route params
  const { venueName = "Basketball Court", venueImage = "https://placeholder.svg?height=100&width=100" } =
    route.params || {}

  // States for date and time selection
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [startTime, setStartTime] = useState<Date>(new Date())
  const [endTime, setEndTime] = useState<Date>(new Date())
  const [duration, setDuration] = useState<number>(1)


  // Modal states
  const [showStartTimePicker, setShowStartTimePicker] = useState(false)
  const [showEndTimePicker, setShowEndTimePicker] = useState(false)

  // Generate dates for the calendar (current month)
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())

    // Calculate duration whenever start or end time changes
    useEffect(() => {
        if (startTime && endTime) {
          // Calculate duration in hours
          const durationMs = endTime.getTime() - startTime.getTime()
          const durationHours = Math.max(Math.round(durationMs / (1000 * 60 * 60)), 0)
          setDuration(durationHours)
        }
      }, [startTime, endTime])

  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    const days = []

    // Add empty spaces for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: "", date: null, disabled: true })
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i)
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()

      const isPast = date < new Date(today.setHours(0, 0, 0, 0))

      days.push({
        day: i.toString(),
        date,
        isToday,
        disabled: isPast,
      })
    }

    return days
  }

  // Handle month navigation
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

// Handle date selection
const handleDateSelect = (date: Date | null) => {
    if (date) {
      // Create a new date object for the selected date
      const newSelectedDate = new Date(date)
      setSelectedDate(newSelectedDate)

      // Set default start time to 9:00 AM on the selected date
      const defaultStartTime = new Date(newSelectedDate)
      defaultStartTime.setHours(9, 0, 0, 0)
      setStartTime(defaultStartTime)

      // Set default end time to start time + 1 hour
      const defaultEndTime = new Date(defaultStartTime)
      defaultEndTime.setHours(defaultStartTime.getHours() + 1)
      setEndTime(defaultEndTime)

      // Show start time picker
      setShowStartTimePicker(true)
    }
  }

// Handle time changes
const handleStartTimeChange = (hours: number, minutes: number, isPM: boolean) => {
    if (selectedDate) {
      // Create a new date object with the selected date and time
      const newStartTime = new Date(selectedDate)

      // Convert 12-hour format to 24-hour format
      let hour24 = hours
      if (isPM && hours < 12) hour24 += 12
      if (!isPM && hours === 12) hour24 = 0

      newStartTime.setHours(hour24, minutes, 0, 0)
      setStartTime(newStartTime)

      // Update end time to be at least 1 hour after start time
      const newEndTime = new Date(newStartTime)
      newEndTime.setHours(newStartTime.getHours() + 1)
      setEndTime(newEndTime)
    }
  }

  const handleEndTimeChange = (hours: number, minutes: number, isPM: boolean) => {
    if (selectedDate) {
      const newEndTime = new Date(selectedDate)

      let hour24 = hours
      if (isPM && hours < 12) hour24 += 12
      if (!isPM && hours === 12) hour24 = 0

      newEndTime.setHours(hour24, minutes, 0, 0)

      if (newEndTime <= startTime) {
        newEndTime.setHours(startTime.getHours() + 1)
      }

      setEndTime(newEndTime)
    }
  }

  // Format time for display
  const formatTime = (date: Date) => {
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? "PM" : "AM"

    hours = hours % 12
    hours = hours ? hours : 12 

    const minutesStr = minutes < 10 ? "0" + minutes : minutes

    return `${hours}:${minutesStr} ${ampm}`
  }

  const goToConfirmation = () => {
    navigation.navigate("ConfirmationPage", {
      venueName,
      venueImage,
      selectedDate,
      startTime,
      endTime,
    })
  }

  const renderCalendar = () => {
    const days = generateCalendarDays()

    const weeks = []
    let week = []

    for (let i = 0; i < days.length; i++) {
      week.push(days[i])

      if (week.length === 7 || i === days.length - 1) {
        weeks.push(week)
        week = []
      }
    }

    return (
      <View style={styles.calendarContainer}>
        {/* Calendar header with month and navigation */}
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={goToPreviousMonth} style={styles.monthNavButton}>
            <Ionicons name="chevron-back" size={24} color="#9B0000" />
          </TouchableOpacity>
          <Text style={styles.monthYearText}>
            {MONTHS[currentMonth]} {currentYear}
          </Text>
          <TouchableOpacity onPress={goToNextMonth} style={styles.monthNavButton}>
            <Ionicons name="chevron-forward" size={24} color="#9B0000" />
          </TouchableOpacity>
        </View>

        {/* Days of week header */}
        <View style={styles.weekdaysHeader}>
          {DAYS.map((day) => (
            <Text key={day} style={styles.weekdayText}>
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar days */}
        {weeks.map((week, weekIndex) => (
          <View key={`week-${weekIndex}`} style={styles.weekRow}>
            {week.map((day, dayIndex) => (
              <TouchableOpacity
                key={`day-${weekIndex}-${dayIndex}`}
                style={[
                  styles.dayCell,
                  day.isToday && styles.todayCell,
                  selectedDate &&
                    day.date &&
                    selectedDate.getDate() === day.date.getDate() &&
                    selectedDate.getMonth() === day.date.getMonth() &&
                    selectedDate.getFullYear() === day.date.getFullYear() &&
                    styles.selectedDayCell,
                  day.disabled && styles.disabledDayCell,
                ]}
                onPress={() => (day.date && !day.disabled ? handleDateSelect(day.date) : null)}
                disabled={day.disabled || !day.date}
              >
                <Text
                  style={[
                    styles.dayText,
                    day.isToday && styles.todayText,
                    selectedDate &&
                      day.date &&
                      selectedDate.getDate() === day.date.getDate() &&
                      selectedDate.getMonth() === day.date.getMonth() &&
                      selectedDate.getFullYear() === day.date.getFullYear() &&
                      styles.selectedDayText,
                    day.disabled && styles.disabledDayText,
                  ]}
                >
                  {day.day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    )
  }

  // Render time selection info
  const renderTimeInfo = () => {
    if (!selectedDate) return null

    return (
      <View style={styles.timeInfoContainer}>
        <Text style={styles.timeInfoTitle}>Selected Date & Time</Text>

        <View style={styles.timeInfoRow}>
          <View style={styles.timeInfoItem}>
            <Text style={styles.timeInfoLabel}>Date</Text>
            <Text style={styles.timeInfoValue}>
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </View>
        </View>

        <View style={styles.timeInfoRow}>
          <View style={styles.timeInfoItem}>
            <Text style={styles.timeInfoLabel}>Start Time</Text>
            <TouchableOpacity style={styles.timePickerButton} onPress={() => setShowStartTimePicker(true)}>
              <Text style={styles.timePickerButtonText}>{formatTime(startTime)}</Text>
              <Ionicons name="time-outline" size={20} color="#9B0000" />
            </TouchableOpacity>
          </View>

          <View style={styles.timeInfoItem}>
            <Text style={styles.timeInfoLabel}>End Time</Text>
            <TouchableOpacity style={styles.timePickerButton} onPress={() => setShowEndTimePicker(true)}>
              <Text style={styles.timePickerButtonText}>{formatTime(endTime)}</Text>
              <Ionicons name="time-outline" size={20} color="#9B0000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.durationContainer}>
          <Text style={styles.durationLabel}>Duration:</Text>
          <Text style={styles.durationValue}>
            {Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60))} hours
          </Text>
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={goToConfirmation}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // Render time picker options
  const renderTimePickerOptions = (isStartTime: boolean) => {
    const currentTime = isStartTime ? startTime : endTime
    const setTime = isStartTime ? setStartTime : setEndTime

    // Hours array (1-12)
    const hours = Array.from({ length: 12 }, (_, i) => i + 1)

    // Minutes array (00, 15, 30, 45)
    const minutes = [0, 15, 30, 45]

    // AM/PM options
    const ampm = ["AM", "PM"]

    return (
      <View style={styles.timePickerOptionsContainer}>
        {/* Hours column */}
        <View style={styles.timePickerColumn}>
          <Text style={styles.timePickerColumnHeader}>Hour</Text>
          <View style={styles.timePickerOptionsWrapper}>
            {hours.map((hour) => {
              const isSelected =
                (currentTime.getHours() % 12 === hour % 12 && currentTime.getHours() % 12 !== 0) ||
                (currentTime.getHours() % 12 === 0 && hour === 12)

              return (
                <TouchableOpacity
                  key={`hour-${hour}`}
                  style={[styles.timePickerOption, isSelected && styles.timePickerOptionSelected]}
                  onPress={() => {
                    const newTime = new Date(currentTime)
                    const isPM = currentTime.getHours() >= 12
                    newTime.setHours(hour === 12 ? (isPM ? 12 : 0) : isPM ? hour + 12 : hour)
                    setTime(newTime)
                  }}
                >
                  <Text style={[styles.timePickerOptionText, isSelected && styles.timePickerOptionTextSelected]}>
                    {hour}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        {/* Minutes column */}
        <View style={styles.timePickerColumn}>
          <Text style={styles.timePickerColumnHeader}>Minute</Text>
          <View style={styles.timePickerOptionsWrapper}>
            {minutes.map((minute) => {
              const isSelected = currentTime.getMinutes() === minute

              return (
                <TouchableOpacity
                  key={`minute-${minute}`}
                  style={[styles.timePickerOption, isSelected && styles.timePickerOptionSelected]}
                  onPress={() => {
                    const newTime = new Date(currentTime)
                    newTime.setMinutes(minute)
                    setTime(newTime)
                  }}
                >
                  <Text style={[styles.timePickerOptionText, isSelected && styles.timePickerOptionTextSelected]}>
                    {minute.toString().padStart(2, "0")}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        {/* AM/PM column */}
        <View style={styles.timePickerColumn}>
          <Text style={styles.timePickerColumnHeader}>AM/PM</Text>
          <View style={styles.timePickerOptionsWrapper}>
            {ampm.map((period) => {
              const isSelected =
                (period === "AM" && currentTime.getHours() < 12) || (period === "PM" && currentTime.getHours() >= 12)

              return (
                <TouchableOpacity
                  key={`period-${period}`}
                  style={[styles.timePickerOption, isSelected && styles.timePickerOptionSelected]}
                  onPress={() => {
                    const newTime = new Date(currentTime)
                    if (period === "AM" && currentTime.getHours() >= 12) {
                      newTime.setHours(currentTime.getHours() - 12)
                    } else if (period === "PM" && currentTime.getHours() < 12) {
                      newTime.setHours(currentTime.getHours() + 12)
                    }
                    setTime(newTime)
                  }}
                >
                  <Text style={[styles.timePickerOptionText, isSelected && styles.timePickerOptionTextSelected]}>
                    {period}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Date & Time</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Venue info */}
          <View style={styles.venueInfoContainer}>
            <Text style={styles.venueInfoTitle}>Booking for</Text>
            <Text style={styles.venueName}>{venueName}</Text>
          </View>

          {/* Calendar */}
          {renderCalendar()}

          {/* Time info */}
          {renderTimeInfo()}
        </View>
      </ScrollView>

      {/* Start Time Picker Modal */}
      <Modal visible={showStartTimePicker} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Start Time</Text>
              <TouchableOpacity onPress={() => setShowStartTimePicker(false)} style={styles.modalCloseButton}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {renderTimePickerOptions(true)}

            <View style={styles.selectedTimeDisplay}>
              <Text style={styles.selectedTimeText}>{formatTime(startTime)}</Text>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalBackButton} onPress={() => setShowStartTimePicker(false)}>
                <Text style={styles.modalBackButtonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalNextButton}
                onPress={() => {
                  setShowStartTimePicker(false)
                  setShowEndTimePicker(true)
                }}
              >
                <Text style={styles.modalNextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* End Time Picker Modal */}
      <Modal visible={showEndTimePicker} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select End Time</Text>
              <TouchableOpacity onPress={() => setShowEndTimePicker(false)} style={styles.modalCloseButton}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {renderTimePickerOptions(false)}

            <View style={styles.selectedTimeDisplay}>
              <Text style={styles.selectedTimeText}>{formatTime(endTime)}</Text>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalBackButton}
                onPress={() => {
                  setShowEndTimePicker(false)
                  setShowStartTimePicker(true)
                }}
              >
                <Text style={styles.modalBackButtonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalNextButton}
                onPress={() => {
                  setShowEndTimePicker(false)
                }}
              >
                <Text style={styles.modalNextButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  headerRight: {
    width: 40,
  },
  content: {
    padding: 16,
  },
  venueInfoContainer: {
    marginBottom: 24,
  },
  venueInfoTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  venueName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  calendarContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  monthNavButton: {
    padding: 8,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  weekdaysHeader: {
    flexDirection: "row",
    marginBottom: 8,
  },
  weekdayText: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  todayCell: {
    backgroundColor: "#f0f0f0",
  },
  selectedDayCell: {
    backgroundColor: "#9B0000",
  },
  disabledDayCell: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 16,
    color: "#333",
  },
  todayText: {
    fontWeight: "bold",
    color: "#9B0000",
  },
  selectedDayText: {
    color: "#fff",
    fontWeight: "bold",
  },
  disabledDayText: {
    color: "#999",
  },
  timeInfoContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timeInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  timeInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  timeInfoItem: {
    flex: 1,
    marginRight: 8,
  },
  timeInfoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  timeInfoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  timePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  timePickerButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  durationLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
  },
  durationValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  continueButton: {
    backgroundColor: "#9B0000",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  modalCloseButton: {
    padding: 4,
  },
  timePickerOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  timePickerColumn: {
    width: "30%",
    alignItems: "center",
  },
  timePickerColumnHeader: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    fontWeight: "500",
  },
  timePickerOptionsWrapper: {
    alignItems: "center",
  },
  timePickerOption: {
    width: 70,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
    borderRadius: 8,
  },
  timePickerOptionSelected: {
    backgroundColor: "#9B0000",
  },
  timePickerOptionText: {
    fontSize: 18,
    color: "#333",
  },
  timePickerOptionTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  selectedTimeDisplay: {
    alignItems: "center",
    marginBottom: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  selectedTimeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalBackButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#9B0000",
    borderRadius: 12,
  },
  modalBackButtonText: {
    color: "#9B0000",
    fontSize: 16,
    fontWeight: "600",
  },
  modalNextButton: {
    flex: 1,
    backgroundColor: "#9B0000",
    paddingVertical: 16,
    alignItems: "center",
    marginLeft: 8,
    borderRadius: 12,
  },
  modalNextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default DatePickingScreen

