import React, { useState, useEffect } from 'react';
import { recipeAPI, foodAPI } from '../api/api';
import Alert from '../components/Alert';
import NutritionBadge from '../components/NutritionBadge';

function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: [],
  });
  const [tempIngredient, setTempIngredient] = useState({
    foodId: '',
    weightInGrams: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [recipesRes, foodsRes] = await Promise.all([
        recipeAPI.getAll(),
        foodAPI.getAll(),
      ]);
      setRecipes(recipesRes.data || []);
      setFoods(foodsRes.data || []);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to load data' });
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

  const handleAddIngredient = () => {
    if (!tempIngredient.foodId || !tempIngredient.weightInGrams) {
      setAlert({ type: 'error', message: 'Please select food and enter weight' });
      return;
    }

    const newIngredient = {
      foodId: parseInt(tempIngredient.foodId),
      weightInGrams: parseFloat(tempIngredient.weightInGrams),
    };

    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient],
    }));

    setTempIngredient({ foodId: '', weightInGrams: '' });
  };

  const handleRemoveIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || formData.ingredients.length === 0) {
      setAlert({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }

    try {
      // Calculate final weight from ingredients
      const finalCookedWeight = formData.ingredients.reduce(
        (sum, ing) => sum + ing.weightInGrams,
        0
      );

      const data = {
        name: formData.name,
        description: formData.description,
        finalCookedWeight: finalCookedWeight,
        ingredients: formData.ingredients,
      };

      if (editingId) {
        await recipeAPI.update(editingId, data);
        setAlert({ type: 'success', message: 'Recipe updated successfully!' });
      } else {
        await recipeAPI.create(data);
        setAlert({ type: 'success', message: 'Recipe created successfully!' });
      }

      resetForm();
      await fetchData();
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Failed to save recipe',
      });
    }
  };

  const handleEdit = (recipe) => {
    setFormData({
      name: recipe.name,
      description: recipe.description || '',
      ingredients: recipe.ingredients.map((ing) => ({
        foodId: ing.foodId,
        weightInGrams: ing.weightInGrams,
      })),
    });
    setEditingId(recipe.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    try {
      await recipeAPI.delete(id);
      setAlert({ type: 'success', message: 'Recipe deleted successfully!' });
      await fetchData();
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to delete recipe' });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      ingredients: [],
    });
    setTempIngredient({ foodId: '', weightInGrams: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const getFoodName = (foodId) => {
    return foods.find((f) => f.id === foodId)?.name || 'Unknown';
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading recipes...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="page-title">🍽️ Recipes</h2>

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
          {showForm ? '✕ Cancel' : '+ Create New Recipe'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
            <div className="form-group-full form-field">
              <label>Recipe Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Grilled Chicken with Rice"
                required
              />
            </div>

            <div className="form-group-full form-field">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Recipe description (optional)"
              />
            </div>

            <div className="form-group-full">
              <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px' }}>
                <h3 style={{ marginBottom: '1rem', color: '#333' }}>Add Ingredients</h3>

                <div style={{
                  background: '#e7f5ff',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  borderLeft: '4px solid #4dabf7'
                }}>
                  <div style={{ fontWeight: '600', color: '#1971c2', marginBottom: '0.5rem' }}>
                    Final Weight (Auto-calculated)
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1971c2' }}>
                    {formData.ingredients.reduce((sum, ing) => sum + ing.weightInGrams, 0)}g
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#1971c2', marginTop: '0.5rem' }}>
                    ✓ Automatically calculated from ingredient weights
                  </div>
                </div>

                <div className="form-group">
                  <div className="form-field">
                    <label>Select Food *</label>
                    <select
                      value={tempIngredient.foodId}
                      onChange={(e) =>
                        setTempIngredient((prev) => ({
                          ...prev,
                          foodId: e.target.value,
                        }))
                      }
                    >
                      <option value="">-- Select Food --</option>
                      {foods.map((food) => (
                        <option key={food.id} value={food.id}>
                          {food.name} ({food.caloriesPer100g} cal/100g)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Weight in Grams *</label>
                    <input
                      type="number"
                      value={tempIngredient.weightInGrams}
                      onChange={(e) =>
                        setTempIngredient((prev) => ({
                          ...prev,
                          weightInGrams: e.target.value,
                        }))
                      }
                      placeholder="100"
                      step="1"
                      min="1"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="button btn-secondary"
                  onClick={handleAddIngredient}
                  style={{ width: '100%' }}
                >
                  ➕ Add Ingredient
                </button>
              </div>
            </div>

            {formData.ingredients.length > 0 && (
              <div className="form-group-full">
                <h3 style={{ marginBottom: '1rem', color: '#333' }}>Ingredients</h3>
                <div className="ingredients-list">
                  {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-item">
                      <div className="ingredient-info">
                        <div className="ingredient-name">
                          {getFoodName(ingredient.foodId)}
                        </div>
                        <div className="ingredient-weight">{ingredient.weightInGrams}g</div>
                      </div>
                      <button
                        type="button"
                        className="button btn-danger btn-small"
                        onClick={() => handleRemoveIngredient(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button type="submit" className="button btn-success" style={{ flex: 1 }}>
                {editingId ? '💾 Update Recipe' : '➕ Create Recipe'}
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

      {recipes.length === 0 ? (
        <div className="section">
          <div className="empty-state">
            <div className="empty-state-icon">👨‍🍳</div>
            <p>No recipes yet. Create one to get started!</p>
          </div>
        </div>
      ) : (
        <div className="cards-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="card">
              <div className="card-header">
                <div className="card-title">{recipe.name}</div>
                {recipe.description && (
                  <div className="card-subtitle">{recipe.description}</div>
                )}
              </div>
              <div className="card-body">
                <div className="nutrition-row">
                  <span className="nutrition-label">Calories/100g</span>
                  <span className="nutrition-value">{recipe.caloriesPer100g.toFixed(1)}</span>
                </div>
                <div className="nutrition-row">
                  <span className="nutrition-label">Proteins/100g</span>
                  <span className="nutrition-value">{recipe.proteinsPer100g.toFixed(1)}g</span>
                </div>
                <div className="nutrition-row">
                  <span className="nutrition-label">Fats/100g</span>
                  <span className="nutrition-value">{recipe.fatPer100g.toFixed(1)}g</span>
                </div>
                <div className="nutrition-row">
                  <span className="nutrition-label">Carbs/100g</span>
                  <span className="nutrition-value">{recipe.carbsPer100g.toFixed(1)}g</span>
                </div>
                <div className="nutrition-row">
                  <span className="nutrition-label">Final Weight</span>
                  <span className="nutrition-value">{recipe.finalCookedWeight}g</span>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <NutritionBadge label="Cal" value={recipe.caloriesPer100g} unit="" />
                  <NutritionBadge label="P" value={recipe.proteinsPer100g} unit="g" />
                  <NutritionBadge label="F" value={recipe.fatPer100g} unit="g" />
                  <NutritionBadge label="C" value={recipe.carbsPer100g} unit="g" />
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <h4 style={{ marginBottom: '0.5rem', color: '#333' }}>
                    Ingredients ({recipe.ingredients.length})
                  </h4>
                  <ul style={{ fontSize: '0.9rem', color: '#666' }}>
                    {recipe.ingredients.map((ing, idx) => (
                      <li key={idx}>
                        {ing.foodName} - {ing.weightInGrams}g
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="card-actions">
                <button
                  className="button btn-primary btn-small"
                  onClick={() => handleEdit(recipe)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="button btn-danger btn-small"
                  onClick={() => handleDelete(recipe.id)}
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

export default RecipePage;











