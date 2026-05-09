import React, { useEffect, useState } from 'react';
import { dailyLogAPI, foodAPI, recipeAPI } from '../api/api';
import Alert from '../components/Alert';
import NutritionBadge from '../components/NutritionBadge';

function DailyJournalPage() {
    const [dailyLog, setDailyLog] = useState(null);
    const [foods, setFoods] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);

    const [formData, setFormData] = useState({
        itemType: 'FOOD',
        itemId: '',
        quantityInGrams: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const getErrorMessage = (error, fallback) => {
        return error.response?.data?.message || error.response?.data?.error || error.message || fallback;
    };

    const fetchData = async () => {
        try {
            setLoading(true);

            const [dailyRes, foodsRes, recipesRes] = await Promise.all([
                dailyLogAPI.getToday(),
                foodAPI.getAll(),
                recipeAPI.getAll(),
            ]);

            setDailyLog(dailyRes.data);
            setFoods(foodsRes.data || []);
            setRecipes(recipesRes.data || []);
        } catch (error) {
            setAlert({
                type: 'error',
                message: getErrorMessage(error, 'Failed to load daily journal'),
            });
        } finally {
            setLoading(false);
        }
    };

    const availableItems = formData.itemType === 'FOOD' ? foods : recipes;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.itemId || !formData.quantityInGrams) {
            setAlert({ type: 'error', message: 'Select an item and enter quantity.' });
            return;
        }

        try {
            const payload =
                formData.itemType === 'FOOD'
                    ? {
                        foodId: Number(formData.itemId),
                        quantityInGrams: Number(formData.quantityInGrams),
                    }
                    : {
                        recipeId: Number(formData.itemId),
                        quantityInGrams: Number(formData.quantityInGrams),
                    };

            await dailyLogAPI.create(payload);

            setFormData({
                itemType: 'FOOD',
                itemId: '',
                quantityInGrams: '',
            });

            setAlert({ type: 'success', message: 'Item added to today journal.' });
            await fetchData();
        } catch (error) {
            setAlert({
                type: 'error',
                message: getErrorMessage(error, 'Failed to add item.'),
            });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Remove this item from today journal?')) return;

        try {
            await dailyLogAPI.delete(id);
            setAlert({ type: 'success', message: 'Entry removed.' });
            await fetchData();
        } catch (error) {
            setAlert({
                type: 'error',
                message: getErrorMessage(error, 'Failed to remove entry.'),
            });
        }
    };

    const formatNumber = (value) => Number(value || 0).toFixed(1);

    if (loading) {
        return (
            <div className="loading">
                <div className="loading-spinner"></div>
                <p>Loading daily journal...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="page-header">
                <div>
                    <p className="eyebrow">Today</p>
                    <h2>📘 Daily Journal</h2>
                    <p>Track what you eat today and see your nutrition totals instantly.</p>
                </div>
            </div>

            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}

            <div className="stats-grid">
                <div className="stat-card calories">
                    <span>Total Calories</span>
                    <strong>{formatNumber(dailyLog?.totalCalories)}</strong>
                    <small>kcal</small>
                </div>

                <div className="stat-card protein">
                    <span>Proteins</span>
                    <strong>{formatNumber(dailyLog?.totalProteins)}</strong>
                    <small>grams</small>
                </div>

                <div className="stat-card carbs">
                    <span>Carbs</span>
                    <strong>{formatNumber(dailyLog?.totalCarbs)}</strong>
                    <small>grams</small>
                </div>

                <div className="stat-card fat">
                    <span>Fat</span>
                    <strong>{formatNumber(dailyLog?.totalFat)}</strong>
                    <small>grams</small>
                </div>
            </div>

            <div className="section">
                <h3 className="section-title">Add food or recipe</h3>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="form-field">
                            <label>Type</label>
                            <select
                                value={formData.itemType}
                                onChange={(e) =>
                                    setFormData({
                                        itemType: e.target.value,
                                        itemId: '',
                                        quantityInGrams: formData.quantityInGrams,
                                    })
                                }
                            >
                                <option value="FOOD">Food</option>
                                <option value="RECIPE">Recipe</option>
                            </select>
                        </div>

                        <div className="form-field">
                            <label>{formData.itemType === 'FOOD' ? 'Food' : 'Recipe'}</label>
                            <select
                                value={formData.itemId}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        itemId: e.target.value,
                                    }))
                                }
                            >
                                <option value="">-- Select item --</option>
                                {availableItems.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name} ({formatNumber(item.caloriesPer100g)} cal/100g)
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-field">
                            <label>Quantity in grams</label>
                            <input
                                type="number"
                                min="1"
                                step="1"
                                value={formData.quantityInGrams}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        quantityInGrams: e.target.value,
                                    }))
                                }
                                placeholder="200"
                            />
                        </div>
                    </div>

                    <button className="button btn-success" type="submit">
                        ➕ Add to journal
                    </button>
                </form>
            </div>

            <div className="section">
                <h3 className="section-title">Today entries</h3>

                {!dailyLog?.entries || dailyLog.entries.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">🍽️</div>
                        <p>No entries for today yet.</p>
                    </div>
                ) : (
                    <div className="journal-list">
                        {dailyLog.entries.map((entry) => (
                            <div key={entry.id} className="journal-entry">
                                <div>
                                    <strong>{entry.itemName}</strong>
                                    <span>
                    {entry.itemType} · {entry.quantityInGrams}g
                  </span>

                                    <div className="entry-badges">
                                        <NutritionBadge label="Cal" value={entry.calories} unit="" />
                                        <NutritionBadge label="P" value={entry.proteins} unit="g" />
                                        <NutritionBadge label="C" value={entry.carbs} unit="g" />
                                        <NutritionBadge label="F" value={entry.fat} unit="g" />
                                    </div>
                                </div>

                                <button
                                    className="button btn-danger btn-small"
                                    onClick={() => handleDelete(entry.id)}
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DailyJournalPage;