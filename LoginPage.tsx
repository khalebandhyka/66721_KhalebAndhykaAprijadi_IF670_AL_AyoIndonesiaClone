import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

const LoginPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleLogin = () => {
    if (email === "ayo.guest@gmail.com" && password === "ayoguest123") {
      navigation.navigate("MainTabs")
      setErrorMessage("")
    } else {
      setErrorMessage("Invalid email or password")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Login</Text>
            </View>

            {/* Login Form */}
            <View style={styles.form}>
              {/* Email Input */}
              <Text style={styles.inputLabel}>Phone or Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              {/* Password Input */}
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#999" />
                </TouchableOpacity>
                <View style={styles.dividerVertical} />
                <TouchableOpacity style={styles.forgotButton}>
                  <Text style={styles.forgotText}>Forgot</Text>
                </TouchableOpacity>
              </View>

              {/* Error Message */}
              {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

              {/* Login Button */}
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              {/* Social Login Options */}
              <TouchableOpacity style={styles.socialButton}>
                <Image source={require("./assets/gogel.jpg")} style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>Sign in with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <Image source={require("./assets/apel.jpg")} style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>Sign in with Apple</Text>
              </TouchableOpacity>
            </View>

            {/* Terms and Conditions */}
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By sign in you agree to the <Text style={styles.termsLink}>Terms & Conditions</Text> and{" "}
                <Text style={styles.termsLink}>Privacy Policy</Text> of AYO Indonesia.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 14,
    color: "#999",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 24,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    padding: 10,
  },
  dividerVertical: {
    width: 1,
    height: 30,
    backgroundColor: "#ddd",
  },
  forgotButton: {
    paddingHorizontal: 16,
  },
  forgotText: {
    color: "#9B0000",
    fontSize: 14,
    fontWeight: "500",
  },
  errorText: {
    color: "#9B0000",
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: "#9B0000",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 12,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  socialButtonText: {
    fontSize: 16,
    color: "#666",
  },
  termsContainer: {
    marginTop: "auto",
    paddingVertical: 20,
  },
  termsText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  termsLink: {
    color: "#9B0000",
  },
})

export default LoginPage
