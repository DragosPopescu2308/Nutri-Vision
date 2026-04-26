# 🥗 NutriVision - Application Architecture

## Overview

NutriVision este o aplicație full-stack pentru gestionarea alimentelor și rețetelor cu tracking nutritional complet.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                         │
│              Port 3000 - http://localhost:3000              │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Dashboard (Statistics & Overview)            │  │
│  │         Foods (CRUD Operations)                      │  │
│  │         Recipes (CRUD Operations)                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                  │
│                HTTP/REST │ (Axios)                         │
│                          ▼                                  │
└─────────────────────────────────────────────────────────────┘
           │
           │ CORS Enabled
           │
           ▼
┌─────────────────────────────────────────────────────────────┐
│              Backend (Spring Boot)                          │
│          Port 8080 - http://localhost:8080                 │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  REST API Controllers                                │  │
│  │  ├─ /api/foods (GET, POST, PUT, DELETE)            │  │
│  │  └─ /api/recipes (GET, POST, PUT, DELETE)          │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                  │
│                    Spring Boot Data JPA                     │
│                          │                                  │
│                          ▼                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Business Logic (Services)                           │  │
│  │  ├─ FoodService                                      │  │
│  │  └─ RecipeService                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                  │
│                          ▼                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Data Persistence (Repositories)                     │  │
│  │  ├─ FoodRepository                                   │  │
│  │  └─ RecipeRepository                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                  │
│                          ▼                                  │
└─────────────────────────────────────────────────────────────┘
           │
           │ JDBC / MySQL Driver
           │
           ▼
┌─────────────────────────────────────────────────────────────┐
│                  MySQL Database                             │
│        (Configured in application.properties)              │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **React 18**: UI library
- **Axios**: HTTP client
- **CSS3**: Styling with Grid, Flexbox, Gradients
- **Node.js**: Runtime environment
- **npm**: Package manager

### Backend
- **Spring Boot 4.0.5**: Java framework
- **Spring Data JPA**: ORM
- **MySQL**: Database
- **Maven**: Build tool
- **Java 21**: Programming language

## Data Models

### Food Entity
```
Food {
  id: Long (PK)
  name: String (required)
  brand: String (optional)
  caloriesPer100g: Double (required)
  proteinsPer100g: Double
  fatPer100g: Double
  carbsPer100g: Double
}
```

### Recipe Entity
```
Recipe {
  id: Long (PK)
  name: String (required)
  description: String (optional)
  ingredients: List<RecipeIngredient> (1..*)
  finalCookedWeight: Double (required, in grams)
  totalCalories: Double (calculated)
  totalProteins: Double (calculated)
  totalFat: Double (calculated)
  totalCarbs: Double (calculated)
  caloriesPer100g: Double (calculated)
  proteinsPer100g: Double (calculated)
  fatPer100g: Double (calculated)
  carbsPer100g: Double (calculated)
}
```

### RecipeIngredient Entity
```
RecipeIngredient {
  id: Long (PK)
  recipe: Recipe (FK)
  food: Food (FK)
  weightInGrams: Double (required)
}
```

## API Endpoints

### Foods
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/foods` | Get all foods |
| GET | `/api/foods/{id}` | Get food by ID |
| POST | `/api/foods` | Create new food |
| PUT | `/api/foods/{id}` | Update food |
| DELETE | `/api/foods/{id}` | Delete food |

### Recipes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/recipes` | Get all recipes |
| GET | `/api/recipes/{id}` | Get recipe by ID |
| POST | `/api/recipes` | Create new recipe |
| PUT | `/api/recipes/{id}` | Update recipe |
| DELETE | `/api/recipes/{id}` | Delete recipe |

## Request/Response Examples

