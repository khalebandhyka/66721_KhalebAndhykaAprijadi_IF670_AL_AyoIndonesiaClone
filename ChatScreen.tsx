// ChatScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { 
  Ionicons, 
  MaterialIcons, 
  FontAwesome5, 
  Feather, 
  AntDesign 
} from '@expo/vector-icons';

// Message interface
interface Message {
  id: string;
  text: string;
  sender: string;
  time: string;
  isMe: boolean;
}

// Community chat data
interface ChatItem {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isCommunity?: boolean;
  members?: number;
  messages?: Message[];
}

const communityChats: ChatItem[] = [
  {
    id: 'c1',
    name: 'Futsal Jakarta Barat',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/S__539877413_0.jpg-Yt0rh6SilEaHD3bauyH2QcyOeS7F4Y.jpeg',
    lastMessage: 'Ada yang mau main besok jam 7 malam?',
    time: '10:30 AM',
    unread: 3,
    isCommunity: true,
    members: 128,
    messages: [
      {
        id: 'c1m1',
        text: 'Halo semua, ada yang mau main futsal besok?',
        sender: 'Ahmad',
        time: '10:30 AM',
        isMe: false,
      },
      {
        id: 'c1m2',
        text: 'Saya bisa, jam berapa?',
        sender: 'You',
        time: '10:32 AM',
        isMe: true,
      },
      {
        id: 'c1m3',
        text: 'Jam 7 malam di Futsal Center Kemayoran',
        sender: 'Ahmad',
        time: '10:33 AM',
        isMe: false,
      },
      {
        id: 'c1m4',
        text: 'Saya ikut juga',
        sender: 'Budi',
        time: '10:35 AM',
        isMe: false,
      },
      {
        id: 'c1m5',
        text: 'Oke, sampai ketemu besok',
        sender: 'You',
        time: '10:36 AM',
        isMe: true,
      },
    ]
  },
  {
    id: 'c2',
    name: 'Badminton Lovers',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/S__539877413_0.jpg-Yt0rh6SilEaHD3bauyH2QcyOeS7F4Y.jpeg',
    lastMessage: 'Siapa yang mau ikut turnamen minggu depan?',
    time: 'Yesterday',
    unread: 0,
    isCommunity: true,
    members: 95,
    messages: [
      {
        id: 'c2m1',
        text: 'Siapa yang mau ikut turnamen badminton minggu depan?',
        sender: 'Dewi',
        time: 'Yesterday',
        isMe: false,
      },
      {
        id: 'c2m2',
        text: 'Turnamen apa ya?',
        sender: 'You',
        time: 'Yesterday',
        isMe: true,
      },
      {
        id: 'c2m3',
        text: 'Turnamen antar komunitas di GOR Senayan',
        sender: 'Dewi',
        time: 'Yesterday',
        isMe: false,
      },
      {
        id: 'c2m4',
        text: 'Saya tertarik, biaya pendaftarannya berapa?',
        sender: 'You',
        time: 'Yesterday',
        isMe: true,
      },
    ]
  },
  {
    id: 'c3',
    name: 'Basketball Jakarta',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/S__539877413_0.jpg-Yt0rh6SilEaHD3bauyH2QcyOeS7F4Y.jpeg',
    lastMessage: 'Lapangan di Senayan sudah dibuka lagi',
    time: 'Yesterday',
    unread: 5,
    isCommunity: true,
    members: 210,
    messages: [
      {
        id: 'c3m1',
        text: 'Lapangan basket di Senayan sudah dibuka lagi setelah renovasi',
        sender: 'Rudi',
        time: 'Yesterday',
        isMe: false,
      },
      {
        id: 'c3m2',
        text: 'Wah, bagus! Kapan kita main?',
        sender: 'Andi',
        time: 'Yesterday',
        isMe: false,
      },
      {
        id: 'c3m3',
        text: 'Bagaimana kalau Sabtu ini?',
        sender: 'Rudi',
        time: 'Yesterday',
        isMe: false,
      },
      {
        id: 'c3m4',
        text: 'Saya bisa ikut kalau Sabtu sore',
        sender: 'You',
        time: 'Yesterday',
        isMe: true,
      },
      {
        id: 'c3m5',
        text: 'Oke, jam 4 sore ya',
        sender: 'Rudi',
        time: 'Yesterday',
        isMe: false,
      },
    ]
  },
  {
    id: 'c4',
    name: 'Futsal Tangerang',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/S__539877413_0.jpg-Yt0rh6SilEaHD3bauyH2QcyOeS7F4Y.jpeg',
    lastMessage: 'Siapa yang mau gabung tim untuk kompetisi bulan depan?',
    time: 'Monday',
    unread: 0,
    isCommunity: true,
    members: 87,
    messages: [
      {
        id: 'c4m1',
        text: 'Siapa yang mau gabung tim untuk kompetisi bulan depan?',
        sender: 'Joko',
        time: 'Monday',
        isMe: false,
      },
      {
        id: 'c4m2',
        text: 'Kompetisi apa?',
        sender: 'Dani',
        time: 'Monday',
        isMe: false,
      },
      {
        id: 'c4m3',
        text: 'Futsal Cup Tangerang 2023',
        sender: 'Joko',
        time: 'Monday',
        isMe: false,
      },
      {
        id: 'c4m4',
        text: 'Saya tertarik, kapan mulainya?',
        sender: 'You',
        time: 'Monday',
        isMe: true,
      },
    ]
  },
];

