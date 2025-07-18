import pandas as pd

# Example DataFrame with latitude and longitude
df = pd.read_csv("e:/vscode/GIS/schools_with_latlon.csv")  # Your file must contain 'latitude' and 'longitude' columns

# Create the WKT POINT string
df['geom'] = df.apply(lambda row: f'POINT({row["longitude"]} {row["latitude"]})', axis=1)

# Save to CSV for Postgres import
df.to_csv("schools_with_geom.csv", index=False)
