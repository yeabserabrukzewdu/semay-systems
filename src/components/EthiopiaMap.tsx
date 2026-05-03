import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Type-safe city definition
interface City {
  name: string;
  coords: [number, number];
}

const cities: City[] = [
  { name: 'Addis Ababa', coords: [9.0122, 38.7578] },
  { name: 'Dire Dawa', coords: [9.6009, 41.8592] },
  { name: 'Hawassa', coords: [7.0621, 38.4763] },
  { name: 'Bahir Dar', coords: [11.5936, 37.3908] },
  { name: 'Mekelle', coords: [13.4927, 39.4716] },
  { name: 'Adama', coords: [8.5414, 39.2689] },
];

export default function EthiopiaMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return;

    // Responsive handling
    const resizeObserver = new ResizeObserver(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    });
    resizeObserver.observe(mapContainerRef.current);

    // Strict validation of coordinates
    const isValidCoord = (coords: any): coords is [number, number] => {
      return (
        Array.isArray(coords) &&
        coords.length === 2 &&
        typeof coords[0] === 'number' &&
        typeof coords[1] === 'number' &&
        !isNaN(coords[0]) &&
        !isNaN(coords[1])
      );
    };

    const centerCoord: [number, number] = [9.145, 40.4896];

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false,
      zoomSnap: 0.1,
    }).setView(centerCoord, 4.5);

    mapRef.current = map;

    // Load GeoJSON
    fetch('/ethiopia.geojson')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!mapRef.current) return;
        
        const geoJsonLayer = L.geoJSON(data, {
          style: {
            color: '#2e7d4f',
            weight: 1.5,
            fillColor: '#2e7d4f',
            fillOpacity: 0.05,
          },
        }).addTo(mapRef.current);

        const bounds = geoJsonLayer.getBounds();
        if (bounds.isValid() && mapRef.current.getContainer().clientHeight > 0) {
          mapRef.current.fitBounds(bounds, { padding: [40, 40] });
        }
      })
      .catch((err) => console.error('Error loading GeoJSON:', err));

    // Wait for DOM to stabilize
    const resizeTimeout = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 200);

    // City Coordinates with explicit validation
    const addisCoords: [number, number] = [8.9806, 38.7578];
    const restOfCities = cities.filter(c => c.name !== 'Addis Ababa');

    // Add connecting lines (The Semay)
    restOfCities.forEach(city => {
      if (isValidCoord(addisCoords) && isValidCoord(city.coords)) {
        L.polyline([addisCoords, city.coords], {
          color: '#ffffff',
          weight: 0.5,
          dashArray: '4, 8',
          opacity: 0.15
        }).addTo(mapRef.current!);
      }
    });

    // Add city markers
    cities.forEach((city, i) => {
      if (!mapRef.current || !isValidCoord(city.coords)) return;
      
      const isAddis = city.name === 'Addis Ababa';
      
      const marker = L.circleMarker(city.coords, {
        radius: isAddis ? 8 : 4.5,
        fillColor: isAddis ? '#2e7d4f' : (i % 2 === 0 ? '#f5c842' : '#e62117'),
        color: '#fff',
        weight: 1.5,
        opacity: isAddis ? 1 : 0.8,
        fillOpacity: isAddis ? 1 : 0.8,
        className: isAddis ? 'pulse-marker' : ''
      }).addTo(mapRef.current);

      marker.bindTooltip(city.name.toUpperCase(), {
        permanent: true,
        direction: 'top',
        className: 'city-tooltip',
        offset: [0, -10]
      });
    });

    return () => {
      clearTimeout(resizeTimeout);
      if (mapContainerRef.current) {
        resizeObserver.unobserve(mapContainerRef.current);
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[700px] lg:min-h-[750px] relative rounded-3xl overflow-hidden border border-white/5 bg-black/5 shadow-2xl z-0 group">
      {/* Top Flag Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 z-20 flex">
        <div className="h-full flex-1 bg-et-green opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="h-full flex-1 bg-et-yellow opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="h-full flex-1 bg-et-red opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.05]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #f5f2ec 1px, transparent 1px), linear-gradient(to bottom, #f5f2ec 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} 
      />
      
      <div ref={mapContainerRef} className="w-full h-full absolute inset-0 z-0" />
      
      <style>{`
        .leaflet-container {
          background: transparent !important;
          z-index: 0 !important;
        }
        .leaflet-pane {
          z-index: 0 !important;
        }
        .leaflet-top, .leaflet-bottom {
          z-index: 0 !important;
        }
        .city-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          color: rgba(245, 242, 236, 0.7) !important;
          font-family: 'DM Mono', monospace !important;
          font-size: 10px !important;
          font-weight: 500 !important;
          letter-spacing: 0.12em !important;
          padding: 0 8px !important;
          white-space: nowrap !important;
          text-shadow: 0 2px 4px rgba(0,0,0,0.8);
          z-index: 10 !important;
        }
        .city-tooltip::before {
          display: none !important;
        }
        @keyframes pulse {
          0% { stroke-width: 1.5; stroke-opacity: 0.8; }
          50% { stroke-width: 15; stroke-opacity: 0.1; }
          100% { stroke-width: 1.5; stroke-opacity: 0; }
        }
        .pulse-marker {
          animation: pulse 2.5s ease-out infinite;
          transform-origin: center;
          pointer-events: none;
        }
      `}</style>

      {/* Flag Colors Overlay */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-[2px] w-24 opacity-20">
        <div className="h-1.5 w-full bg-et-green rounded-sm" />
        <div className="h-1.5 w-full bg-et-yellow rounded-sm" />
        <div className="h-1.5 w-full bg-et-red rounded-sm" />
      </div>
    </div>
  );
}

