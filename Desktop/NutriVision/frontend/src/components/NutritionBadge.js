import React from 'react';

function NutritionBadge({ label, value, unit = 'g' }) {
  return (
    <span className="nutrition-badge">
      {label}: {value.toFixed(1)}{unit}
    </span>
  );
}

export default NutritionBadge;

