import React, { useState } from 'react';
import type { LayerToggleProps } from '../../types/models';

const defaultLayers = ['School Locations', 'District Boundaries', 'Transport Routes'];

const LayerToggle: React.FC<LayerToggleProps> = ({
  layers = defaultLayers,
}) => {
  const [enabledLayers, setEnabledLayers] = useState<string[]>([]);

  const handleToggle = (layer: string) => {
    const isEnabled = enabledLayers.includes(layer);
    const newEnabledLayers = isEnabled
      ? enabledLayers.filter(l => l !== layer)
      : [...enabledLayers, layer];

    setEnabledLayers(newEnabledLayers);
  };

  return (
    <ul className="flex flex-col gap-2 mt-1">
      {layers.map(layer => (
        <li key={layer} className="flex items-center">
          <input
            type="checkbox"
            id={layer}
            checked={enabledLayers.includes(layer)}
            onChange={() => handleToggle(layer)}
            className="mr-2 accent-blue-600"
          />
          <label htmlFor={layer} className="text-gray-800 cursor-pointer">
            {layer}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default LayerToggle;