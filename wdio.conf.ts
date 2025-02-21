export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',

    specs: [
        './test/specs/**/*.ts'
    ],
    exclude: [],

    maxInstances: 1,

    // Kobiton server configuration
    protocol: 'https',
    hostname: 'api.kobiton.com', // Use Kobiton's hostname
    port: 443, // Set port to 443 for HTTPS
    user: 'alphabin',
    key: '576df69c-a63c-438d-a373-4545cd729093',

    capabilities: [{
        // Platform capabilities
        platformName: 'Android', // or 'iOS' based on your needs
        'appium:platformVersion': '13', // Set platform version
        'appium:browserName': 'chrome', // Set browser name
        
        // Kobiton specific capabilities
        'kobiton:sessionName': 'Automation test session',
        'kobiton:sessionDescription': '',
        'kobiton:deviceOrientation': 'portrait',
        'kobiton:captureScreenshots': true,
        'kobiton:useConfiguration': 'kobitoncompayloadcapturetest',
        'appium:deviceGroup': 'ORGANIZATION',
        'appium:udid': 'RFCW32AK7QR', // Specify UDID of the device
        'appium:noReset': false,
        'appium:fullReset': true,
        'appium:autoWebview': true,
        'kobiton:retainDurationInSeconds': 0,
    }],

    // WebdriverIO configurations
    logLevel: 'info',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: ['appium'],

    framework: 'mocha',
    reporters: ['spec', 'junit', ['allure', { outputDir: 'allure-results' }]],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    }
};