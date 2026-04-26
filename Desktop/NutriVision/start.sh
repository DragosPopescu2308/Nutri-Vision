#!/bin/bash
# NutriVision - Quick Start Script

echo "🥗 NutriVision - Application Launcher"
echo "===================================="
echo ""
echo "Alege o opțiune:"
echo "1) Pornește ambele (Backend + Frontend)"
echo "2) Pornește doar Backend"
echo "3) Pornește doar Frontend"
echo "4) Instalează dependințe Frontend"
echo ""

read -p "Introdu opțiunea (1-4): " choice

case $choice in
    1)
        echo "Pornind Backend și Frontend..."
        # Terminal 1: Backend
        gnome-terminal -- bash -c "cd . && mvn spring-boot:run; exec bash"
        sleep 3
        # Terminal 2: Frontend
        gnome-terminal -- bash -c "cd frontend && npm start; exec bash"
        ;;
    2)
        echo "Pornind Backend..."
        mvn spring-boot:run
        ;;
    3)
        echo "Pornind Frontend..."
        cd frontend
        npm start
        ;;
    4)
        echo "Instalând dependințe Frontend..."
        cd frontend
        npm install
        echo "✅ Instalare completă!"
        ;;
    *)
        echo "Opțiune invalidă!"
        exit 1
        ;;
esac

