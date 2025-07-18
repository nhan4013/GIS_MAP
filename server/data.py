# import pandas as pd
# from geopy.geocoders import Nominatim
# from time import sleep

# # Load your CSV file
# df = pd.read_csv("e:/vscode/GIS/server/schools.csv")  # Make sure it has a "name" or "address" column

# # Initialize the geocoder
# geolocator = Nominatim(user_agent="school_gis_geocoder")

# # Function to fetch lat/lon
# def get_location(query):
#     try:
#         location = geolocator.geocode(query + ", Hồ Chí Minh, Vietnam", timeout=10)
#         if location:
#             return pd.Series([location.latitude, location.longitude])
#     except Exception as e:
#         print(f"Error on {query}: {e}")
#     return pd.Series([None, None])

# # Apply the function to each row
# df[['latitude', 'longitude']] = df['name'].apply(get_location)

# # Save to new file
# df.to_csv("schools_with_latlon.csv", index=False)

import pandas as pd

# Example DataFrame with latitude and longitude
df = pd.read_csv("e:/vscode/GIS/schools_with_latlon.csv")  # Your file must contain 'latitude' and 'longitude' columns

# Create the WKT POINT string
df['geom'] = df.apply(lambda row: f'POINT({row["longitude"]} {row["latitude"]})', axis=1)

# Save to CSV for Postgres import
df.to_csv("schools_with_geom.csv", index=False)
