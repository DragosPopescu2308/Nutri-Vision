# 🥗 NutriVision - Quick Reference Guide

## 📱 Pages Overview

### 🏠 Dashboard
- **Purpose**: Overview of the entire application
- **Features**:
  - Total foods in database
  - Total recipes created
  - Average calories per 100g across all foods
  - Average proteins per 100g across all foods
  - 3 most recent foods
  - 3 most recent recipes
- **Actions**: None (view-only)

### 🥗 Foods
- **Purpose**: Manage food database
- **View**: Card layout showing all foods
- **Data per food**:
  - Name
  - Brand (if set)
  - Calories per 100g
  - Proteins per 100g
  - Fats per 100g
  - Carbs per 100g
- **Actions**:
  - ➕ Add New Food - opens form
  - ✏️ Edit - modify existing food
  - 🗑️ Delete - remove food
- **Form Fields** (marked * are required):
  - Food Name * (max 100 chars)
  - Brand (optional)
  - Calories per 100g * (must be positive)
  - Proteins per 100g (0-100g)
  - Fats per 100g (0-100g)
  - Carbs per 100g (0-100g)

### 🍽️ Recipes
- **Purpose**: Manage recipes and calculate nutrition
- **View**: Card layout showing all recipes
- **Data per recipe** (displayed per 100g):
  - Name
  - Description (if set)
  - Calories per 100g (displayed)
  - Proteins per 100g (displayed)
  - Fats per 100g (displayed)
  - Carbs per 100g (displayed)
  - Final cooked weight in grams (reference)
  - List of ingredients with weights
- **Actions**:
  - ➕ Create New Recipe - opens form
  - ✏️ Edit - modify recipe and ingredients
  - 🗑️ Delete - remove recipe
- **Form Fields** (marked * are required):
  - Recipe Name * (must not be empty)
  - Description (optional)
  - **Final Cooked Weight: Read-only (auto-calculated from ingredients)** ✨
  - Ingredients * (at least 1 required)
- **Add Ingredients** (with Auto-Weight Calculation):
  - Select Food from dropdown (shows calories)
  - Enter weight in grams
  - Click "Add Ingredient"
  - ✨ **Final Cooked Weight auto-updates to sum of all ingredient weights**
  - Remove ingredient with "Remove" button
  - ✨ **Final Cooked Weight auto-recalculates when ingredient removed**
- **Calculations**:
  - Total nutrition = sum of (food nutrition × weight/100) for all ingredients
  - Per 100g = total nutrition ÷ final weight × 100
  - Final weight = sum of all ingredient weights (auto-calculated, editable)

## 🎮 How to Use

### Adding a Food
1. Go to **Foods** page
2. Click **"+ Add New Food"**
3. Fill in the form:
   - Name: "Chicken Breast"
   - Brand: "Organic" (optional)
   - Calories: 165
   - Proteins: 31
   - Fats: 3.6
   - Carbs: 0
4. Click **"➕ Create Food"**
5. You'll see "✅ Food created successfully!"

### Editing a Food
1. Go to **Foods** page
2. Find the food card
3. Click **"✏️ Edit"** button
4. Modify the values
5. Click **"💾 Update Food"**

### Deleting a Food
1. Go to **Foods** page
2. Find the food card
3. Click **"🗑️ Delete"** button
4. Confirm in the dialog

### Creating a Recipe
1. Go to **Recipes** page
2. Click **"+ Create New Recipe"**
3. Fill in basic info:
   - Recipe Name: "Grilled Chicken with Rice"
   - Description: "Healthy dinner" (optional)
   - **Final Cooked Weight: Will auto-calculate below** ✨ NEW
4. **Add ingredients** (Final Weight auto-calculates):
   - Select "Chicken Breast" from dropdown
   - Enter 200 grams
   - Click "➕ Add Ingredient"
   - ✨ **Final Weight auto-updates to 200g** (read-only)
   - Select "Rice" from dropdown
   - Enter 300 grams
   - Click "➕ Add Ingredient"
   - ✨ **Final Weight auto-updates to 500g** (read-only)
5. ✨ **Can't manually edit Final Weight** - it's auto-calculated from ingredients
6. Click **"➕ Create Recipe"**
7. System calculates all nutrition values per 100g automatically
8. You'll see "✅ Recipe created successfully!"

