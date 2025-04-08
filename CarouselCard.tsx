import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const images = [
  {
    id: '1',
    source: require('./assets/promo1.jpg'),
    title: 'Mabar Seru, Menang Bersama di Ayo Indonesia!',
    description: 'Main bareng dan menang!',
  },
  {
    id: '2',
    source: require('./assets/promo2.jpg'),
    title: 'Tantang Lawan, Uji Kemampuan! Temukan Sparring Instan!',
    description: 'Cari lawan dengan cepat!',
  },
  {
    id: '3',
    source: require('./assets/promo3.jpg'),
    title: 'Gabung Komunitas, Biar Olahragamu Makin Seru!',
    description: 'Gabung komunitas sekarang!',
  },
];

const CarouselCard = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 4000); 

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <FlatList
      ref={flatListRef}
      data={images}
      horizontal
      pagingEnabled
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={item.source} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      )}
      onMomentumScrollEnd={(event) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / (width * 0.8 + 15));
        setCurrentIndex(newIndex);
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.8,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    paddingBottom: 10,
  },
  image: {
    width: '100%',
    height: 180,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    paddingHorizontal: 10,
  },
});

export default CarouselCard;
