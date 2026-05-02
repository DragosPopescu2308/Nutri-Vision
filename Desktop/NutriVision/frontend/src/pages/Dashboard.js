import React, { useState, useEffect } from 'react';
import { foodAPI, recipeAPI } from '../api/api';

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

      const nutritionItems = [...foods, ...recipes];

      let avgCal = 0;
      let avgProt = 0;

      if (nutritionItems.length > 0) {
        avgCal =
            nutritionItems.reduce(
                (sum, item) => sum + Number(item.caloriesPer100g || 0),
                0
            ) / nutritionItems.length;

        avgProt =
            nutritionItems.reduce(
                (sum, item) => sum + Number(item.proteinsPer100g || 0),
                0
            ) / nutritionItems.length;
      }

      setStats({
        totalFoods: foods.length,
        totalRecipes: recipes.length,
        avgCalories: avgCal,
        avgProteins: avgProt,
      });

      setRecentFoods(foods.slice(-3).reverse());
      setRecentRecipes(recipes.slice(-3).reverse());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (value) => {
    return Number(value || 0).toFixed(1);
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
                {formatNumber(stats.avgCalories)}
              </div>
              <p style={{ color: '#999', marginTop: '0.5rem' }}>
                Per 100g average, foods + recipes
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">💪 Avg Proteins</div>
            </div>
            <div className="card-body">
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#51cf66' }}>
                {formatNumber(stats.avgProteins)}g
              </div>
              <p style={{ color: '#999', marginTop: '0.5rem' }}>
                Per 100g average, foods + recipes
              </p>
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
                            {formatNumber(food.caloriesPer100g)} cal/100g ·{' '}
                            {formatNumber(food.proteinsPer100g)}g protein/100g
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
                            {formatNumber(recipe.caloriesPer100g)} cal/100g ·{' '}
                            {formatNumber(recipe.proteinsPer100g)}g protein/100g
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