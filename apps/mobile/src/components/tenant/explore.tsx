import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {globalStyles} from "../../styles/global";

const { width } = Dimensions.get('window');

interface Property {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  location: string;
  image: string;
  isFavorite: boolean;
}

interface Category {
  id: string;
  name: string;
  active: boolean;
}

const SAMPLE_PROPERTIES: Property[] = [
  {
    id: '1',
    title: '2-Bedroom Apartment',
    subtitle: 'Cozy space in prime location',
    price: '₦650,000/year',
    location: 'Ikeja, Lagos',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isFavorite: false,
  },
  {
    id: '2',
    title: '4-Bedroom Duplex',
    subtitle: 'Luxury home with private pool',
    price: '₦1,200,000/year',
    location: 'Victoria Island',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isFavorite: true,
  },
  {
    id: '3',
    title: '3-Bedroom Apartment',
    subtitle: 'Modern apartment with ocean view',
    price: '₦850,000/year',
    location: 'Lekki, Lagos',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isFavorite: false,
  },
];

const CATEGORIES: Category[] = [
  { id: '1', name: 'Apartments', active: true },
  { id: '2', name: 'Houses', active: false },
  { id: '3', name: 'Commercial', active: false },
  { id: '4', name: 'Land', active: false },
  { id: '5', name: 'Shared', active: false },
];

export const TenantExploreScreen = () => {
  const [properties, setProperties] = useState(SAMPLE_PROPERTIES);
  const [categories, setCategories] = useState(CATEGORIES);
  const [currentIndex, setCurrentIndex] = useState(0);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          // @ts-expect-error idk
          x: pan.x._value,
          // @ts-expect-error idk
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        pan.flattenOffset();

        if (gesture.dx > 120 || gesture.dx < -120) {
          const direction = gesture.dx > 0 ? 1 : -1;
          Animated.timing(pan, {
            toValue: { x: direction * width, y: gesture.dy },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            handleSwipe(direction > 0 ? 'right' : 'left');
            pan.setValue({ x: 0, y: 0 });
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      const updatedProperties = [...properties];
      if (updatedProperties[currentIndex]) {
        updatedProperties[currentIndex].isFavorite = true;
      }
      setProperties(updatedProperties);
    }

    setCurrentIndex(prev => prev + 1);
  };

  const handleActionButton = (action: 'pass' | 'like') => {
    handleSwipe(action === 'like' ? 'right' : 'left');
  };

  const handleCategoryPress = (categoryId: string) => {
    setCategories(prev =>
      prev.map(cat => ({
        ...cat,
        active: cat.id === categoryId,
      }))
    );
  };

  const resetCards = () => {
    setCurrentIndex(0);
    setProperties(SAMPLE_PROPERTIES);
    pan.setValue({ x: 0, y: 0 });
  };

  const renderPropertyCard = (property: Property, index: number) => {
    const isTop = index === currentIndex;
    const isNext = index === currentIndex + 1;
    const isThird = index === currentIndex + 2;

    if (index < currentIndex) return null;

    let cardStyle = {};

    if (isTop) {
      const rotate = pan.x.interpolate({
        inputRange: [-width / 2, 0, width / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp',
      });

      cardStyle = {
        transform: [
          ...pan.getTranslateTransform(),
          { rotate },
        ],
        zIndex: 3,
      };
    } else if (isNext) {
      cardStyle = {
        transform: [{ scale: 0.97 }, { rotate: '1deg' }],
        zIndex: 2,
      };
    } else if (isThird) {
      cardStyle = {
        transform: [{ scale: 0.95 }, { rotate: '-2deg' }],
        zIndex: 1,
      };
    }

    return (
      <Animated.View
        key={property.id}
        style={[styles.propertyCard, cardStyle]}
        {...(isTop ? panResponder.panHandlers : {})}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: property.image }} style={styles.propertyImage} />
          <TouchableOpacity style={styles.favoriteButton}>
            <FontAwesome5
              name="heart"
              size={16}
              color={property.isFavorite ? '#ef4444' : '#6b7280'}
              solid={property.isFavorite}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.price}>{property.price}</Text>
            <View style={styles.locationContainer}>
              <FontAwesome5 name="map-marker-alt" size={12} color="#6b7280" />
              <Text style={styles.location}>{property.location}</Text>
            </View>
          </View>
          <Text style={styles.title}>{property.title}</Text>
          <Text style={styles.subtitle}>{property.subtitle}</Text>
        </View>
      </Animated.View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No more properties!</Text>
      <Text style={styles.emptySubtitle}>Check back later for new listings</Text>
      <TouchableOpacity style={styles.refreshButton} onPress={resetCards}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={globalStyles.mainContainer}
      className="px-4" showsVerticalScrollIndicator={false}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              category.active && styles.categoryButtonActive,
            ]}
            onPress={() => handleCategoryPress(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                category.active && styles.categoryTextActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.cardsContainer}>
        {currentIndex >= properties.length ? (
          renderEmptyState()
        ) : (
          <View style={styles.cardStack}>
            {properties.map((property, index) => renderPropertyCard(property, index))}
          </View>
        )}
      </View>

      {currentIndex < properties.length && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.passButton]}
            onPress={() => handleActionButton('pass')}
          >
            <FontAwesome5 name="times" size={20} color="#ef4444" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.likeButton]}
            onPress={() => handleActionButton('like')}
          >
            <FontAwesome5 name="heart" size={20} color="#7c3aed" />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  categoriesContainer: {
    marginTop: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#7c3aed',
    borderColor: '#7c3aed',
  },
  categoryText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: 'white',
  },
  filtersContainer: {
    marginTop: 8,
  },
  filtersContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  cardsContainer: {
    height: 500,
    marginTop: 24,
    marginHorizontal: 16,
  },
  cardStack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  propertyCard: {
    position: 'absolute',
    width: width - 32,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  propertyImage: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 16,
    marginBottom: 24,
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  passButton: {
    borderWidth: 2,
    borderColor: '#fecaca',
  },
  likeButton: {
    borderWidth: 2,
    borderColor: '#c4b5fd',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  refreshButton: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
