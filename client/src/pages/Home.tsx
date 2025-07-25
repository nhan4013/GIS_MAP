import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import MapView from "../components/map/MapView";
import SchoolDetailPanel from "../components/panel/SchoolDetailPanel";
import Sidebar from "../components/panel/Sidebar";
import LocateButton from "../components/map/LocateButton";
import MapLegend from "../components/map/MapLegend";
import GoogleMapRoute from "../components/map/GoogleMapRoute";

const Home: React.FC = () => {
  type School = {
    id: number;
    name: string;
    address: string;
    student_count: number;
    teacher_count: number;
    position: number[];
    school_type: string;
    phone: string;
    website: string;
  };

  const [schools, setSchools] = useState<any[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<any[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<any | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [showRoute, setShowRoute] = useState(false);
  const [routeDestination, setRouteDestination] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    fetch("http://127.0.0.1:8000/school/")
      .then((res) => res.json())
      .then((data) => {
        const parsed = data.map(
          (school: {
            id: number;
            name: string;
            geom: string;
            school_type: string;
            address: string;
            student_count: number;
            teacher_count: number;
            phone: string;
            website: string;
          }) => ({
            id: school.id,
            name: school.name,
            position: JSON.parse(school.geom).coordinates.reverse(),
            school_type: school.school_type,
            address: school.address,
            student_count: school.student_count,
            teacher_count: school.teacher_count,
            phone: school.phone,
            website: school.website,
          })
        );
        setSchools(parsed);
        setFilteredSchools(parsed);
      });
  }, []);

  const handleSearch = (keyword: string) => {
    if (!keyword) {
      setFilteredSchools(schools);
      setSelectedSchool(null);
    } else {
      setFilteredSchools(
        schools.filter((s) => s.name.toLowerCase().includes(keyword.toLowerCase()))
      );
    }
  };

  const handleSelectResult = (school: any) => {
    setFilteredSchools([school]);
    setSelectedSchool(school);
  };

  function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          alert("Không thể lấy vị trí của bạn!");
        }
      );
    }
  };
  const handleShowRoute = (school: any) => {
    if (userLocation) {
      setRouteDestination({
        lat: school.position[0],
        lng: school.position[1],
      });
      setShowRoute(true);
    } else {
      alert("Vui lòng xác định vị trí của bạn trước!");
      handleLocate();
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {/* Header - Now floating */}
      <Header onSelectSchool={handleSearch} schools={schools} onSelectResult={handleSelectResult} />

      {/* Main Content - Now starts from top of page */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        {/* Map Panel - Takes all remaining space */}
        <div className="flex-1 h-full relative">
          <div className="absolute bottom-8 right-[calc(7.5rem+240px)] flex gap-3 z-[1002]">
    
    <button
      onClick={() => {
        if (!userLocation) {
          alert("Vui lòng xác định vị trí của bạn trước!");
          handleLocate();
          return;
        }
        const [lat, lng] = userLocation;
        const nearbySchools = schools.filter(
          (school) => getDistanceKm(lat, lng, school.position[0], school.position[1]) <= 5
        );
        setFilteredSchools(nearbySchools);
        setSelectedSchool(null);
      }}
      className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
    >
      Tìm trường trong bán kính 5km
    </button>
  </div>
          {!showRoute ? (
            <MapView
              schools={filteredSchools}
              selectedSchool={selectedSchool}
              onMarkerClick={(school) => {
                setSelectedSchool(school);
                // Add this line to show route option in the school detail panel
              }}
              userLocation={userLocation}
            />
          ) : (
            userLocation &&
            routeDestination && (
              <GoogleMapRoute
                origin={{ lat: userLocation[0], lng: userLocation[1] }}
                destination={routeDestination}
              />
            )
          )}
          <LocateButton onClick={handleLocate} />
          

          <MapLegend />
          {selectedSchool && selectedSchool.fromMarker ? (
            <SchoolDetailPanel
              school_s={selectedSchool}
              onClose={() => setSelectedSchool(null)}
              onShowRoute={() => handleShowRoute(selectedSchool)}
            />
          ) : null}
          {showRoute && (
            <button
              onClick={() => setShowRoute(false)}
              className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md z-[1002]"
            >
              ← Quay lại bản đồ
            </button>
          )}
        </div>
      </div>

      

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
