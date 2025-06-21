import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BottomNavigation = () => {
  const navItems = [
    { icon: 'home', label: 'Home', active: true },
    { icon: 'play-circle-outline', label: 'Shorts', active: false },
    { icon: 'add', label: 'Add', active: false },
    { icon: 'search', label: 'Search', active: false },
    { icon: 'person', label: 'Profile', active: false }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        {navItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
          >
            {item.label === 'Add' ? (
              <LinearGradient
                colors={['#8b5cf6', '#ec4899']}
                style={styles.addButton}
              >
                <Icon name={item.icon} size={24} color="white" />
              </LinearGradient>
            ) : (
              <Icon
                name={item.icon}
                size={24}
                color={item.active ? '#8b5cf6' : '#9ca3af'}
              />
            )}
            <Text
              style={[
                styles.navLabel,
                { color: item.active ? '#8b5cf6' : '#9ca3af' }
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButton: {
    padding: 8,
    borderRadius: 25,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});

export default BottomNavigation;