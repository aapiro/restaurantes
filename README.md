# 🚚 DeliveryApp Frontend

Plataforma de delivery multi-restaurantes desarrollada con React, TypeScript y Tailwind CSS.

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 16+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <tu-repo>
cd delivery-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar en desarrollo
npm start
```

## 🛠️ Stack Tecnológico

### Core
- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **React Router** - Routing de la aplicación

### Estado y Data Fetching
- **Zustand** - Manejo de estado global
- **React Query** - Cache y sincronización de datos del servidor
- **Axios** - Cliente HTTP

### UI y Formularios
- **Lucide React** - Iconos
- **React Hook Form** - Manejo de formularios
- **Yup** - Validación de esquemas
- **clsx** - Utilidad para clases CSS

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── ui/              # Componentes UI básicos (Button, Input, Card)
│   ├── layout/          # Componentes de layout (Header, Footer)
│   └── common/          # Componentes comunes específicos del dominio
├── pages/               # Páginas/Rutas principales
├── hooks/               # Custom hooks
├── services/            # Servicios API y configuración
├── store/               # Stores de Zustand
├── types/               # Definiciones TypeScript
├── constants/           # Constantes de la aplicación
├── utils/               # Funciones utilitarias
└── assets/              # Recursos estáticos
```

## 🎯 Funcionalidades Principales

### ✅ Implementadas
- [x] Catálogo de restaurantes con filtros
- [x] Detalle de restaurante y menú
- [x] Sistema de carrito de compras
- [x] Navegación entre páginas
- [x] Sistema de notificaciones
- [x] Diseño responsive
- [x] Manejo de estado global

### 🔄 En Desarrollo
- [ ] Autenticación de usuarios
- [ ] Proceso de checkout
- [ ] Gestión de pedidos
- [ ] Integración con backend
- [ ] Sistema de pagos

### 🚀 Futuras
- [ ] Tracking en tiempo real
- [ ] Push notifications
- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] Sistema de reviews

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm start                 # Ejecutar en modo desarrollo

# Build
npm run build            # Crear build de producción
npm run build:analyze    # Analizar bundle size

# Testing
npm test                 # Ejecutar tests
npm run test:coverage    # Coverage de tests

# Linting
npm run lint             # Verificar código
npm run lint:fix         # Corregir automáticamente

# Tipo checking
npm run type-check       # Verificar tipos TypeScript
```

## 🎨 Convenciones de Código

### Nomenclatura
- **Componentes**: PascalCase (`RestaurantCard.tsx`)
- **Archivos**: camelCase (`userService.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`API_ENDPOINTS`)
- **Variables/Funciones**: camelCase (`getUserData`)

### Estructura de Componentes
```tsx
// Imports externos
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// Imports internos
import { Button } from '../ui';
import { useAuth } from '../../hooks';
import { User } from '../../types';

// Tipos/Interfaces
interface ComponentProps {
  user: User;
  onAction: () => void;
}

// Componente
const Component: React.FC<ComponentProps> = ({ user, onAction }) => {
  // Estado local
  const [loading, setLoading] = useState(false);
  
  // Hooks personalizados
  const { isAuthenticated } = useAuth();
  
  // Efectos
  useEffect(() => {
    // lógica de efecto
  }, []);
  
  // Handlers
  const handleClick = () => {
    // lógica del handler
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default Component;
```

## 🌍 Variables de Entorno

Ver `.env.example` para todas las variables necesarias.

### Principales
- `REACT_APP_API_URL` - URL del backend
- `REACT_APP_STRIPE_PUBLISHABLE_KEY` - Key de Stripe para pagos
- `REACT_APP_GOOGLE_MAPS_API_KEY` - Key de Google Maps

## 🚀 Deployment

### Build de Producción
```bash
npm run build
```

### Docker
```bash
# Build imagen
docker build -t delivery-frontend .

# Ejecutar container
docker run -p 3000:3000 delivery-frontend
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Notas de Desarrollo

### Próximos pasos inmediatos:
1. Implementar carrito lateral funcional
2. Crear páginas de autenticación
3. Conectar con backend Quarkus
4. Implementar sistema de pagos

### Consideraciones técnicas:
- El proyecto está preparado para escalar con más desarrolladores
- La arquitectura soporta tanto REST como GraphQL
- Zustand permite manejar estado complejo sin Redux
- React Query optimiza las llamadas al backend

## 📄 Licencia

Este proyecto es privado y pertenece a [Tu Startup].

---

**Desarrollado con ❤️ para revolucionar el delivery en España**