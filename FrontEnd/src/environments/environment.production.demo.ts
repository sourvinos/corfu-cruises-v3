// ng build --output-path="release" --configuration=production-demo

export const environment = {
    apiUrl: 'http://corfucruisesdemo-001-site1.atempurl.com/api',
    url: 'https://corfucruisesdemo-001-site1.atempurl.com',
    appName: 'Corfu Cruises',
    clientUrl: 'https://corfucruisesdemo-001-site1.atempurl.com',
    defaultLanguage: 'en-GB',
    featuresIconDirectory: 'assets/images/features/',
    nationalitiesIconDirectory: 'assets/images/nationalities/',
    portStopOrdersDirectory: 'assets/images/port-stop-orders/',
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
