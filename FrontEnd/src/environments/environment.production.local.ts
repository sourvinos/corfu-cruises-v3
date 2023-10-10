// ng build --output-path="release" --configuration=production-local

export const environment = {
    apiUrl: 'https://localhost:1701/api',
    url: 'https://localhost:1701',
    appName: 'Corfu Cruises',
    clientUrl: 'https://localhost:1701',
    defaultLanguage: 'en-GB',
    defaultTheme: 'icy-white',
    featuresIconDirectory: 'assets/images/features/',
    stopOrdersIconDirectory: 'assets/images/stopOrders/',
    nationalitiesIconDirectory: 'assets/images/nationalities/',
    cssUserSelect: 'none',
    minWidth: 1280,
    login: {
        username: 'john',
        email: 'johnsourvinos@hotmail.com',
        password: 'ec11fc8c16dx',
        noRobot: true
    },
    production: true
}
