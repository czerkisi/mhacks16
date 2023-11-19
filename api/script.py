import requests
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler


def calculate_sustainability_ratings(file_path):
    # Load the dataset
    df = pd.read_csv(file_path, low_memory=False)

    # Including the Property ID in the DataFrame
    df_sustainability = df[[
        'Property Id',  # Property ID column
        'Latitude',
        'Longitude',
        'Total GHG Emissions (Metric Tons CO2e)',
        'Property GFA - Self-Reported (ft²)',
        'Site EUI (kBtu/ft²)',
        'Weather Normalized Source EUI (kBtu/ft²)',
        'Water Use (All Water Sources) (kgal)',
        'Percent of Total Electricity Generated from Onsite Renewable Systems',
        'ENERGY STAR Score'
    ]].copy()

    # Convert columns to numeric, handling errors, except for 'Property Id'
    numeric_columns = df_sustainability.columns.drop(['Property Id','Latitude', 'Longitude'])
    df_sustainability[numeric_columns] = df_sustainability[numeric_columns].apply(pd.to_numeric, errors='coerce')

    # Replace inf/-inf with NaN, then handle NaN values
    df_sustainability.replace([np.inf, -np.inf], np.nan, inplace=True)
    df_sustainability.fillna(0, inplace=True)

    # Log transformation for `sp`ecific columns
    for column in ['Total GHG Emissions (Metric Tons CO2e)', 'Property GFA - Self-Reported (ft²)', 
                   'Site EUI (kBtu/ft²)', 'Weather Normalized Source EUI (kBtu/ft²)', 
                   'Water Use (All Water Sources) (kgal)']:
        df_sustainability[column] = np.log1p(df_sustainability[column])

    # Store and drop Property Id for normalization
    property_ids = df_sustainability['Property Id']
    latitudes = df_sustainability['Latitude']
    longitudes = df_sustainability['Longitude']
    df_sustainability.drop(columns=['Property Id', 'Latitude', 'Longitude'], inplace=True)
    
    # Apply MinMaxScaler
    scaler = MinMaxScaler()
    df_sustainability_scaled = scaler.fit_transform(df_sustainability)
    df_sustainability = pd.DataFrame(df_sustainability_scaled, columns=df_sustainability.columns)

    # Calculate the composite sustainability score
    df_sustainability['Composite Sustainability Score'] = df_sustainability.mean(axis=1)

    # Normalize the composite score to a scale of 0-100
    df_sustainability['Normalized Sustainability Score'] = df_sustainability['Composite Sustainability Score'] * 100

    # Add the property IDs back to the DataFrame
    df_sustainability['Property Id'] = property_ids
    df_sustainability['Latitude'] = latitudes
    df_sustainability['Longitude'] = longitudes

    # Return the dataframe sorted by sustainability score
    return df_sustainability[['Property Id', 'Latitude', 'Longitude', 'Normalized Sustainability Score']].sort_values(by='Normalized Sustainability Score', ascending=False)


# Usage
filename = "./Energy_and_Water_Data_Disclosure_for_Local_Law_84_2021__Data_for_Calendar_Year_2020_.csv" 
sustainability_scores = calculate_sustainability_ratings(filename)
print(sustainability_scores.head())

def get_coordinates(api_key, location):
#Get the latitude and longitude of a location using Google Geocoding API.
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    try:
        response = requests.get(base_url, params={"address": location, "key": api_key})
        response.raise_for_status()
        response_json = response.json()

        if response_json["status"] == "OK":
            result = response_json["results"][0]
            return result["geometry"]["location"]["lat"], result["geometry"]["location"]["lng"]
        else:
            return None, None
    except requests.RequestException as e:
        print(f"Request error: {e}")
        return None, None

def haversine_vectorized(df, lat1, lon1):
#Vectorized calculation of distances between two sets of points.
    lat2 = df['Latitude'].astype(float)
    lon2 = df['Longitude'].astype(float)

    R = 6371 # Earth radius in kilometers
    lat1, lon1, lat2, lon2 = map(np.radians, [lat1, lon1, lat2, lon2])

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = np.sin(dlat/2.0)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon/2.0)**2
    c = 2 * np.arcsin(np.sqrt(a)) 
    distance = R * c
    return distance

def find_nearest_locations(api_key, location, df, k):
#Find the k nearest locations to the given location.
    lat, lon = get_coordinates(api_key, location)
    if lat is None or lon is None:
        return "Invalid location or API key."

    # Sort the dataframe first by distance, then by normalized sustainability score
    df['Distance'] = haversine_vectorized(df, lat, lon)
    df_sorted = df.sort_values(by=['Distance', 'Normalized Sustainability Score'], ascending=[True, False])

    # Return the top k rows
    return df_sorted.head(k)[['Property Id', 'Distance', 'Normalized Sustainability Score']]

# find closest results
API_KEY = "AIzaSyCemo-YZEd0EWrbat0G8g2XjUrX3ZvcdZk"


def return_nearest_scores(location, k):
    return find_nearest_locations(API_KEY, location, sustainability_scores, k)

    
