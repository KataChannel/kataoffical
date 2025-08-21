# Rausach Full Stack Application

## 📁 Project Structure

```
rausachfullstack/
├── 🎯 CORE APPLICATION
│   ├── api/                    # Backend NestJS API
│   │   ├── src/               # Source code
│   │   ├── prisma/            # Database schema & migrations
│   │   ├── test/              # Unit & integration tests
│   │   └── dist/              # Compiled output
│   ├── frontend/              # Angular Frontend
│   │   ├── src/               # Source code
│   │   ├── public/            # Static assets
│   │   └── dist/              # Built application
│   ├── beshop/               # Backend shop module
│   └── feshop/               # Frontend shop module
│
├── 📋 CONFIGURATION & SCRIPTS
│   ├── scripts/              # Organized utility scripts
│   │   ├── deploy.sh         # Deployment script
│   │   ├── backup.sh         # Database backup
│   │   └── README.md         # Scripts documentation
│   ├── docker-compose.yml    # Docker configuration
│   ├── package.json          # Root dependencies & scripts
│   ├── run.sh               # Main application runner
│   └── .gitignore           # Git exclusions
│
├── 📚 DOCUMENTATION & DATA
│   ├── docs/                # Project documentation
│   ├── dulieu/              # Data files
│   ├── snippetcode/         # Code snippets
│   └── README.md            # This file
│
├── 🗄️ STORAGE & LOCAL
│   ├── notupload/           # Local files (gitignored)
│   ├── proxy                # Proxy configuration
│   └── storage.rausachtrangia.com/  # Storage directory
│
└── 📦 ARCHIVE (HISTORICAL)
    ├── documentation/       # Historical markdown docs
    ├── test-scripts/        # Old test files
    ├── fixes/              # Fix scripts & patches
    ├── html-demos/         # Demo files
    ├── api-temp/           # Archived API files
    └── frontend-temp/      # Archived frontend files
```

## 🚀 Quick Start

### Development
```bash
# Start the application
./run.sh

# Or manually start each service
cd api && npm run start:dev
cd frontend && ng serve
```

### Production
```bash
# Build and deploy
docker-compose up -d
```

## 📋 Main Components

### Backend (api/)
- **NestJS** API server
- **Prisma** ORM with PostgreSQL
- **GraphQL** universal service
- **JWT** authentication
- **Audit logging**

### Frontend (frontend/)
- **Angular** application
- **Angular Material** UI components
- **Signal-based** reactive state
- **Lazy loading** modules

### Key Features
- **Inventory Management** (Chotkho system)
- **Order Processing** (Donhang/Dathang workflow)
- **Warehouse Operations** (Phieukho management)
- **Real-time Dashboard**
- **Excel Import/Export**

## 🛠️ Recent Updates

- ✅ Complete 2-step chotkho workflow implementation
- ✅ Outstanding order processing automation
- ✅ Inventory adjustment with phieukho creation
- ✅ TonKho synchronization system
- ✅ Backend API enhancements
- ✅ Project structure cleanup and organization

## 📚 Documentation

Historical documentation and implementation notes can be found in `archive/documentation/`.

## 🧪 Testing

Test scripts and debugging tools are located in `archive/test-scripts/`.

---

*Last updated: August 2025*
