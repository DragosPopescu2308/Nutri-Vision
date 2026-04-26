import React, { useState, useEffect } from 'react';
import { foodAPI } from '../api/api';
import Alert from '../components/Alert';
import NutritionBadge from '../components/NutritionBadge';

function FoodPage() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    caloriesPer100g: '',
    proteinsPer100g: '',
    fatPer100g: '',
    carbsPer100g: '',
  });

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const response = await foodAPI.getAll();
      setFoods(response.data || []);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to load foods' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.caloriesPer100g) {
      setAlert({ type: 'error', message: 'Please fill in required fields' });
      return;
    }

    try {
      const data = {
        name: formData.name,
        brand: formData.brand,
        caloriesPer100g: parseFloat(formData.caloriesPer100g),
        proteinsPer100g: parseFloat(formData.proteinsPer100g) || 0,
        fatPer100g: parseFloat(formData.fatPer100g) || 0,
        carbsPer100g: parseFloat(formData.carbsPer100g) || 0,
      };

      if (editingId) {
        await foodAPI.update(editingId, data);
        setAlert({ type: 'success', message: 'Food updated successfully!' });
      } else {
        await foodAPI.create(data);
        setAlert({ type: 'success', message: 'Food created successfully!' });
      }

      resetForm();
      await fetchFoods();
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Failed to save food' });
    }
  };

  const handleEdit = (food) => {
    setFormData({
      name: food.name,
      brand: food.brand || '',
      caloriesPer100g: food.caloriesPer100g,
      proteinsPer100g: food.proteinsPer100g,
      fatPer100g: food.fatPer100g,
      carbsPer100g: food.carbsPer100g,
    });
    setEditingId(food.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this food?')) return;

    try {
      await foodAPI.delete(id);
      setAlert({ type: 'success', message: 'Food deleted successfully!' });
      await fetchFoods();
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to delete food' });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      caloriesPer100g: '',
      proteinsPer100g: '',
      fatPer100g: '',
      carbsPer100g: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading foods...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="page-title">🥗 Food Database</h2>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="section">
        <button
          className="button btn-primary"
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
        >
          {showForm ? '✕ Cancel' : '+ Add New Food'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
            <div className="form-group">
              <div className="form-field">
                <label>Food Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Chicken Breast"
                  required
                />
              </div>
              <div className="form-field">
                <label>Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="Brand name (optional)"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-field">
                <label>Calories per 100g *</label>
                <input
                  type="number"
                  name="caloriesPer100g"
                  value={formData.caloriesPer100g}
                  onChange={handleInputChange}
                  placeholder="165"
                  step="0.1"
                  min="0"
                  required
                />
              </div>
              <div className="form-field">
                <label>Proteins per 100g (g)</label>
                <input
                  type="number"
                  name="proteinsPer100g"
                  value={formData.proteinsPer100g}
                  onChange={handleInputChange}
                  placeholder="31"
                  step="0.1"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-field">
                <label>Fats per 100g (g)</label>
                <input
                  type="number"
                  name="fatPer100g"
                  value={formData.fatPer100g}
                  onChange={handleInputChange}
                  placeholder="3.6"
                  step="0.1"
                  min="0"
                  max="100"
                />
              </div>
              <div className="form-field">
                <label>Carbs per 100g (g)</label>
                <input
                  type="number"
                  name="carbsPer100g"
                  value={formData.carbsPer100g}
                  onChange={handleInputChange}
                  placeholder="0"
                  step="0.1"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="button btn-success" style={{ flex: 1 }}>
                {editingId ? '💾 Update Food' : '➕ Create Food'}
              </button>
              <button
                type="button"
                className="button btn-secondary"
                onClick={resetForm}
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {foods.length === 0 ? (
        <div className="section">
          <div className="empty-state">
            <div className="empty-state-icon">🥘</div>
            <p>No foods in database yet. Create one to get started!</p>
          </div>
        </div>
      ) : (
        <div className="cards-grid">
          {foods.map((food) => (
            <div key={food.id} className="card">
              <div className="card-header">
                <div className="card-title">{food.name}</div>
                {food.brand && <div className="card-subtitle">{food.brand}</div>}
              </div>
              <div className="card-body">
                <div className="nutrition-row">
                  <span className="nutrition-label">Calories</span>
                  <span className="nutrition-value">{food.caloriesPer100g}</span>
                </div>
                <div className="nutrition-row">
                  <span className="nutrition-label">Proteins</span>
                  <span className="nutrition-value">{food.proteinsPer100g}g</span>
                </div>
                <div className="nutrition-row">
                  <span className="nutrition-label">Fats</span>
                  <span className="nutrition-value">{food.fatPer100g}g</span>
                </div>
                <div className="nutrition-row">
                  <span className="nutrition-label">Carbs</span>
                  <span className="nutrition-value">{food.carbsPer100g}g</span>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <NutritionBadge label="Cal" value={food.caloriesPer100g} unit="" />
                  <NutritionBadge label="P" value={food.proteinsPer100g} unit="g" />
                  <NutritionBadge label="F" value={food.fatPer100g} unit="g" />
                  <NutritionBadge label="C" value={food.carbsPer100g} unit="g" />
                </div>
              </div>
              <div className="card-actions">
                <button
                  className="button btn-primary btn-small"
                  onClick={() => handleEdit(food)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="button btn-danger btn-small"
                  onClick={() => handleDelete(food.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FoodPage;

