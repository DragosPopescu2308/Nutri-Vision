# 🥗 NutriVision

A modern full-stack nutrition management application for tracking foods and recipes with complete nutritional analysis.

![Version](https://img.shields.io/badge/Version-1.0.1-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-success)

## 🎯 Overview

NutriVision is a comprehensive nutrition management system that allows you to:
- Maintain a database of foods with detailed nutritional information
- Create recipes from combinations of foods
- **Automatically calculate recipe final weight from ingredient weights** ✨ NEW
- Automatically calculate nutritional values for entire recipes
- View nutrition per 100g of recipe (displayed on recipe cards) ✨ IMPROVED
- Track and manage your nutrition database

## 🚀 Quick Start

### Windows
```bash
# Double-click this file:
start.bat

# Then choose option 1 to start both backend and frontend
```

### macOS/Linux
```bash
chmod +x start.sh
./start.sh

# Then choose option 1
```

### Manual Start

**Start Backend (Terminal 1):**
```bash
mvn spring-boot:run
# Runs on http://localhost:8080
```

**Start Frontend (Terminal 2):**
```bash
cd frontend
npm install  # First time only
npm start
# Opens http://localhost:3000
```

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **START_HERE.md** | Quick start guide (read this first!) |
| **HELP.md** | Complete getting started guide |
| **FRONTEND_SETUP.md** | Detailed frontend setup instructions |
| **ARCHITECTURE.md** | System design and API documentation |
| **QUICK_REFERENCE.md** | User guide and features |
| **IMPROVEMENTS_LOG.md** | Latest improvements (v1.0.1) |
| **frontend/README.md** | Frontend-specific documentation |

## 🏗️ Architecture

```
React Frontend (Port 3000)
        ↓ HTTP/REST
Spring Boot API (Port 8080)
        ↓ JDBC
MySQL Database
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **Axios** - HTTP client
- **CSS3** - Styling with modern features
- **Node.js** - Runtime

### Backend
- **Spring Boot 4.0.5** - Java web framework
- **Spring Data JPA** - Object-relational mapping
- **MySQL 8.0+** - Relational database
- **Maven** - Build tool
- **Java 21** - Programming language

## 📋 Features

### Food Management
- ✅ Create foods with calories, proteins, fats, carbs
- ✅ Browse all foods in database
- ✅ Edit food information
- ✅ Delete foods
- ✅ Search and filter

### Recipe Management
- ✅ Create recipes with multiple ingredients
- ✅ Add ingredient weights
- ✅ **Auto-calculate final weight from ingredient weights** ✨ NEW (v1.0.1)
- ✅ Automatic total nutrition calculation
- ✅ **Calculate and display nutrition per 100g** ✨ IMPROVED (v1.0.1)
- ✅ Edit recipes
- ✅ Delete recipes
- ✅ View all ingredients

### Dashboard
- ✅ Overview statistics
- ✅ Total foods count
- ✅ Total recipes count
- ✅ Average nutrition values
- ✅ Recent additions

### User Experience
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Form validation
- ✅ Error handling
- ✅ Success/error notifications
- ✅ Loading states
- ✅ Intuitive navigation
- ✅ Modern UI with animations

## 📡 API Endpoints

### Foods
```
GET    /api/foods              # All foods
GET    /api/foods/{id}         # Specific food
POST   /api/foods              # Create food
PUT    /api/foods/{id}         # Update food
DELETE /api/foods/{id}         # Delete food
```

### Recipes
```
GET    /api/recipes            # All recipes
GET    /api/recipes/{id}       # Specific recipe
POST   /api/recipes            # Create recipe
PUT    /api/recipes/{id}       # Update recipe
DELETE /api/recipes/{id}       # Delete recipe
```

## 🔧 Prerequisites

- **Java 21** - [Download](https://www.oracle.com/java/technologies/downloads/)
- **Node.js 16+** - [Download](https://nodejs.org)
- **MySQL 8.0+** - [Download](https://www.mysql.com/downloads/)
- **Maven 3.8+** - [Download](https://maven.apache.org/download.cgi)

## ⚙️ Configuration

### Database Setup
Edit `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/nutrivision
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

### API URL (Frontend)
Edit `frontend/.env`:
```properties
REACT_APP_API_URL=http://localhost:8080/api
```

## 📦 Project Structure

```
NutriVision/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/dragos/nutrivision/
│   │   │       ├── NutriVisionApplication.java
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       ├── entity/
│   │   │       ├── dto/
│   │   │       └── repository/
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── README.md
├── pom.xml
├── HELP.md
├── ARCHITECTURE.md
├── FRONTEND_SETUP.md
├── start.bat
└── start.sh
```

## 🚦 Getting Help

### Troubleshooting

**Backend won't start:**
- Verify MySQL is running
- Check database credentials
- Run `mvn clean install`

**Frontend won't connect:**
- Ensure backend is running on port 8080
- Check network tab in browser (F12)
- Verify CORS configuration

**Port already in use:**
- Change frontend port: `PORT=3001 npm start`
- Change backend port in `application.properties`

See **HELP.md** for detailed troubleshooting.

## 📊 Data Models

### Food
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

### Recipe
```json
{
  "id": 1,
  "name": "Grilled Chicken with Rice",
  "description": "Healthy dinner",
  "finalCookedWeight": 500,
  "totalCalories": 390,
  "totalProteins": 62,
  "totalFat": 3.6,
  "totalCarbs": 52,
  "caloriesPer100g": 78,
  "proteinsPer100g": 12.4,
  "fatPer100g": 0.72,
  "carbsPer100g": 10.4,
  "ingredients": [...]
}
```

## 🔐 Security

- ✅ CORS configured for localhost
- ✅ Input validation on frontend and backend
- ✅ SQL injection protection via JPA
- 🔜 User authentication (planned)
- 🔜 HTTPS for production (planned)

## 🌟 Key Features

### Smart Calculations
- Recipes automatically calculate total nutrition
- Per 100g values calculated from total weight
- Ingredient weights considered in calculations

### User-Friendly Interface
- Intuitive navigation
- Real-time form validation
- Responsive design
- Smooth animations
- Visual feedback

### Data Management
- Full CRUD operations
- Confirmation dialogs for deletions
- Success/error notifications
- Loading states
- Empty states

## 📈 Future Enhancements

- [ ] User authentication & profiles
- [ ] Meal planning
- [ ] Nutrition analytics with charts
- [ ] Recipe sharing
- [ ] Export to CSV/PDF
- [ ] Mobile app
- [ ] PWA features
- [ ] Offline mode
- [ ] Social features
- [ ] Barcode scanning

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Development

### Running Tests
```bash
# Backend
mvn test

# Frontend
cd frontend && npm test
```

### Building for Production
```bash
# Backend
mvn clean install
java -jar target/nutrivision-0.0.1-SNAPSHOT.jar

# Frontend
cd frontend && npm run build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📞 Support

For issues and questions:
1. Check HELP.md for common solutions
2. Review ARCHITECTURE.md for system design
3. Check browser console (F12) for errors
4. Review backend logs for server errors

## 🎓 Learning Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [REST API Best Practices](https://restfulapi.net/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

## 📅 Version History

- **1.0.0** (April 19, 2026) - Initial release with complete CRUD functionality

---

**Made with ❤️ for nutrition tracking**

Happy coding! 🚀