### Editing a Recipe
1. Go to **Recipes** page
2. Find the recipe card
3. Click **"✏️ Edit"** button
4. Modify recipe details or ingredients
5. Click **"💾 Update Recipe"**

### Deleting a Recipe
1. Go to **Recipes** page
2. Find the recipe card
3. Click **"🗑️ Delete"** button
4. Confirm in the dialog

## 🎨 UI Components

### Alert Notifications
- **Green (Success)**: Operation completed successfully
- **Red (Error)**: Something went wrong
- **Blue (Info)**: Information message
- **Auto-dismiss**: Closes after 5 seconds

### Nutrition Badges
- Colored pills showing nutrition values
- Format: "Label: Value unit"
- Example: "Cal: 165" (no unit for calories)

### Cards
- Hover effect lifts the card
- White background with shadow
- Organized nutrition information
- Action buttons at bottom

### Forms
- Input fields with validation
- Required fields marked with *
- Clear labels and placeholders
- Submit and cancel buttons
- Real-time feedback on submission

## 🔍 Data Validation Rules

### Food Fields
- **Name**: 1-100 characters, required
- **Brand**: optional, max 100 chars
- **Calories**: required, must be positive
- **Proteins**: optional, 0-100g (decimal allowed)
- **Fats**: optional, 0-100g (decimal allowed)
- **Carbs**: optional, 0-100g (decimal allowed)

### Recipe Fields
- **Name**: required, not blank
- **Description**: optional
- **Final Cooked Weight**: required, 1-10000g
- **Ingredients**: required, at least 1 ingredient
  - **Food**: must select from dropdown
  - **Weight**: must be positive number

## 🚨 Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Failed to load foods" | Backend not running | Start backend with `mvn spring-boot:run` |
| "Please fill in required fields" | Missing required data | Check all fields marked with * |
| "Cannot connect to server" | API URL wrong or backend down | Check localhost:8080 is accessible |
| "At least one ingredient is required" | Recipe has no ingredients | Add at least one food ingredient |

## 💡 Tips & Tricks

1. **Quick Add Foods First**: Create basic foods before making recipes
2. **Use Realistic Weights**: Recipe weight is after cooking
3. **Check Nutrition**: Use badges to quickly see nutrition values
4. **Edit Before Delete**: If unsure, edit to check values
5. **Copy Recipes**: Edit existing recipe and save with new name
6. **Decimal Values**: Use decimals for precise nutrition (e.g., 3.6g)

## ⌨️ Keyboard Shortcuts

- No keyboard shortcuts currently, but coming in future versions

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 📱 Mobile Usage

- Fully responsive design
- Touch-friendly buttons (40px minimum)
- Single column layout on mobile
- Full functionality on all devices

## 🔗 Related Pages

- See **HELP.md** for troubleshooting
- See **ARCHITECTURE.md** for technical details
- See **FRONTEND_SETUP.md** for setup instructions

## 📊 Example Data

### Sample Food
```
Name: Chicken Breast
Brand: Organic
Calories: 165 per 100g
Proteins: 31g per 100g
Fats: 3.6g per 100g
Carbs: 0g per 100g
```

### Sample Recipe
```
Name: Grilled Chicken with Rice
Final Weight: 500g (auto-calculated from ingredients)

Ingredients:
- Chicken Breast: 200g → 200 × 165/100 = 330 calories
- White Rice: 300g → 300 × 130/100 = 390 calories

Calculations:
Total: 720 calories
Per 100g: 720 ÷ 500 × 100 = 144 calories/100g

Recipe Card displays: ✨
- Calories/100g: 144
- Proteins/100g: 12.4g
- Fats/100g: 0.72g
- Carbs/100g: 10.4g
- Final Weight: 500g (reference)
```

## 🎯 Best Practices

1. **Keep Foods Updated**: Update when nutritional info changes
2. **Use Accurate Weights**: Measure ingredients accurately
3. **Regular Backups**: Export or screenshot important recipes
4. **Name Clearly**: Use descriptive names for recipes
5. **Set Descriptions**: Add cooking notes to recipes

## 🔔 Notifications

- **✅ Success**: Green notification (auto-dismisses)
- **❌ Error**: Red notification with error details
- **⏳ Loading**: Spinner shown during API calls
- **📝 Form Errors**: Red border on invalid fields

---

For more detailed information, see HELP.md or ARCHITECTURE.md

