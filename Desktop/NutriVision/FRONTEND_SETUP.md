# 🥗 NutriVision - Frontend Setup & Running Guide

Congratulations! Ți-am creat un frontend complet pentru aplicația NutriVision. Iată cum să îl folosești:

## 📋 Ce include frontend-ul

✅ **3 pagini principale:**
- **Dashboard**: Statistici și overview al aplicației
- **Foods**: Gestionare alimente cu informații nutriționale (CRUD)
- **Recipes**: Gestionare rețete cu ingrediente (CRUD)

✅ **Funcționalități:**
- Creare, citire, actualizare și ștergere alimente
- Creare, citire, actualizare și ștergere rețete
- Adăugare ingrediente la rețete
- Calcul automat al nutrienților per rețetă
- Design modern cu animații
- Responsive design (funcționează pe mobile, tablet, desktop)
- Notificări de eroare și succes
- Validare form

## 🚀 Cum să pornești aplicația

### Pasul 1: Backend
Asigură-te că backend-ul Spring Boot rulează pe porta 8080:
```bash
mvn spring-boot:run
```
Sau dacă ai deja rulând MySQL și wantezi să compilezi mai întâi:
```bash
mvn clean install
mvn spring-boot:run
```

### Pasul 2: Frontend
Deschide o nouă fereastră/tab de terminal și:

1. Navighează la directorul frontend:
```bash
cd frontend
```

2. Instalează dependințele (fă asta doar prima dată):
```bash
npm install
```

3. Pornește development server-ul:
```bash
npm start
```

Aplicația se va deschide automat la `http://localhost:3000`

## 📁 Structura proiectului frontend

```
frontend/
├── public/
│   └── index.html                 # HTML principal
├── src/
│   ├── api/
│   │   └── api.js                 # Configurare Axios și endpoints
│   ├── components/
│   │   ├── Alert.js               # Component notificări
│   │   └── NutritionBadge.js       # Component badge nutrienți
│   ├── pages/
│   │   ├── Dashboard.js            # Pagina cu statistici
│   │   ├── FoodPage.js             # Pagina gestionare alimente
│   │   └── RecipePage.js           # Pagina gestionare rețete
│   ├── App.js                      # Component principal
│   ├── App.css                     # Stiluri globale
│   └── index.js                    # Entry point
├── package.json                    # Dependencies
├── .env                            # Variabile de mediu
└── README.md                       # Documentație
```

## 🎨 Design Features

- **Culori**: Gradient violet/indigo (667eea → 764ba2)
- **Responsive**: Se adaptează la orice dimensiune de ecran
- **Animații smooth**: Hover effects, transitions
- **Accessibility**: Butoane mari, contrast bun

## 🔧 Troubleshooting

### Frontend nu se conectează la backend
- Verifică că backend-ul rulează pe `http://localhost:8080`
- Verifică că CORS este configurat corect (am adăugat deja configurația)
- Verifică consola browser-ului (F12) pentru erori

### npm install nu merge
- Asigură-te că Node.js și npm sunt instalate: `node -v` și `npm -v`
- Șterge `node_modules` și `package-lock.json`, apoi reîncearcă

### Port 3000 este deja folosit
- Poți specifica alt port: `PORT=3001 npm start`

## 📱 Features pe fiecare pagină

### Dashboard
- Total alimente în bază de date
- Total rețete create
- Calorii medii pe 100g
- Proteine medii pe 100g
- Ultimele 3 alimente adăugate
- Ultimele 3 rețete create

### Foods Page
- Listă card pentru fiecare aliment
- Informații: Calorii, Proteine, Grăsimi, Carbohidrați
- Butoane Edit/Delete
- Form pentru adăugare/editare alimente
- Validări

### Recipes Page
- Listă card pentru fiecare rețetă
- Informații complete: calorii totale, per 100g, proteine, grăsimi, carbohidrați
- Lista ingrediente
- Greutate finală gătit
- Form pentru creare rețete cu ingrediente dinamice
- Validări

## 🔐 CORS Configuration

Am configurat deja backend-ul cu CORS pentru a permite cererile din frontend:
- Origins permise: `http://localhost:3000` și `http://127.0.0.1:3000`
- Methods: GET, POST, PUT, DELETE, OPTIONS
- Vei putea să adaugi și alte origins dacă vrei să deploy-ezi

## 💡 Tips

1. **Debugging**: Deschide DevTools cu F12 pentru a vedea Network tab și Console
2. **API Testing**: Poți testa endpoints și cu Postman dacă vrei
3. **Styling**: Toate stilurile sunt în `App.css`, poți să le personalizezi
4. **Componente**: Poți refolosi Alert și NutritionBadge în alte pagini

## 📝 Următorii pași (Optional)

- Adăugare autentificare/login
- Salvare preferințe în localStorage
- Exportare date în CSV/PDF
- Grafice nutriționale cu Chart.js
- PWA (Progressive Web App) features

---

**Succes! Acum ai un frontend profesional pentru NutriVision! 🚀**

Dacă întâmpini probleme, verifică:
1. Backend-ul rulează pe localhost:8080
2. npm install a fost rulat cu succes
3. Nu sunt erori în console (F12)
4. Porturile 8080 și 3000 sunt disponibile

