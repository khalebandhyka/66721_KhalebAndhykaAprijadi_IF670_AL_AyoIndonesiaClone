import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Modal,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  Feather,
  AntDesign,
  MaterialCommunityIcons,
  Entypo,
} from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface SportCategory {
  id: string;
  name: string;
  icon: string;
  skillLevel: string;
  isSelected?: boolean;
}

interface SportChallenge {
  id: string;
  name: string;
  icon: string;
  level: string;
  matches: number;
  wins: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
}

interface HistoryMatch {
  id: string;
  date: string;
  opponent: string;
  sport: string;
  result: 'win' | 'loss';
  score: string;
}

// Available sport categories
const availableSportCategories: SportCategory[] = [
  { id: '1', name: 'Badminton', icon: 'badminton', skillLevel: 'Intermediate' },
  { id: '2', name: 'Tennis', icon: 'tennis', skillLevel: 'Beginner' },
  { id: '3', name: 'Mini Soccer', icon: 'soccer', skillLevel: 'Advanced' },
  { id: '4', name: 'Basketball', icon: 'basketball', skillLevel: 'Intermediate' },
  { id: '5', name: 'Volleyball', icon: 'volleyball', skillLevel: 'Beginner' },
  { id: '6', name: 'Table Tennis', icon: 'table-tennis', skillLevel: 'Advanced' },
  { id: '7', name: 'Swimming', icon: 'swim', skillLevel: 'Intermediate' },
  { id: '8', name: 'Running', icon: 'run', skillLevel: 'Advanced' },
];

// Skill levels
const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];

const sportChallenges: SportChallenge[] = [
  {
    id: '1',
    name: 'Badminton',
    icon: 'badminton',
    level: 'Intermediate',
    matches: 15,
    wins: 10,
  },
  {
    id: '2',
    name: 'Tennis',
    icon: 'tennis',
    level: 'Beginner',
    matches: 8,
    wins: 3,
  },
  {
    id: '3',
    name: 'Mini Soccer',
    icon: 'soccer',
    level: 'Advanced',
    matches: 22,
    wins: 18,
  },
];

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Win',
    description: 'Win your first match',
    icon: 'trophy',
    progress: 1,
    total: 1,
  },
  {
    id: '2',
    title: 'Social Butterfly',
    description: 'Join 5 different communities',
    icon: 'butterfly',
    progress: 3,
    total: 5,
  },
  {
    id: '3',
    title: 'Venue Explorer',
    description: 'Play in 10 different venues',
    icon: 'map-marker',
    progress: 7,
    total: 10,
  },
];

