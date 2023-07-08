// ng build --output-path="release" --configuration=production-live

export const environment = {
    apiUrl: 'https://appcorfucruises.com/api',
    url: 'https://appcorfucruises.com',
    appName: 'Corfu Cruises',
    clientUrl: 'https://appcorfucruises.com',
    defaultLanguage: 'en-GB',
    defaultTheme: 'icy-white',
    emailFooter: {
        lineA: 'Problems or questions? Call us at +30 26620 61400',
        lineB: 'or email at info@corfucruises.com',
        lineC: '© Corfu Cruises 2023, Corfu - Greece'
    },
    menuTopIconDirectory: 'assets/images/menu-top/',
    menuDropdownIconDirectory: 'assets/images/menu-dropdown/',
    featuresIconDirectory: 'assets/images/features/',
    criteriaIconDirectory: 'assets/images/criteria/',
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
