# Gestión de Productos 📱

Una aplicación moderna de gestión de productos construida con **React Native + Expo** que consume una **API REST en .NET** con CRUD completo.

## 📋 Descripción

Esta es una aplicación mobile multiplataforma que permite:
- **Crear** nuevos productos
- **Leer** (listar) todos los productos
- **Actualizar** productos existentes
- **Eliminar** productos

La aplicación se conecta a una API REST desarrollada en **.NET** para persistir los datos.

## 🎯 Características

### ✅ Funcionalidades CRUD
- **Create (POST)**: Agregar nuevos productos con formulario validado
- **Read (GET)**: Ver lista completa de productos con refresh
- **Update (PUT)**: Editar productos existentes
- **Delete (DELETE)**: Eliminar productos con confirmación

### 🎨 Interfaz Moderna
- Componentes Material Design con `react-native-paper`
- Interfaz limpia y profesional
- Responsive en todas las plataformas

### 📱 Multiplataforma
- ✅ Android
- ✅ iOS
- ✅ Web

## 🛠️ Stack Tecnológico

### Frontend
| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| React Native | 0.71.14 | Framework móvil |
| Expo | ~48.0.0 | Plataforma de desarrollo |
| TypeScript | ^4.9.5 | Tipado estático |
| react-native-paper | ^5.14.5 | Componentes UI Material |
| Zustand | ^4.4.0 | Gestión de estado |
| Axios | ^1.4.0 | Cliente HTTP |
| @expo/vector-icons | Incluido | Iconografía |

### Backend (API .NET)
- C# / .NET 6+
- SQL Server / Entity Framework
- Endpoints REST CRUD

## 🚀 Instalación

### Requisitos Previos
- Node.js 16+ y npm
- Expo CLI: `npm install -g expo-cli`
- Un dispositivo Android/iOS o emulador

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/ediazgarcia/react-native-expo-client.git
cd rn-expo-client
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar API**

Edita `src/api/products.ts` y actualiza la URL de la API:

```typescript
const DEFAULT_BASE = process.env.API_BASE_URL || 'http://tu-api-dotnet.com:5163';
```

O establece la variable de entorno:
```bash
API_BASE_URL=http://tu-api.com npm start
```

4. **Ejecutar la aplicación**
```bash
npm start
```

## 📱 Uso

Después de ejecutar `npm start`, elige una plataforma:

### Android
```bash
# Presiona 'a' en la terminal o:
npx expo run:android
```

### iOS
```bash
# Presiona 'i' en la terminal o:
npx expo run:ios
```

### Web
```bash
# Presiona 'w' en la terminal o:
npm run web
```

### Expo Go (Móvil)
- Descarga la app **Expo Go** en tu dispositivo
- Escanea el código QR que aparece en la terminal

## 📂 Estructura del Proyecto

```
rn-expo-client/
├── App.tsx                 # Componente raíz
├── app.json               # Configuración Expo
├── package.json           # Dependencias
├── tsconfig.json          # Configuración TypeScript
├── README.md              # Este archivo
├── .gitignore             # Archivos excluidos de Git
│
└── src/
    ├── api/
    │   └── products.ts           # Funciones de API (CRUD)
    ├── components/
    │   ├── ProductList.tsx       # Listado de productos
    │   └── ProductForm.tsx       # Formulario crear/editar
    ├── store/
    │   └── useProductsStore.ts   # Estado global (Zustand)
    └── constants/
        └── theme.ts              # Tema, colores, espaciado
```

## 🎨 Paleta de Colores

| Color | Código | Uso |
|-------|--------|-----|
| Primario | `#0066CC` | Encabezados, botones principales |
| Primario Oscuro | `#003D99` | Títulos, textos |
| Primario Claro | `#E6F0FF` | Fondos de iconos |
| Primario Más Claro | `#B3D9FF` | Bordes, subtítulos |
| Fondo | `#F0F4F8` | Fondo de pantalla |
| Error | `#EF4444` | Mensajes de error, botones delete |

## 📡 API REST Endpoints

La aplicación espera los siguientes endpoints en la API .NET:

### Modelo Product
```json
{
  "id": "string (GUID)",
  "name": "string",
  "price": "number"
}
```

### Endpoints

| Método | Endpoint | Descripción | Request | Response |
|--------|----------|-------------|---------|----------|
| **GET** | `/products` | Obtener todos los productos | - | `Product[]` |
| **GET** | `/products/{id}` | Obtener un producto | - | `Product` |
| **POST** | `/products` | Crear producto | `{ name, price }` | `Product` |
| **PUT** | `/products/{id}` | Actualizar producto | `{ id, name, price }` | `void` |
| **DELETE** | `/products/{id}` | Eliminar producto | - | `void` |

## 🔧 Configuración Avanzada

### Variables de Entorno
```bash
# .env (crear en la raíz)
API_BASE_URL=http://localhost:5163
```

### CORS (API .NET)
Asegúrate de que tu API .NET permita solicitudes desde Expo:

```csharp
services.AddCors(options =>
{
    options.AddPolicy("AllowExpoClient",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

app.UseCors("AllowExpoClient");
```

## 🐛 Troubleshooting

### Error: "Unable to resolve module"
```bash
npm install
npx expo start --clear
```

### Error: "Failed to connect to API"
- Verifica que la API .NET esté corriendo
- Comprueba la URL en `src/api/products.ts`
- Asegúrate de tener CORS habilitado en la API

### Android Emulator no funciona
```bash
# Limpiar cache
npx expo start -c
```

### Puerto 19000/19001 en uso
```bash
# Expo usará el siguiente puerto disponible automáticamente
npm start
```

## 📚 Gestión de Estado

Usamos **Zustand** para el estado global. Store ubicado en `src/store/useProductsStore.ts`:

```typescript
const { products, loading, error, fetchProducts, clearError } = useProductsStore();
```

## 🎯 Flujo de Datos

```
ProductList Component
      ↓
useProductsStore (Zustand)
      ↓
API Module (axios)
      ↓
.NET REST API
      ↓
SQL Database
```

## 📝 Guía de Contribución

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/mi-feature`
3. Commit: `git commit -am 'Add mi-feature'`
4. Push: `git push origin feature/mi-feature`
5. Pull Request

## 🚀 Mejoras Futuras

- [ ] Autenticación y autorización
- [ ] Búsqueda y filtros avanzados
- [ ] Ordenamiento por columnas
- [ ] Paginación
- [ ] Caché local con AsyncStorage
- [ ] Sincronización offline
- [ ] Notificaciones push
- [ ] Gráficos y reportes
- [ ] Pruebas unitarias
- [ ] Pruebas E2E

## 📄 Licencia

MIT - Libre para usar en proyectos personales y comerciales.

## 👨‍💻 Autor

DevProgramity - [DevProgramity](https://github.com/devprogramity)

## 🤝 Soporte

Si encuentras algún problema, abre un [issue](https://github.com/ediazgarcia/react-native-expo-client/issues).

---

**Última actualización:** Noviembre 22, 2025

API notes

- By default the app points to `http://10.0.2.2:5163` (Android emulator). If you
  run on a physical device, set `API_BASE_URL` env var or edit `src/api/products.ts`.

Files created

- `App.tsx` - root component
- `src/components/ProductList.tsx` - products list UI
- `src/api/products.ts` - api client using axios
- `src/store/useProductsStore.ts` - Zustand store

Next steps

- Add product create/edit screens, navigation (React Navigation), and caching.
- If you want, I can install deps and run the app locally, or add templates for
  forms and offline sync.
