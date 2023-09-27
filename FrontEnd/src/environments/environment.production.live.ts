// ng build --output-path="release" --configuration=production-live

export const environment = {
    apiUrl: 'https://appcorfucruises.com/api',
    url: 'https://appcorfucruises.com',
    appName: 'Corfu Cruises',
    clientUrl: 'https://appcorfucruises.com',
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
