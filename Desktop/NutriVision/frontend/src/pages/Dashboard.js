import React, { useState, useEffect } from 'react';
import { foodAPI, recipeAPI, dailyLogAPI } from '../api/api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

function Dashboard() {
  const [stats, setStats] = useState({
    totalFoods: 0,
    totalRecipes: 0,
    avgCalories: 0,
    avgProteins: 0,
    todayCalories: 0,
    todayProteins: 0,
    todayCarbs: 0,
    todayFat: 0,
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

      const [foodsRes, recipesRes, dailyRes] = await Promise.all([
        foodAPI.getAll(),
        recipeAPI.getAll(),
        dailyLogAPI.getToday().catch(() => ({ data: null })),
      ]);

      const foods = foodsRes.data || [];
      const recipes = recipesRes.data || [];
      const daily = dailyRes.data || null;

      const nutritionItems = [...foods, ...recipes];

      const avgCalories =
          nutritionItems.length > 0
              ? nutritionItems.reduce((sum, item) => sum + Number(item.caloriesPer100g || 0), 0) /
              nutritionItems.length
              : 0;

      const avgProteins =
          nutritionItems.length > 0
              ? nutritionItems.reduce((sum, item) => sum + Number(item.proteinsPer100g || 0), 0) /
              nutritionItems.length
              : 0;

      setStats({
        totalFoods: foods.length,
        totalRecipes: recipes.length,
        avgCalories,
        avgProteins,
        todayCalories: daily?.totalCalories || 0,
        todayProteins: daily?.totalProteins || 0,
        todayCarbs: daily?.totalCarbs || 0,
        todayFat: daily?.totalFat || 0,
      });

      setRecentFoods(foods.slice(-4).reverse());
      setRecentRecipes(recipes.slice(-4).reverse());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (value) => Number(value || 0).toFixed(1);

  const barData = [
    { name: 'Foods', count: stats.totalFoods },
    { name: 'Recipes', count: stats.totalRecipes },
  ];

  const macroData = [
    { name: 'Protein', value: Number(stats.todayProteins || 0) },
    { name: 'Carbs', value: Number(stats.todayCarbs || 0) },
    { name: 'Fat', value: Number(stats.todayFat || 0) },
  ];

  const COLORS = ['#22c55e', '#f59e0b', '#8b5cf6'];

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
        <div className="page-header">
          <div>
            <p className="eyebrow">Overview</p>
            <h2>Welcome to NutriVision</h2>
            <p>Your personal nutrition command center. Chicken Chad approves.</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon food">🥗</div>
            <div>
              <span>Total Foods</span>
              <strong>{stats.totalFoods}</strong>
              <small>Foods in database</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon recipe">👨‍🍳</div>
            <div>
              <span>Total Recipes</span>
              <strong>{stats.totalRecipes}</strong>
              <small>Recipes created</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon calories">🔥</div>
            <div>
              <span>Avg Calories</span>
              <strong>{formatNumber(stats.avgCalories)}</strong>
              <small>Per 100g average</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon protein">💪</div>
            <div>
              <span>Avg Proteins</span>
              <strong>{formatNumber(stats.avgProteins)}g</strong>
              <small>Per 100g average</small>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon calories">🔥</div>
            <div>
              <span>Today Calories</span>
              <strong>{formatNumber(stats.todayCalories)}</strong>
              <small>kcal consumed today</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon protein">💪</div>
            <div>
              <span>Today Protein</span>
              <strong>{formatNumber(stats.todayProteins)}g</strong>
              <small>protein consumed today</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon carbs">🌾</div>
            <div>
              <span>Today Carbs</span>
              <strong>{formatNumber(stats.todayCarbs)}g</strong>
              <small>carbs consumed today</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon fat">💧</div>
            <div>
              <span>Today Fat</span>
              <strong>{formatNumber(stats.todayFat)}g</strong>
              <small>fat consumed today</small>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="chart-card">
            <h3>Database Overview</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis allowDecimals={false} stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="count" radius={[12, 12, 0, 0]} fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Today Macros</h3>
            {macroData.every((item) => item.value === 0) ? (
                <div className="empty-state">
                  <div className="empty-state-icon">📘</div>
                  <p>No journal entries today.</p>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={macroData} dataKey="value" nameKey="name" outerRadius={95} label>
                      {macroData.map((entry, index) => (
                          <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="panel-card">
            <h3>📝 Recent Foods</h3>
            {recentFoods.length === 0 ? (
                <p>No foods yet. Create one to get started.</p>
            ) : (
                <ul className="mini-list">
                  {recentFoods.map((food) => (
                      <li key={food.id}>
                        <strong>{food.name}</strong>
                        <span>
                    {formatNumber(food.caloriesPer100g)} cal/100g ·{' '}
                          {formatNumber(food.proteinsPer100g)}g protein/100g
                  </span>
                      </li>
                  ))}
                </ul>
            )}
          </div>

          <div className="panel-card">
            <h3>🍽️ Recent Recipes</h3>
            {recentRecipes.length === 0 ? (
                <p>No recipes yet. Create one to get started.</p>
            ) : (
                <ul className="mini-list">
                  {recentRecipes.map((recipe) => (
                      <li key={recipe.id}>
                        <strong>{recipe.name}</strong>
                        <span>
                    {formatNumber(recipe.caloriesPer100g)} cal/100g ·{' '}
                          {formatNumber(recipe.proteinsPer100g)}g protein/100g
                  </span>
                      </li>
                  ))}
                </ul>
            )}
          </div>
        </div>
      </div>
  );
}

export default Dashboard;