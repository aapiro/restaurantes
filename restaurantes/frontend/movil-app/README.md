


# Food Delivery Mobile App (Flutter)

## Overview

This is the mobile application for the Food Delivery platform, built using Flutter. The app provides users with a convenient way to browse restaurants, view menus, place orders, and track deliveries.

## Project Structure

```
movil-app/
├── lib/
│   ├── main.dart                # Main entry point of the application
│   ├── screens/                # Screen components
│   │   └── home_screen.dart     # Home screen implementation
│   ├── models/                 # Data models
│   │   └── order.dart           # Order model definition
│   ├── services/               # API and business logic services
│   │   └── api_service.dart     # Service for API calls
│   └── widgets/                # Reusable UI components
│       └── custom_button.dart  # Custom button widget
├── pubspec.yaml                # Flutter project configuration
```

## Getting Started

### Prerequisites

- Flutter SDK installed (https://flutter.dev/docs/get-started/install)
- Android Studio or Xcode for mobile development
- A physical device or emulator configured for testing

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aapiro/restaurantes.git
   cd restaurantes/movil-app
   ```

2. Install dependencies:
   ```bash
   flutter pub get
   ```

3. Run the application:
   ```bash
   flutter run
   ```

## Development

### Adding New Screens

Create new Dart files in the `lib/screens/` directory and add them to the navigation flow in `main.dart`.

### API Integration

The `ApiService` class in `lib/services/api_service.dart` handles all network requests. Update the `baseUrl` with your backend API endpoint.

### UI Components

Reusable widgets should be placed in the `lib/widgets/` directory. This helps maintain consistency across the app.

## Testing

Run tests using:
```bash
flutter test
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes and commit them (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