// Direct chat data
const directChats: ChatItem[] = [
  {
    id: 'd1',
    name: 'Budi Santoso',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/S__539877413_0.jpg-Yt0rh6SilEaHD3bauyH2QcyOeS7F4Y.jpeg',
    lastMessage: 'Jadi main futsal nanti malam?',
    time: '12:45 PM',
    unread: 2,
    messages: [
      {
        id: 'd1m1',
        text: 'Halo, jadi main futsal nanti malam?',
        sender: 'Budi Santoso',
        time: '12:40 PM',
        isMe: false,
      },
      {
        id: 'd1m2',
        text: 'Jadi dong, jam 7 kan?',
        sender: 'You',
        time: '12:42 PM',
        isMe: true,
      },
      {
        id: 'd1m3',
        text: 'Iya, di tempat biasa ya',
        sender: 'Budi Santoso',
        time: '12:45 PM',
        isMe: false,
      },
    ]
  },
  {
    id: 'd2',
    name: 'Andi Wijaya',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/S__539877413_0.jpg-Yt0rh6SilEaHD3bauyH2QcyOeS7F4Y.jpeg',
    lastMessage: 'Saya sudah booking lapangan untuk besok',
    time: 'Yesterday',
    unread: 0,
    messages: [
      {
        id: 'd2m1',
        text: 'Saya sudah booking lapangan untuk besok',
        sender: 'Andi Wijaya',
        time: 'Yesterday',
        isMe: false,
      },
      {
        id: 'd2m2',
        text: 'Bagus, jam berapa?',
        sender: 'You',
        time: 'Yesterday',
        isMe: true,
      },
      {
        id: 'd2m3',
        text: 'Jam 8 malam, 2 jam',
        sender: 'Andi Wijaya',
        time: 'Yesterday',
        isMe: false,
      },
      {
        id: 'd2m4',
        text: 'Oke, saya akan datang',
        sender: 'You',
        time: 'Yesterday',
        isMe: true,
      },
    ]
  },
  {
    id: 'd3',
    name: 'Dewi Lestari',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/S__539877413_0.jpg-Yt0rh6SilEaHD3bauyH2QcyOeS7F4Y.jpeg',
    lastMessage: 'Terima kasih untuk gamenya tadi',
    time: 'Sunday',
    unread: 0,
    messages: [
      {
        id: 'd3m1',
        text: 'Terima kasih untuk gamenya tadi',
        sender: 'Dewi Lestari',
        time: 'Sunday',
        isMe: false,
      },
      {
        id: 'd3m2',
        text: 'Sama-sama, seru sekali mainnya',
        sender: 'You',
        time: 'Sunday',
        isMe: true,
      },
      {
        id: 'd3m3',
        text: 'Kapan-kapan kita main lagi ya',
        sender: 'Dewi Lestari',
        time: 'Sunday',
        isMe: false,
      },
      {
        id: 'd3m4',
        text: 'Siap, kabari saja kalau ada waktu',
        sender: 'You',
        time: 'Sunday',
        isMe: true,
      },
    ]
  },
  {
    id: 'd4',
    name: 'Rudi Hartono',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/S__539877413_0.jpg-Yt0rh6SilEaHD3bauyH2QcyOeS7F4Y.jpeg',
    lastMessage: 'Besok jadi latihan badminton?',
    time: 'Last week',
    unread: 0,
    messages: [
      {
        id: 'd4m1',
        text: 'Besok jadi latihan badminton?',
        sender: 'Rudi Hartono',
        time: 'Last week',
        isMe: false,
      },
      {
        id: 'd4m2',
        text: 'Jadi, jam 9 pagi kan?',
        sender: 'You',
        time: 'Last week',
        isMe: true,
      },
      {
        id: 'd4m3',
        text: 'Iya, di GOR yang biasa',
        sender: 'Rudi Hartono',
        time: 'Last week',
        isMe: false,
      },
    ]
  },
];

