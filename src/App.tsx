import React from 'react';
import Map from "./Home/Map";

function App() {
  const defaultCenter: [number, number] = [51.505, -0.09]; // Initial center coordinates
  const defaultZoom = 13; // Initial zoom level

  return (
    <div>
      <Map/>
    </div>
  );
}

export default App;
