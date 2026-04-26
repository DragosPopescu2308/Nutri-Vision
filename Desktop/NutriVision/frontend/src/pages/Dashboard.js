import React, { useState, useEffect } from 'react';
import { foodAPI, recipeAPI } from '../api/api';
import NutritionBadge from '../components/NutritionBadge';

function Dashboard() {
  const [stats, setStats] = useState({
    totalFoods: 0,
    totalRecipes: 0,
    avgCalories: 0,
    avgProteins: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentFoods, setRecentFoods] = useState([]);
  const [recentRecipes, setRecentRecipes] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [foodsRes, recipesRes] = await Promise.all([
        foodAPI.getAll(),
        recipeAPI.getAll(),
      ]);

      const foods = foodsRes.data || [];
      const recipes = recipesRes.data || [];

      let avgCal = 0;
      let avgProt = 0;

      if (foods.length > 0) {
        avgCal = foods.reduce((sum, f) => sum + f.caloriesPer100g, 0) / foods.length;
        avgProt = foods.reduce((sum, f) => sum + f.proteinsPer100g, 0) / foods.length;
      }

      setStats({
        totalFoods: foods.length,
        totalRecipes: recipes.length,
        avgCalories: avgCal,
        avgProteins: avgProt,
      });

      setRecentFoods(foods.slice(0, 3));
      setRecentRecipes(recipes.slice(0, 3));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="page-title">Welcome to NutriVision</h2>

      <div className="cards-grid">
        <div className="card">
          <div className="card-header">
            <div className="card-title">📊 Total Foods</div>
          </div>
          <div className="card-body">
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#667eea' }}>
              {stats.totalFoods}
            </div>
            <p style={{ color: '#999', marginTop: '0.5rem' }}>Foods in database</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">🍽️ Total Recipes</div>
          </div>
          <div className="card-body">
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#667eea' }}>
              {stats.totalRecipes}
            </div>
            <p style={{ color: '#999', marginTop: '0.5rem' }}>Recipes created</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">🔥 Avg Calories</div>
          </div>
          <div className="card-body">
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ff6b6b' }}>
              {stats.avgCalories.toFixed(1)}
            </div>
            <p style={{ color: '#999', marginTop: '0.5rem' }}>Per 100g average</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">💪 Avg Proteins</div>
          </div>
          <div className="card-body">
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#51cf66' }}>
              {stats.avgProteins.toFixed(1)}g
            </div>
            <p style={{ color: '#999', marginTop: '0.5rem' }}>Per 100g average</p>
          </div>
        </div>
      </div>

      <div className="cards-grid">
        <div className="card">
          <div className="card-header">
            <div className="card-title">📝 Recent Foods</div>
          </div>
          <div className="card-body">
            {recentFoods.length === 0 ? (
              <p style={{ color: '#999' }}>No foods yet. Create one to get started!</p>
            ) : (
              <ul style={{ listStyle: 'none' }}>
                {recentFoods.map((food) => (
                  <li
                    key={food.id}
                    style={{
                      padding: '0.5rem 0',
                      borderBottom: '1px solid #f0f0f0',
                    }}
                  >
                    <div style={{ fontWeight: 'bold', color: '#333' }}>
                      {food.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#999' }}>
                      {food.caloriesPer100g} cal/100g
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">🍽️ Recent Recipes</div>
          </div>
          <div className="card-body">
            {recentRecipes.length === 0 ? (
              <p style={{ color: '#999' }}>No recipes yet. Create one to get started!</p>
            ) : (
              <ul style={{ listStyle: 'none' }}>
                {recentRecipes.map((recipe) => (
                  <li
                    key={recipe.id}
                    style={{
                      padding: '0.5rem 0',
                      borderBottom: '1px solid #f0f0f0',
                    }}
                  >
                    <div style={{ fontWeight: 'bold', color: '#333' }}>
                      {recipe.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#999' }}>
                      {recipe.totalCalories.toFixed(0)} total cal
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

