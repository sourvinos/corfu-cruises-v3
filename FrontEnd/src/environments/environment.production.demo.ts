// ng build --output-path="release" --configuration=production-demo

export const environment = {
    apiUrl: 'http://spacetravels-001-site1.btempurl.com/api',
    url: 'http://spacetravels-001-site1.btempurl.com',
    appName: 'Corfu Cruises',
    clientUrl: 'http://spacetravels-001-site1.btempurl.com',
    defaultLanguage: 'en-GB',
    defaultTheme: 'icy-white',
    menuTopIconDirectory: 'assets/images/menu-top/',
    menuDropdownIconDirectory: 'assets/images/menu-dropdown/',
    featuresIconDirectory: 'assets/images/features/',
    criteriaIconDirectory: 'assets/images/criteria/',
    stopOrdersIconDirectory: 'assets/images/stopOrders/',
    nationalitiesIconDirectory: 'assets/images/nationalities/',
    cssUserSelect: 'auto',
    minWidth: 1366,
    maxWidthA: 1280,
    maxWidthB: 1366,
    login: {
        username: '',
        email: '',
        password: '',
        noRobot: false
    },
    production: true
}
