// ng build --output-path="release" --configuration=production-demo

export const environment = {
    apiUrl: 'http://spacetravels-001-site1.btempurl.com/api',
    url: 'http://spacetravels-001-site1.btempurl.com',
    appName: 'Corfu Cruises',
    clientUrl: 'http://spacetravels-001-site1.btempurl.com',
    defaultLanguage: 'en-GB',
    defaultTheme: 'icy-white',
    featuresIconDirectory: 'assets/images/features/',
    stopOrdersIconDirectory: 'assets/images/stopOrders/',
    nationalitiesIconDirectory: 'assets/images/nationalities/',
    cssUserSelect: 'auto',
    minWidth: 1280,
    login: {
        username: '',
        email: '',
        password: '',
        noRobot: false
    },
    production: true
}
