import React, { useEffect, useRef, useState } from "react";

type TravelModeType = "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT";

interface RouteInfo {
  distance: string;
  duration: string;
  alternatives?: Array<{
    distance: string;
    duration: string;
  }>;
}

const GoogleMapRoute: React.FC<{
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
}> = ({ origin, destination }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [travelMode, setTravelMode] = useState<TravelModeType>("DRIVING");
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  // Initialize map
  useEffect(() => {
    if (!window.google || !mapRef.current) return;
    
    const map = new window.google.maps.Map(mapRef.current, {
      center: origin,
      zoom: 13,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
    });
    
    const renderer = new window.google.maps.DirectionsRenderer({
      map,
      suppressMarkers: false,
      preserveViewport: false,
    });
    
    setMapInstance(map);
    setDirectionsRenderer(renderer);
    
    return () => {
      // Cleanup
      if (renderer) {
        renderer.setMap(null);
      }
    };
  }, []);

  // Calculate route when origin, destination, travel mode changes
  useEffect(() => {
    if (!window.google || !mapInstance || !directionsRenderer) return;

    const directionsService = new window.google.maps.DirectionsService();
    
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode[travelMode],
        provideRouteAlternatives: true,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK && result) {
          directionsRenderer.setDirections(result);
          directionsRenderer.setRouteIndex(selectedRouteIndex);
          
          // Extract main route and alternatives
          if (result.routes && result.routes.length > 0) {
            const alternatives = result.routes.slice(1).map(route => ({
              distance: route.legs[0].distance?.text || "N/A",
              duration: route.legs[0].duration?.text || "N/A"
            }));
            
            setRouteInfo({
              distance: result.routes[0].legs[0].distance?.text || "N/A",
              duration: result.routes[0].legs[0].duration?.text || "N/A",
              alternatives: alternatives.length > 0 ? alternatives : undefined
            });
          }
        } else {
          alert("Không tìm thấy tuyến đường!");
          setRouteInfo(null);
        }
      }
    );
  }, [origin, destination, travelMode, mapInstance, directionsRenderer, selectedRouteIndex]);

  // Update selected route
  useEffect(() => {
    if (directionsRenderer && directionsRenderer.getDirections()) {
      directionsRenderer.setRouteIndex(selectedRouteIndex);
      
      // Update route info based on selected route
      const routes = directionsRenderer.getDirections()?.routes;
      if (routes && routes.length > selectedRouteIndex) {
        const selectedRoute = routes[selectedRouteIndex].legs[0];
        
        setRouteInfo(prev => {
          if (!prev) return null;
          
          return {
            ...prev,
            distance: selectedRoute.distance?.text || "N/A",
            duration: selectedRoute.duration?.text || "N/A",
          };
        });
      }
    }
  }, [selectedRouteIndex, directionsRenderer]);

  const handleTravelModeChange = (mode: TravelModeType) => {
    setTravelMode(mode);
    setSelectedRouteIndex(0); // Reset to first route when changing mode
  };

  const selectRoute = (index: number) => {
    setSelectedRouteIndex(index);
  };

  // Travel mode icons
  const travelModeIcons = {
    DRIVING: "🚗",
    WALKING: "🚶",
    BICYCLING: "🚲",
    TRANSIT: "🚌"
  };

  // Travel mode labels
  const travelModeLabels = {
    DRIVING: "Lái xe",
    WALKING: "Đi bộ",
    BICYCLING: "Đạp xe",
    TRANSIT: "Công cộng"
  };

  return (
    <div>
      <div className="travel-mode-selector" style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 0',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        marginBottom: '10px'
      }}>
        {(["DRIVING", "WALKING", "BICYCLING", "TRANSIT"] as TravelModeType[]).map(mode => (
          <button 
            key={mode}
            onClick={() => handleTravelModeChange(mode)}
            style={{
              padding: '8px 12px',
              backgroundColor: travelMode === mode ? '#1a73e8' : '#fff',
              color: travelMode === mode ? '#fff' : '#333',
              border: '1px solid #dadce0',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '14px',
              fontWeight: travelMode === mode ? 'bold' : 'normal'
            }}
          >
            <span>{travelModeIcons[mode]}</span>
            <span>{travelModeLabels[mode]}</span>
          </button>
        ))}
      </div>
      
      <div ref={mapRef} style={{ width: "100%", height: "400px", borderRadius: '8px' }} />
      
      {routeInfo && (
        <div className="route-info-panel" style={{ 
          padding: '15px', 
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
          margin: '15px 0'
        }}>
          <div 
            className={selectedRouteIndex === 0 ? "selected-route" : ""}
            onClick={() => selectRoute(0)}
            style={{
              padding: '10px',
              backgroundColor: selectedRouteIndex === 0 ? '#e8f0fe' : 'transparent',
              borderRadius: '6px',
              cursor: 'pointer',
              marginBottom: '8px',
              borderLeft: selectedRouteIndex === 0 ? '4px solid #1a73e8' : 'none'
            }}>
            <div style={{ fontWeight: 'bold', color: '#1a73e8', marginBottom: '5px' }}>Tuyến đường chính</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span><strong>Khoảng cách:</strong> {routeInfo.distance}</span>
              <span><strong>Thời gian:</strong> {routeInfo.duration}</span>
            </div>
          </div>
          
          {routeInfo.alternatives?.map((alt, index) => (
            <div 
              key={index}
              className={selectedRouteIndex === index + 1 ? "selected-route" : ""}
              onClick={() => selectRoute(index + 1)}
              style={{
                padding: '10px',
                backgroundColor: selectedRouteIndex === index + 1 ? '#e8f0fe' : 'transparent',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '8px',
                borderLeft: selectedRouteIndex === index + 1 ? '4px solid #1a73e8' : 'none'
              }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Tuyến đường thay thế {index + 1}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><strong>Khoảng cách:</strong> {alt.distance}</span>
                <span><strong>Thời gian:</strong> {alt.duration}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoogleMapRoute;