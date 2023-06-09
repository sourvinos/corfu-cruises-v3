// ng build

export const environment = {
    apiUrl: 'https://localhost:5001/api',
    url: 'https://localhost:5001',
    appName: 'Corfu Cruises',
    clientUrl: 'https://localhost:4200',
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
    cssUserSelect: 'none',
    minWidth: 1280,
    login: {
        username: 'john',
        email: 'johnsourvinos@hotmail.com',
        password: 'ec11fc8c16db',
        noRobot: true
    },
    production: false
}
