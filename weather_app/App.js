import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const API_KEY = '6b59284b09fbb655bbc90bbbc36096ad';

export const App = () => {
  const [city, setCity] = useState('Tashkent');
  const [weather, setWeather] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName) => {
    try {
      const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.log(error);
      alert('Error fetching weather data. Please try again.' + error.message);
    }
  };

  const handleSearch = () => {
    if (search.trim()) {
      setCity(search);
      setSearch('');
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.header}>Weather App</Text>

        <TextInput
            style={styles.input}
            placeholder="Enter city name"
            value={search}
            onChangeText={setSearch}
        />
        <Button title="Search" onPress={handleSearch} />

        {weather && (
            <View style={styles.weatherContainer}>
              <Text style={styles.city}>{weather.name}</Text>
              <Text style={styles.temperature}>{weather.main.temp}°C</Text>
              <Text style={styles.description}>{weather.weather[0].description}</Text>
              <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
            </View>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '100%',
    marginBottom: 8,
  },
  weatherContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  city: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 48,
    color: '#ff4500',
  },
  description: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  date: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default App;
