# NutriVision Frontend

A modern React-based frontend for the NutriVision nutrition management application.

## Features

- 🥗 **Food Database Management**: Create, read, update, and delete foods with nutritional information
- 🍽️ **Recipe Management**: Create recipes with multiple ingredients and automatic nutrition calculation
- 📊 **Dashboard**: View statistics and recent foods/recipes at a glance
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- 🎨 **Modern UI**: Gradient backgrounds, smooth animations, and intuitive navigation

## Technologies Used

- React 18
- Axios for API communication
- CSS3 with modern features (Grid, Flexbox)
- React Router (optional for future navigation)

## Installation

1. Ensure Node.js is installed on your system
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Make sure your backend is running on `http://localhost:8080`
2. Start the development server:
   ```bash
   npm start
   ```
3. The application will open in your browser at `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── api.js              # API client setup
│   ├── components/
│   │   ├── Alert.js            # Alert notification component
│   │   └── NutritionBadge.js    # Nutrition badge component
│   ├── pages/
│   │   ├── Dashboard.js         # Dashboard page
│   │   ├── FoodPage.js          # Food management page
│   │   └── RecipePage.js        # Recipe management page
│   ├── App.js                   # Main app component
│   ├── App.css                  # Global styles
│   └── index.js                 # Entry point
├── package.json
└── README.md
```

## API Endpoints

The frontend communicates with these backend endpoints:

### Foods
- `GET /api/foods` - Get all foods
- `GET /api/foods/{id}` - Get food by ID
- `POST /api/foods` - Create new food
- `PUT /api/foods/{id}` - Update food
- `DELETE /api/foods/{id}` - Delete food

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/{id}` - Get recipe by ID
- `POST /api/recipes` - Create new recipe
- `PUT /api/recipes/{id}` - Update recipe
- `DELETE /api/recipes/{id}` - Delete recipe

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Customization

### Changing API URL
Edit the `.env` file:
```
REACT_APP_API_URL=http://your-backend-url/api
```

### Styling
All CSS is in `src/App.css`. Modify the colors, fonts, and layout to match your preferences.

## Notes

- The application is designed to work with the NutriVision backend Spring Boot API
- Ensure CORS is properly configured on the backend to allow requests from the frontend
- The proxy in package.json is configured for local development only

## Future Enhancements

- User authentication
- Recipe sharing functionality
- Nutrition charts and analytics
- Meal planning features
- Mobile app version

