# Sistema Administrativo - DeliveryApp

Este directorio contiene todos los componentes y páginas del sistema administrativo de la aplicación de delivery.

## Estructura

```
src/components/admin/
├── layout/                 # Componentes de layout administrativo
│   ├── AdminLayout.tsx    # Layout principal con sidebar y header
│   ├── AdminSidebar.tsx   # Barra lateral de navegación
│   └── AdminHeader.tsx    # Header administrativo
├── common/                # Componentes comunes
│   └── ProtectedRoute.tsx # Protección de rutas por permisos
└── index.ts              # Exportaciones principales

src/pages/admin/
├── AdminLogin.tsx         # Página de login administrativo
├── AdminDashboard.tsx     # Dashboard principal con estadísticas
├── RestaurantsManagement.tsx # Gestión de restaurantes
├── OrdersManagement.tsx   # Gestión de pedidos
├── UsersManagement.tsx    # Gestión de usuarios
└── ReportsPage.tsx        # Reportes y analytics

src/services/admin.ts      # Servicios API para administración
src/store/adminStore.ts    # Estado global administrativo
```

## Características Principales

### 🔐 Sistema de Autenticación
- Login seguro para administradores
- Gestión de tokens JWT con refresh automático
- Roles y permisos granulares
- Sesiones persistentes

### 🏢 Gestión de Restaurantes
- CRUD completo de restaurantes
- Activar/desactivar restaurantes
- Subida de imágenes (logo y portada)
- Filtros y búsqueda avanzada

### 📦 Gestión de Pedidos
- Visualización de todos los pedidos
- Cambio de estados en tiempo real
- Filtros por fecha, estado, restaurante
- Cancelación y reembolsos

### 👥 Gestión de Usuarios
- Lista completa de usuarios registrados
- Activar/desactivar cuentas
- Información de pedidos por usuario
- Filtros y búsqueda

### 📊 Dashboard y Reportes
- Estadísticas en tiempo real
- Gráficos de ventas y pedidos
- Restaurantes y platos más populares
- Exportación de reportes (CSV, Excel, PDF)

### 🛡️ Sistema de Permisos

#### Roles Disponibles
- **SUPER_ADMIN**: Acceso completo al sistema
- **ADMIN**: Gestión general sin configuración del sistema
- **MANAGER**: Gestión de restaurantes y pedidos
- **MODERATOR**: Solo visualización y moderación básica

#### Permisos Granulares
- `VIEW_RESTAURANTS`, `CREATE_RESTAURANTS`, `EDIT_RESTAURANTS`, `DELETE_RESTAURANTS`
- `VIEW_DISHES`, `CREATE_DISHES`, `EDIT_DISHES`, `DELETE_DISHES`
- `VIEW_ORDERS`, `MANAGE_ORDER_STATUS`, `CANCEL_ORDERS`, `REFUND_ORDERS`
- `VIEW_USERS`, `EDIT_USERS`, `DEACTIVATE_USERS`, `DELETE_USERS`
- `VIEW_ANALYTICS`, `EXPORT_REPORTS`
- `SYSTEM_SETTINGS`, `MANAGE_ADMINS`

## Uso

### Acceso al Panel Administrativo
1. Navegar a `/admin/login`
2. Iniciar sesión con credenciales de administrador
3. El sistema redirigirá al dashboard principal

### Protección de Rutas
```tsx
<ProtectedRoute requiredPermission={AdminPermission.VIEW_RESTAURANTS}>
  <RestaurantsManagement />
</ProtectedRoute>
```

### Uso del Store Administrativo
```tsx
import { useAdminStore } from '../store/adminStore';

const MyComponent = () => {
  const { admin, hasPermission, login, logout } = useAdminStore();
  
  if (hasPermission(AdminPermission.CREATE_RESTAURANTS)) {
    // Mostrar botón de crear restaurante
  }
};
```

### Servicios API
```tsx
import { adminRestaurants } from '../services/admin';

// Obtener restaurantes con filtros
const restaurants = await adminRestaurants.getAll({
  search: 'pizza',
  status: 'active'
}, 1, 20);

// Crear nuevo restaurante
const newRestaurant = await adminRestaurants.create(formData);
```

## Configuración

### Variables de Entorno
```env
REACT_APP_API_URL=http://localhost:8080/api
```

### Endpoints API
Todos los endpoints administrativos están prefijados con `/admin`:
- `POST /admin/auth/login` - Login administrativo
- `GET /admin/dashboard/stats` - Estadísticas del dashboard
- `GET /admin/restaurants` - Lista de restaurantes
- `GET /admin/orders` - Lista de pedidos
- etc.

## Seguridad

### Interceptores de Axios
- Renovación automática de tokens
- Redirección al login en caso de sesión expirada
- Manejo de errores de autorización

### Validación de Permisos
- Verificación en el frontend y backend
- Rutas protegidas por componente
- Ocultación de elementos según permisos

## Responsive Design
- Sidebar colapsable en desktop
- Navegación móvil con overlay
- Tablas con scroll horizontal
- Diseño adaptativo para todas las pantallas

## Performance Considerations

### Frontend Optimization
- Implement lazy loading for components that are not immediately visible
- Use React.memo() to prevent unnecessary re-renders of components
- Optimize API calls by batching or debouncing when possible
- Implement pagination for large datasets in tables

### Backend Optimization
- Ensure proper indexing on database columns used in queries
- Implement caching mechanisms for frequently accessed data
- Optimize slow queries with EXPLAIN and adjust as needed
- Consider implementing rate limiting for API endpoints

## Próximas Características
- [ ] Gestión completa de platos y categorías
- [ ] Sistema de notificaciones en tiempo real
- [ ] Chat de soporte integrado
- [ ] Configuración avanzada del sistema
- [ ] Logs de auditoría
- [ ] Backup y restauración de datos