import React, { useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import MapView from "../components/map/MapView";
import SchoolDetailPanel from "../components/panel/SchoolDetailPanel";
import Sidebar from "../components/panel/Sidebar";
import LocateButton from "../components/map/LocateButton";
import MapLegend from "../components/map/MapLegend";

const Home: React.FC = () => {
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {/* Header - Now floating */}
      <Header onSelectSchool={setSelectedSchool}/>

      {/* Main Content - Now starts from top of page */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        {/* Map Panel - Takes all remaining space */}
        <div className="flex-1 h-full relative">
          <MapView onSelectSchool={setSelectedSchool} />
          <LocateButton onClick={() => {/* handle location logic here */}} />
          <MapLegend/>
          {selectedSchool ? (
            <SchoolDetailPanel school_s={selectedSchool} onClose={() => setSelectedSchool(null)} />
          ) : null}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;