const ChatScreen = () => {
  const [activeTab, setActiveTab] = useState('community');
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  // Load messages when a chat is selected
  useEffect(() => {
    if (selectedChat && selectedChat.messages) {
      setMessages(selectedChat.messages);
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedChat) return;
    
    const newMsg: Message = {
      id: `new-${Date.now()}`,
      text: newMessage,
      sender: 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    
    // Update the chat's messages
    if (selectedChat.isCommunity) {
      const updatedCommunityChats = communityChats.map(chat => {
        if (chat.id === selectedChat.id) {
          return {
            ...chat,
            messages: updatedMessages,
            lastMessage: newMessage,
            time: 'Just now'
          };
        }
        return chat;
      });
      // In a real app, you would update the state or context here
    } else {
      const updatedDirectChats = directChats.map(chat => {
        if (chat.id === selectedChat.id) {
          return {
            ...chat,
            messages: updatedMessages,
            lastMessage: newMessage,
            time: 'Just now'
          };
        }
        return chat;
      });
      // In a real app, you would update the state or context here
    }
    
    setNewMessage('');
    
    // Scroll to bottom after sending message
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Render chat item
  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => setSelectedChat(item)}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>{item.unread}</Text>
          </View>
        )}
      </View>
      <View style={styles.chatInfo}>
        <View style={styles.chatItemHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.isCommunity && (
            <View style={styles.membersBadge}>
              <Ionicons name="people" size={12} color="#fff" />
              <Text style={styles.membersBadgeText}>{item.members}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render message bubble
  const renderMessage = (message: Message) => (
    <View 
      key={message.id} 
      style={[
        styles.messageBubble,
        message.isMe ? styles.myMessage : styles.otherMessage
      ]}
    >
      {!message.isMe && (
        <Text style={styles.messageSender}>{message.sender}</Text>
      )}
      <Text style={styles.messageText}>{message.text}</Text>
      <Text style={styles.messageTime}>{message.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#990000" />
      
      {/* Header */}
      <View style={styles.header}>
        {selectedChat ? (
          <View style={styles.chatHeader}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setSelectedChat(null)}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Image source={{ uri: selectedChat.avatar }} style={styles.headerAvatar} />
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>{selectedChat.name}</Text>
              {selectedChat.isCommunity && (
                <Text style={styles.headerSubtitle}>{selectedChat.members} members</Text>
              )}
            </View>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="call-outline" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="ellipsis-vertical" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.headerTitle}>Chat</Text>
        )}
      </View>

      {selectedChat ? (
        // Chat detail view
        <KeyboardAvoidingView 
          style={styles.chatDetailContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <ScrollView 
            style={styles.messagesContainer}
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
          >
            <View style={styles.chatDate}>
              <Text style={styles.chatDateText}>Today</Text>
            </View>
            {messages.map(message => renderMessage(message))}
          </ScrollView>
          
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.attachButton}>
              <Ionicons name="add-circle-outline" size={24} color="#990000" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
            />
            <TouchableOpacity 
              style={[
                styles.sendButton,
                newMessage.trim() === '' ? styles.sendButtonDisabled : styles.sendButtonActive
              ]}
              onPress={handleSendMessage}
              disabled={newMessage.trim() === ''}
            >
              <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : (
        // Chat list view
        <>
          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'direct' && styles.activeTab]}
              onPress={() => setActiveTab('direct')}
            >
              <Text style={[styles.tabText, activeTab === 'direct' && styles.activeTabText]}>
                Direct
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'community' && styles.activeTab]}
              onPress={() => setActiveTab('community')}
            >
              <Text style={[styles.tabText, activeTab === 'community' && styles.activeTabText]}>
                Community
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'activity' && styles.activeTab]}
              onPress={() => setActiveTab('activity')}
            >
              <Text style={[styles.tabText, activeTab === 'activity' && styles.activeTabText]}>
                Activity
              </Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search-outline" size={20} color="#999" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Chat Lists */}
          {activeTab === 'community' && (
            <>
              <FlatList
                data={communityChats}
                renderItem={renderChatItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.chatList}
              />
              <TouchableOpacity style={styles.newChatButton}>
                <Ionicons name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </>
          )}

          {activeTab === 'direct' && (
            <>
              <FlatList
                data={directChats}
                renderItem={renderChatItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.chatList}
              />
              <TouchableOpacity style={styles.newChatButton}>
                <Ionicons name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </>
          )}

          {activeTab === 'activity' && (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconContainer}>
                <Ionicons name="notifications-outline" size={60} color="#ccc" />
              </View>
              <Text style={styles.emptyTitle}>No Activity Yet</Text>
              <Text style={styles.emptySubtitle}>
                You'll see notifications about your chats and matches here
              </Text>
            </View>
          )}
        </>
      )}
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
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    marginRight: 10,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerInfo: {
    flex: 1,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#f0f0f0',
  },
  headerButton: {
    marginLeft: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#990000',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#990000',
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  chatList: {
    paddingBottom: 80, // Space for the new chat button
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  unreadBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#990000',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  membersBadge: {
    flexDirection: 'row',
    backgroundColor: '#990000',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignItems: 'center',
    marginLeft: 10,
  },
  membersBadgeText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  newChatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#990000',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  chatDetailContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  chatDate: {
    alignItems: 'center',
    marginVertical: 15,
  },
  chatDateText: {
    fontSize: 14,
    color: '#999',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#e1f5fe',
    borderBottomRightRadius: 5,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 5,
  },
  messageSender: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#990000',
    marginBottom: 3,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  messageTime: {
    fontSize: 11,
    color: '#999',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  attachButton: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendButtonActive: {
    backgroundColor: '#990000',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
});

export default ChatScreen;