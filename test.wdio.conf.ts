exports.config = {
    runner: 'local',
    path: '/wd/hub',
    specs: [
        './test/specs/**/*.ts'  // Path to your test specs
    ],
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        browserName: 'Chrome',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': "0a7922ac7d76" || 'Redmi 12',  // Ensure correct device name
        'appium:platformVersion': '14.0',  // Ensure this matches the device version
        // 'appium:udid': '2119264710AA0DNM',  // Your device UDID
        'appium:noReset': false,
        'appium:chromedriverExecutable': '/opt/homebrew/bin/chromedriver',  // Ensure the ChromeDriver path is correct
        'appium:uiautomator2ServerLaunchTimeout': 240000,
        'appium:adbExecTimeout': 240000,
        'appium:androidInstallTimeout': 300000,
        'appium:disableWindowAnimation': true,
        'appium:autoGrantPermissions': true,
        'appium:systemPort': 8200,
        'appium:mjpegServerPort': 7810,
        'appium:clearDeviceLogsOnStart': true,
        'appium:skipDeviceInitialization': false,
        'appium:skipServerInstallation': false,
        'webSocketUrl': true,
        'unhandledPromptBehavior': 'ignore',
    }],

    // Test runner configurations
    logLevel: 'info',  // Set the log level (debug, info, warn, error)
    bail: 0,  // Whether to stop running tests after the first failure
    baseUrl: 'http://google.com',  // The Appium server URL
    waitforTimeout: 10000,  // Wait time before throwing a timeout error
    connectionRetryTimeout: 90000,  // Timeout for retrying the connection
    connectionRetryCount: 3,  // How many times to retry
    services: ['appium'],
    port: 4724,
    // Appium configurations
    // appium: {
    //     command: 'appium',
    //     args: {
    //         // Additional appium arguments can go here if necessary
    //     }
    // },

    // Reporters configuration
    reporters: ['dot', 'spec'],
    reporterOptions: {
        spec: {
            outputDir: './reports/specs'
        }
    },

    // Hooks for before/after events
    before: function (capabilities, specs) {
        // Add any necessary before test initialization here
    },

    after: function (result, capabilities, specs) {
        // Add any necessary after test clean-up here
    }
};
