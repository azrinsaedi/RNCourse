import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

export async function init() {
  const database = await SQLite.openDatabaseAsync('places.db');
  return await database
    .execAsync(
      `CREATE TABLE IF NOT EXISTS places (
              id INTEGER PRIMARY KEY NOT NULL,
              title TEXT NOT NULL,
              imageUri TEXT NOT NULL,
              address TEXT NOT NULL,
              lat REAL NOT NULL,
              lng REAL NOT NULL
            );`
    )
    .then(() => {
      return 'Success';
    })
    .catch((error) => {
      return { 'Error:': error };
    });
}

export async function insertPlace(place) {
  const database = await SQLite.openDatabaseAsync('places.db');
  const response = await database.runAsync(
    `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
    [place.title, place.imageUri, place.address, place.location.lat, place.location.lng]
  );
  //   console.log(response);
  return response;
}

export async function fetchPlaces() {
  try {
    const database = await SQLite.openDatabaseAsync('places.db');
    const response = await database.getAllAsync(`SELECT * FROM places`, []);

    const places = response.map(
      (dp) => new Place(dp.title, dp.imageUri, { address: dp.address, lat: dp.lat, lng: dp.lng }, dp.id)
    );

    console.log('places', places);
    return places;
  } catch (error) {
    console.error('Error:', error);
    return { 'Error:': error };
  }
}

export async function fetchPlaceDetails(id) {
  try {
    const database = await SQLite.openDatabaseAsync('places.db');
    const response = await database.getFirstAsync(`SELECT * FROM places WHERE id = ?`, [id]);
    // console.log(response);
    // return response;

    const place = new Place(
      response.title,
      response.imageUri,
      { address: response.address, lat: response.lat, lng: response.lng },
      response.id
    );
    // const places = response.map(
    //   (dp) => new Place(dp.title, dp.imageUri, { address: dp.address, lat: dp.lat, lng: dp.lng }, dp.id)
    // );

    console.log('place', place);
    return place;
  } catch (error) {
    console.error('Error:', error);
    return { 'Error:': error };
  }
}