### Create Food
**Request:**
```json
POST /api/foods
{
  "name": "Chicken Breast",
  "brand": "Organic",
  "caloriesPer100g": 165,
  "proteinsPer100g": 31,
  "fatPer100g": 3.6,
  "carbsPer100g": 0
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "name": "Chicken Breast",
  "brand": "Organic",
  "caloriesPer100g": 165,
  "proteinsPer100g": 31,
  "fatPer100g": 3.6,
  "carbsPer100g": 0
}
```

### Create Recipe
**Request:**
```json
POST /api/recipes
{
  "name": "Grilled Chicken with Rice",
  "description": "Healthy meal",
  "finalCookedWeight": 500,
  "ingredients": [
    {
      "foodId": 1,
      "weightInGrams": 200
    },
    {
      "foodId": 2,
      "weightInGrams": 300
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "name": "Grilled Chicken with Rice",
  "description": "Healthy meal",
  "finalCookedWeight": 500,
  "totalCalories": 390,
  "totalProteins": 62,
  "totalFat": 3.6,
  "totalCarbs": 52,
  "caloriesPer100g": 78,
  "proteinsPer100g": 12.4,
  "fatPer100g": 0.72,
  "carbsPer100g": 10.4,
  "ingredients": [
    {
      "foodId": 1,
      "foodName": "Chicken Breast",
      "weightInGrams": 200
    },
    {
      "foodId": 2,
      "foodName": "Rice",
      "weightInGrams": 300
    }
  ]
}
```

## Data Flow

### Creating a Food
1. User fills form on Frontend
2. Frontend validates input
3. Frontend sends POST request via Axios
4. Backend receives request in FoodController
5. FoodService validates and processes data
6. FoodRepository saves to database
7. Backend returns created Food with ID
8. Frontend displays success message
9. Food list refreshes

### Creating a Recipe
1. User fills recipe form
2. User adds multiple ingredients
3. Frontend validates all fields
4. Frontend sends POST with ingredients array
5. Backend processes in RecipeService
6. Service calculates totals from ingredients
7. Service creates RecipeIngredient objects
8. All saved transactionally
9. Backend returns complete Recipe with calculations
10. Frontend displays success and refreshes

## Security Considerations

- ✅ CORS configured for localhost only
- ✅ Input validation on both frontend and backend
- ✅ SQL injection protection via JPA
- Future: Add authentication/authorization
- Future: HTTPS for production
- Future: Rate limiting

## Performance Optimization

- Frontend uses React hooks for state management
- Backend uses JPA lazy loading
- CORS caching enabled
- CSS uses modern features (Grid, Flexbox)
- Responsive images and minimal dependencies

## Deployment

### Development
```bash
# Backend
mvn spring-boot:run

# Frontend
cd frontend && npm start
```

### Production
```bash
# Backend
mvn clean install
java -jar target/nutrivision-0.0.1-SNAPSHOT.jar

# Frontend
cd frontend && npm run build
# Serve from dist/build folder with nginx/apache
```

## Error Handling

### Frontend
- Axios interceptors for global error handling
- Alert component for user feedback
- Form validation before submission
- Loading states during API calls

### Backend
- REST controller exception handling
- Custom error messages in DTOs
- HTTP status codes (201, 204, 400, 404, 500)
- Validation annotations (@NotNull, @NotBlank, etc.)

## Testing Strategy

- Unit tests for services
- Integration tests for controllers
- Frontend component testing with React Testing Library (future)
- E2E testing with Cypress (future)

## Future Enhancements

1. **Authentication**: JWT-based user authentication
2. **User Profiles**: User-specific foods and recipes
3. **Sharing**: Share recipes with other users
4. **Analytics**: Charts and nutrition tracking
5. **Mobile App**: React Native or Flutter version
6. **PWA**: Progressive web app features
7. **Offline Mode**: Service workers for offline access
8. **Meal Planning**: Weekly meal planning features
9. **Export**: PDF/CSV export functionality
10. **API Documentation**: Swagger/OpenAPI docs

---

For more details, see FRONTEND_SETUP.md and backend README.