const matchHistory: HistoryMatch[] = [
  {
    id: '1',
    date: '21 January 2025',
    opponent: 'Viktor Axelsen',
    sport: 'Badminton',
    result: 'win',
    score: '21-15, 21-18',
  },
  {
    id: '2',
    date: '29 March 2025',
    opponent: 'Ben Shelton',
    sport: 'Tennis',
    result: 'loss',
    score: '4-6, 3-6',
  },
  {
    id: '3',
    date: '22 March 2025',
    opponent: 'Hura-hura United',
    sport: 'Mini Soccer',
    result: 'win',
    score: '3-2',
  },
  {
    id: '4',
    date: '5 April 2025',
    opponent: 'Caesar Eka Nathanael',
    sport: 'Badminton',
    result: 'win',
    score: '21-19, 21-15',
  },
];

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('stats');
  
  const [sportCategoryModalVisible, setSportCategoryModalVisible] = useState(false);
  const [skillLevelModalVisible, setSkillLevelModalVisible] = useState(false);
  const [addSportModalVisible, setAddSportModalVisible] = useState(false);
  const [editSportModalVisible, setEditSportModalVisible] = useState(false);
  
  const [selectedSport, setSelectedSport] = useState<SportCategory | null>(null);
  
  const [userSports, setUserSports] = useState<SportCategory[]>([
    { id: '1', name: 'Badminton', icon: 'badminton', skillLevel: 'Intermediate' },
    { id: '2', name: 'Tennis', icon: 'tennis', skillLevel: 'Beginner' },
    { id: '3', name: 'Mini Soccer', icon: 'soccer', skillLevel: 'Advanced' },
  ]);
  
  const [availableSports, setAvailableSports] = useState<SportCategory[]>([]);
  
  React.useEffect(() => {
    const userSportIds = userSports.map(sport => sport.id);
    const filteredSports = availableSportCategories
      .filter(sport => !userSportIds.includes(sport.id))
      .map(sport => ({ ...sport, isSelected: false }));
    setAvailableSports(filteredSports);
  }, [userSports]);

  const handleSkillLevelSelect = (level: string) => {
    if (selectedSport) {
      const updatedUserSports = userSports.map(sport => 
        sport.id === selectedSport.id 
          ? { ...sport, skillLevel: level } 
          : sport
      );
      setUserSports(updatedUserSports);
      setSkillLevelModalVisible(false);
    }
  };

  const handleAddSports = () => {
    const selectedNewSports = availableSports.filter(sport => sport.isSelected);
    if (selectedNewSports.length === 0) {
      Alert.alert('No Sports Selected', 'Please select at least one sport to add.');
      return;
    }
    
    const newUserSports = [
      ...userSports,
      ...selectedNewSports.map(sport => ({
        id: sport.id,
        name: sport.name,
        icon: sport.icon,
        skillLevel: 'Beginner' 
      }))
    ];
    
    setUserSports(newUserSports);
    setAddSportModalVisible(false);
  };

  const toggleSportSelection = (id: string) => {
    const updatedSports = availableSports.map(sport => 
      sport.id === id 
        ? { ...sport, isSelected: !sport.isSelected } 
        : sport
    );
    setAvailableSports(updatedSports);
  };

  const handleDeleteSport = (id: string) => {
    const updatedSports = userSports.filter(sport => sport.id !== id);
    setUserSports(updatedSports);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newSports = [...userSports];
    const temp = newSports[index];
    newSports[index] = newSports[index - 1];
    newSports[index - 1] = temp;
    setUserSports(newSports);
  };

  const handleMoveDown = (index: number) => {
    if (index === userSports.length - 1) return;
    const newSports = [...userSports];
    const temp = newSports[index];
    newSports[index] = newSports[index + 1];
    newSports[index + 1] = temp;
    setUserSports(newSports);
  };

  const renderSportChallengeItem = ({ item }: { item: SportChallenge }) => (
    <View style={styles.sportChallengeCard}>
      <View style={styles.sportIconContainer}>
        <MaterialCommunityIcons 
          name={item.icon as any} 
          size={32} 
          color="#990000" 
        />
      </View>
      <Text style={styles.sportName}>{item.name}</Text>
      <View style={styles.levelContainer}>
        <Text style={styles.levelText}>{item.level}</Text>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.matches}</Text>
          <Text style={styles.statLabel}>Matches</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.wins}</Text>
          <Text style={styles.statLabel}>Wins</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.challengeButton}>
        <Text style={styles.challengeButtonText}>Challenge</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAchievementItem = ({ item }: { item: Achievement }) => (
    <View style={styles.achievementCard}>
      <View style={styles.achievementIconContainer}>
        <MaterialCommunityIcons 
          name={item.icon as any} 
          size={24} 
          color="#fff" 
        />
      </View>
      <View style={styles.achievementInfo}>
        <Text style={styles.achievementTitle}>{item.title}</Text>
        <Text style={styles.achievementDescription}>{item.description}</Text>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${(item.progress / item.total) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {item.progress}/{item.total}
        </Text>
      </View>
    </View>
  );

  const renderMatchHistoryItem = ({ item }: { item: HistoryMatch }) => (
    <View style={styles.matchHistoryCard}>
      <View style={styles.matchDateContainer}>
        <Text style={styles.matchDate}>{item.date}</Text>
      </View>
      <View style={styles.matchDetails}>
        <View style={styles.matchSportContainer}>
          <MaterialCommunityIcons 
            name={
              item.sport === 'Badminton' ? 'badminton' :
              item.sport === 'Tennis' ? 'tennis' : 'soccer'
            } 
            size={20} 
            color="#990000" 
          />
          <Text style={styles.matchSport}>{item.sport}</Text>
        </View>
        <Text style={styles.matchOpponent}>{item.opponent}</Text>
        <View style={styles.matchResultContainer}>
          <Text 
            style={[
              styles.matchResult,
              item.result === 'win' ? styles.matchWin : styles.matchLoss
            ]}
          >
            {item.result === 'win' ? 'WIN' : 'LOSS'}
          </Text>
          <Text style={styles.matchScore}>{item.score}</Text>
        </View>
      </View>
    </View>
  );

  // Render sport category item in the modal
  const renderSportCategoryItem = ({ item }: { item: SportCategory }) => (
    <TouchableOpacity 
      style={styles.sportCategoryItem}
      onPress={() => {
        setSelectedSport(item);
        setSportCategoryModalVisible(false);
        setSkillLevelModalVisible(true);
      }}
    >
      <View style={styles.sportCategoryIcon}>
        <MaterialCommunityIcons 
          name={item.icon as any} 
          size={24} 
          color="#990000" 
        />
      </View>
      <View style={styles.sportCategoryInfo}>
        <Text style={styles.sportCategoryName}>{item.name}</Text>
        <Text style={styles.sportCategoryLevel}>{item.skillLevel}</Text>
      </View>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="#999" />
    </TouchableOpacity>
  );

  // Render available sport item in add sport modal
  const renderAvailableSportItem = ({ item }: { item: SportCategory }) => (
    <TouchableOpacity 
      style={[
        styles.availableSportItem,
        item.isSelected && styles.availableSportItemSelected
      ]}
      onPress={() => toggleSportSelection(item.id)}
    >
      <View style={styles.availableSportIcon}>
        <MaterialCommunityIcons 
          name={item.icon as any} 
          size={24} 
          color={item.isSelected ? "#fff" : "#990000"} 
        />
      </View>
      <Text style={[
        styles.availableSportName,
        item.isSelected && styles.availableSportNameSelected
      ]}>
        {item.name}
      </Text>
      {item.isSelected && (
        <View style={styles.selectedCheckmark}>
          <Ionicons name="checkmark" size={16} color="#fff" />
        </View>
      )}
    </TouchableOpacity>
  );

  // Render edit sport item
  const renderEditSportItem = ({ item, index }: { item: SportCategory, index: number }) => (
    <View style={styles.editSportItem}>
      <View style={styles.editSportInfo}>
        <MaterialCommunityIcons 
          name={item.icon as any} 
          size={24} 
          color="#990000" 
        />
        <Text style={styles.editSportName}>{item.name}</Text>
      </View>
      <View style={styles.editSportActions}>
        <TouchableOpacity 
          style={[
            styles.editSportButton,
            index === 0 && styles.editSportButtonDisabled
          ]}
          onPress={() => handleMoveUp(index)}
          disabled={index === 0}
        >
          <Ionicons 
            name="arrow-up" 
            size={20} 
            color={index === 0 ? "#ccc" : "#666"} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.editSportButton,
            index === userSports.length - 1 && styles.editSportButtonDisabled
          ]}
          onPress={() => handleMoveDown(index)}
          disabled={index === userSports.length - 1}
        >
          <Ionicons 
            name="arrow-down" 
            size={20} 
            color={index === userSports.length - 1 ? "#ccc" : "#666"} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.editSportButton}
          onPress={() => handleDeleteSport(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#990000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#990000" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => setSportCategoryModalVisible(true)}>
            <MaterialCommunityIcons name="basketball" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>@AyoGuest</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Profile Info */}
        <View style={styles.profileInfoContainer}>
          <Image 
              source={require('./assets/ayoindonesiaavaatar.jpg')} 
              style={styles.profileImage} 
          />
          <Text style={styles.profileName}>Guest #69</Text>
          
          <View style={styles.profileStatsContainer}>
            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>45</Text>
              <Text style={styles.profileStatLabel}>Matches</Text>
            </View>
            <View style={styles.profileStatDivider} />
            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>31</Text>
              <Text style={styles.profileStatLabel}>Wins</Text>
            </View>
            <View style={styles.profileStatDivider} />
            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>14</Text>
              <Text style={styles.profileStatLabel}>Losses</Text>
            </View>
          </View>

          <View style={styles.profileButtonsContainer}>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareProfileButton}>
              <Ionicons name="share-social-outline" size={20} color="#990000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Open Challenge Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>#OpenChallenge</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={sportChallenges}
            renderItem={renderSportChallengeItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sportChallengeList}
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'stats' && styles.activeTab]}
            onPress={() => setActiveTab('stats')}
          >
            <Text style={[styles.tabText, activeTab === 'stats' && styles.activeTabText]}>
              Stats
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'achievements' && styles.activeTab]}
            onPress={() => setActiveTab('achievements')}
          >
            <Text style={[styles.tabText, activeTab === 'achievements' && styles.activeTabText]}>
              Achievements
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'history' && styles.activeTab]}
            onPress={() => setActiveTab('history')}
          >
            <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
              History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'stats' && (
          <View style={styles.tabContent}>
            <View style={styles.statsCard}>
              <Text style={styles.statsCardTitle}>Performance</Text>
              <View style={styles.statsRow}>
                <View style={styles.statCircle}>
                  <Text style={styles.statCircleValue}>69%</Text>
                  <Text style={styles.statCircleLabel}>Win Rate</Text>
                </View>
                <View style={styles.verticalStatsContainer}>
                  <View style={styles.verticalStat}>
                    <Text style={styles.verticalStatLabel}>Avg. Score:</Text>
                    <Text style={styles.verticalStatValue}>21-15</Text>
                  </View>
                  <View style={styles.verticalStat}>
                    <Text style={styles.verticalStatLabel}>Streak:</Text>
                    <Text style={styles.verticalStatValue}>5 Wins</Text>
                  </View>
                </View>
              </View>
            </View>
            
            <View style={styles.statsCard}>
              <Text style={styles.statsCardTitle}>Favorite Sports</Text>
              <View style={styles.favoriteSportsContainer}>
                <View style={styles.favoriteSport}>
                  <MaterialCommunityIcons name="badminton" size={24} color="#990000" />
                  <Text style={styles.favoriteSportName}>Badminton</Text>
                  <Text style={styles.favoriteSportMatches}>15 matches</Text>
                </View>
                <View style={styles.favoriteSport}>
                  <MaterialCommunityIcons name="soccer" size={24} color="#990000" />
                  <Text style={styles.favoriteSportName}>Mini Soccer</Text>
                  <Text style={styles.favoriteSportMatches}>22 matches</Text>
                </View>
                <View style={styles.favoriteSport}>
                  <MaterialCommunityIcons name="tennis" size={24} color="#990000" />
                  <Text style={styles.favoriteSportName}>Tennis</Text>
                  <Text style={styles.favoriteSportMatches}>8 matches</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'achievements' && (
          <View style={styles.tabContent}>
            <FlatList
              data={achievements}
              renderItem={renderAchievementItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.achievementsList}
            />
          </View>
        )}

        {activeTab === 'history' && (
          <View style={styles.tabContent}>
            <FlatList
              data={matchHistory}
              renderItem={renderMatchHistoryItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.matchHistoryList}
            />
          </View>
        )}

        {/* Communities Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Communities</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.communitiesContainer}>
            <View style={styles.communityCard}>
              <Image 
              source={require('./assets/badminjakarta.jpeg')} 
              style={styles.communityImage} 
              />
              <Text style={styles.communityName}>Badminton Jakarta</Text>
              <Text style={styles.communityMembers}>128 members</Text>
            </View>
            <View style={styles.communityCard}>
              <Image 
                source={require('./assets/futsalloper.jpg')} 
                style={styles.communityImage} 
              />
              <Text style={styles.communityName}>Futsal Lovers</Text>
              <Text style={styles.communityMembers}>95 members</Text>
            </View>
            <View style={styles.communityCard}>
              <Image 
                source={require('./assets/tennisclub.jpg')} 
                style={styles.communityImage} 
              />
              <Text style={styles.communityName}>Tennis Club</Text>
              <Text style={styles.communityMembers}>64 members</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Matches */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Matches</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.upcomingMatchCard}>
            <View style={styles.upcomingMatchHeader}>
              <View style={styles.upcomingMatchSport}>
                <MaterialCommunityIcons name="badminton" size={20} color="#990000" />
                <Text style={styles.upcomingMatchSportText}>Badminton</Text>
              </View>
              <Text style={styles.upcomingMatchDate}>Tomorrow, 7:00 PM</Text>
            </View>
            <View style={styles.upcomingMatchTeams}>
              <View style={styles.upcomingMatchTeam}>
                <Image 
                  source={require('./assets/indonesia.jpg')} 
                  style={styles.upcomingMatchTeamImage} 
                />
                <Text style={styles.upcomingMatchTeamName}>Indonesia</Text>
              </View>
              <View style={styles.upcomingMatchVs}>
                <Text style={styles.upcomingMatchVsText}>VS</Text>
              </View>
              <View style={styles.upcomingMatchTeam}>
                <Image 
                  source={require('./assets/britain.jpg')} 
                  style={styles.upcomingMatchTeamImage} 
                />
                <Text style={styles.upcomingMatchTeamName}>England</Text>
              </View>
            </View>
            <View style={styles.upcomingMatchLocation}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.upcomingMatchLocationText}>
                Istora Senayan, Jakarta
              </Text>
            </View>
            <View style={styles.upcomingMatchButtons}>
              <TouchableOpacity style={styles.upcomingMatchButton}>
                <Text style={styles.upcomingMatchButtonText}>View Details</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.upcomingMatchButton, styles.upcomingMatchButtonSecondary]}>
                <Text style={[styles.upcomingMatchButtonText, styles.upcomingMatchButtonTextSecondary]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Sport Category Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={sportCategoryModalVisible}
        onRequestClose={() => setSportCategoryModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sport Categories</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setSportCategoryModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={userSports}
              renderItem={renderSportCategoryItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.modalList}
            />
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.modalFooterButton}
                onPress={() => {
                  setSportCategoryModalVisible(false);
                  setAddSportModalVisible(true);
                }}
              >
                <Ionicons name="add-circle-outline" size={20} color="#990000" />
                <Text style={styles.modalFooterButtonText}>Add Sport</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalFooterButton}
                onPress={() => {
                  setSportCategoryModalVisible(false);
                  setEditSportModalVisible(true);
                }}
              >
                <Ionicons name="create-outline" size={20} color="#990000" />
                <Text style={styles.modalFooterButtonText}>Edit Sports</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Skill Level Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={skillLevelModalVisible}
        onRequestClose={() => setSkillLevelModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedSport ? selectedSport.name : 'Sport'} Skill Level
              </Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setSkillLevelModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.skillLevelContainer}>
              {skillLevels.map((level) => (
                <TouchableOpacity 
                  key={level}
                  style={[
                    styles.skillLevelItem,
                    selectedSport && selectedSport.skillLevel === level && styles.skillLevelItemSelected
                  ]}
                  onPress={() => handleSkillLevelSelect(level)}
                >
                  <Text 
                    style={[
                      styles.skillLevelText,
                      selectedSport && selectedSport.skillLevel === level && styles.skillLevelTextSelected
                    ]}
                  >
                    {level}
                  </Text>
                  {selectedSport && selectedSport.skillLevel === level && (
                    <Ionicons name="checkmark" size={20} color="#fff" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Sport Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addSportModalVisible}
        onRequestClose={() => setAddSportModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Sport</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setAddSportModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSubtitle}>Select sports to add to your profile:</Text>
            
            <FlatList
              data={availableSports}
              renderItem={renderAvailableSportItem}
              keyExtractor={(item) => item.id}
              numColumns={3}
              contentContainerStyle={styles.availableSportsList}
            />
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.addSportButton}
                onPress={handleAddSports}
              >
                <Text style={styles.addSportButtonText}>Add Selected Sports</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Sport Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editSportModalVisible}
        onRequestClose={() => setEditSportModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Sports</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setEditSportModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSubtitle}>Reorder or remove sports:</Text>
            
            <FlatList
              data={userSports}
              renderItem={({ item, index }) => renderEditSportItem({ item, index })}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.editSportsList}
            />
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.doneButton}
                onPress={() => setEditSportModalVisible(false)}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    width: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  scrollView: {
    flex: 1,
  },
  profileInfoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  profileStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  profileStat: {
    alignItems: 'center',
  },
  profileStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileStatLabel: {
    fontSize: 14,
    color: '#666',
  },
  profileStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#ddd',
  },
  profileButtonsContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  editProfileButton: {
    flex: 1,
    backgroundColor: '#990000',
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  editProfileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  shareProfileButton: {
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#990000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#990000',
  },
  sportChallengeList: {
    paddingBottom: 10,
  },
  sportChallengeCard: {
    width: width * 0.7,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sportIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  sportName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  levelContainer: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  levelText: {
    fontSize: 12,
    color: '#666',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#ddd',
  },
  challengeButton: {
    backgroundColor: '#990000',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  challengeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 10,
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
  tabContent: {
    backgroundColor: '#fff',
    padding: 15,
  },
  statsCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  statsCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#990000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statCircleValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  statCircleLabel: {
    fontSize: 12,
    color: '#fff',
  },
  verticalStatsContainer: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  verticalStat: {
    marginBottom: 10,
  },
  verticalStatLabel: {
    fontSize: 14,
    color: '#666',
  },
  verticalStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  favoriteSportsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  favoriteSport: {
    alignItems: 'center',
    flex: 1,
  },
  favoriteSportName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  favoriteSportMatches: {
    fontSize: 12,
    color: '#666',
  },
  achievementsList: {
    paddingBottom: 10,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  achievementIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#990000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    marginBottom: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#990000',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end',
  },
  matchHistoryList: {
    paddingBottom: 10,
  },
  matchHistoryCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  matchDateContainer: {
    backgroundColor: '#eee',
    padding: 10,
  },
  matchDate: {
    fontSize: 14,
    color: '#666',
  },
  matchDetails: {
    padding: 15,
  },
  matchSportContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  matchSport: {
    fontSize: 14,
    color: '#990000',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  matchOpponent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  matchResultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  matchResult: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  matchWin: {
    backgroundColor: '#e6f7e6',
    color: '#2e7d32',
  },
  matchLoss: {
    backgroundColor: '#ffebee',
    color: '#c62828',
  },
  matchScore: {
    fontSize: 14,
    color: '#666',
  },
  communitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  communityCard: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  communityImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  communityName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  communityMembers: {
    fontSize: 12,
    color: '#666',
  },
  upcomingMatchCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
  },
  upcomingMatchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  upcomingMatchSport: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upcomingMatchSportText: {
    fontSize: 14,
    color: '#990000',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  upcomingMatchDate: {
    fontSize: 14,
    color: '#666',
  },
  upcomingMatchTeams: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  upcomingMatchTeam: {
    alignItems: 'center',
    flex: 1,
  },
  upcomingMatchTeamImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  upcomingMatchTeamName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  upcomingMatchVs: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  upcomingMatchVsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#990000',
  },
  upcomingMatchLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  upcomingMatchLocationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  upcomingMatchButtons: {
    flexDirection: 'row',
  },
  upcomingMatchButton: {
    flex: 1,
    backgroundColor: '#990000',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  upcomingMatchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  upcomingMatchButtonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#990000',
    marginRight: 0,
  },
  upcomingMatchButtonTextSecondary: {
    color: '#990000',
  },
  bottomSpacing: {
    height: 80,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalCloseButton: {
    padding: 5,
  },
  modalList: {
    paddingHorizontal: 15,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  modalFooterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  modalFooterButtonText: {
    fontSize: 16,
    color: '#990000',
    marginLeft: 5,
  },
  // Sport category item
  sportCategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sportCategoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  sportCategoryInfo: {
    flex: 1,
  },
  sportCategoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sportCategoryLevel: {
    fontSize: 14,
    color: '#666',
  },
  // Skill level modal
  skillLevelContainer: {
    padding: 15,
  },
  skillLevelItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  skillLevelItemSelected: {
    backgroundColor: '#990000',
  },
  skillLevelText: {
    fontSize: 16,
    color: '#333',
  },
  skillLevelTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
  },
  availableSportsList: {
    paddingHorizontal: 10,
  },
  availableSportItem: {
    width: (width - 60) / 3,
    aspectRatio: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  availableSportItemSelected: {
    backgroundColor: '#990000',
  },
  availableSportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  availableSportName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  availableSportNameSelected: {
    color: '#fff',
  },
  selectedCheckmark: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addSportButton: {
    backgroundColor: '#990000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
  },
  addSportButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Edit sport modal
  editSportsList: {
    paddingHorizontal: 15,
  },
  editSportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  editSportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editSportName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15,
  },
  editSportActions: {
    flexDirection: 'row',
  },
  editSportButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  editSportButtonDisabled: {
    backgroundColor: '#f9f9f9',
  },
  doneButton: {
    backgroundColor: '#990000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;