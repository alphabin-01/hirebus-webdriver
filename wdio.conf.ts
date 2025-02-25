// wdio.config.ts
import { JSONReporter, HTMLReportGenerator } from 'wdio-json-html-reporter';
import dotenv from 'dotenv';
dotenv.config();

// Convert the environment variables to booleans
const useKobiton = process.env.KOBITON === 'true';
const useBrowserStack = process.env.USE_BROWSERSTACK === 'true';

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    specs: ['./test/specs/**/*.ts'],
    exclude: [],
    maxInstances: useKobiton ? 1 : (useBrowserStack ? 10 : 10),
    logLevel: 'info',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: useBrowserStack
        ? [['browserstack', {
            browserstackLocal: true,
            buildIdentifier: process.env.BUILD_NUMBER || 'local_build',
        }]]
        : ['appium'],
    framework: 'mocha',
    reporters: [
        // [JSONReporter, { outputFile: './reports/test-results.json', screenshotOption: 'OnFailure' }],  // Options: "No", "OnFailure", "Full"
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    capabilities: [],
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },
    // onComplete: async function () {
    //     const outputFilePath = './reports/test-report.html';
    //     const jsonFolder = './reports'; // Directory where JSON reports are saved

    //     const reportGenerator = new HTMLReportGenerator(outputFilePath);
    //     await reportGenerator.convertJSONFolderToHTML(jsonFolder);
    // }
};

// Check the environment to merge the correct configuration
if (useKobiton) {
    // Kobiton configuration settings
    Object.assign(config, {
        protocol: 'https',
        hostname: 'api.kobiton.com', // Use Kobiton's hostname
        port: 443, // Set port to 443 for HTTPS
        user: process.env.KOBITON_USERNAME || 'alphabin',
        key: process.env.KOBITON_API_KEY || '576df69c-a63c-438d-a373-4545cd729093',
        capabilities: [{
            platformName: 'Android',
            'appium:platformVersion': '13',
            'appium:browserName': 'chrome',
            'kobiton:sessionName': process.env.SESSION_NAME || 'Automation test session',
            'kobiton:sessionDescription': '',
            'kobiton:deviceOrientation': 'portrait',
            'kobiton:captureScreenshots': true,
            'kobiton:useConfiguration': 'kobitoncompayloadcapturetest',
            'appium:deviceGroup': 'ORGANIZATION',
            'appium:udid': process.env.KOBITON_REAL_DEVICE_ID || 'RFCW32AK7QR', // Specify the device UDID for Kobiton
            'appium:noReset': false,
            'appium:fullReset': true,
            'appium:autoWebview': true,
            'kobiton:retainDurationInSeconds': 0,
        
        }]
    });
} else if (useBrowserStack) {
    // BrowserStack configuration
    Object.assign(config, {
        user: process.env.BROWSERSTACK_USERNAME || 'savanalphabin_6gSdPc',
        key: process.env.BROWSERSTACK_ACCESS_KEY || 'wZtqUDykbsc1D7tSeZxy',
        hostname: 'hub.browserstack.com',
        capabilities: [
            {
                'bstack:options': {
                    deviceName: 'Samsung Galaxy S22 Plus',
                    platformVersion: '12.0',
                    platformName: 'android',
                    projectName: "BrowserStack Samples",
                    buildName: process.env.BUILD_NUMBER || 'browserstack build',
                    sessionName: 'BStack parallel webdriverio-appium',
                    debug: true,
                    networkLogs: true
                }
            },
            {
                'bstack:options': {
                    deviceName: 'Samsung Galaxy S23 Ultra',
                    platformVersion: '13.0',
                    platformName: 'android',
                    projectName: "BrowserStack Samples",
                    buildName: process.env.BUILD_NUMBER || 'browserstack build',
                    sessionName: 'BStack parallel webdriverio-appium',
                    debug: true,
                    networkLogs: true
                }
            },
            {
                'bstack:options': {
                    deviceName: 'Samsung Galaxy S22',
                    platformVersion: '12.0',
                    platformName: 'android',
                    projectName: "BrowserStack Samples",
                    buildName: process.env.BUILD_NUMBER || 'browserstack build',
                    sessionName: 'BStack parallel webdriverio-appium',
                    debug: true,
                    networkLogs: true
                }
            }
        ]
    });
} else {
    // Local real device configuration settings
    Object.assign(config, {
        port: 4723,
        capabilities: [{
            platformName: 'Android',
            browserName: 'Chrome',
            'appium:automationName': 'UiAutomator2',
            'appium:deviceName': "realme C21Y" ||process.env.DEVICE_NAME || 'Redmi 12',
            'appium:platformVersion': '11',
            'appium:udid': "0a7922ac7d76" || process.env.REAL_DEVICE_ID || '2119264710AA0DNM',
            'appium:noReset': false,
            'appium:chromedriverExecutable': '/opt/homebrew/bin/chromedriver',
            'appium:uiautomator2ServerLaunch÷Timeout': 240000,
            // 'appium:adbExecTimeout': 240000,
            // 'appium:androidInstallTimeout': 300000,
            // 'appium:disableWindowAnimation': true,
            'appium:autoGrantPermissions': true,
            // 'appium:systemPort': 8200,
            // 'appium:mjpegServerPort': 7810,
            // 'appium:clearDeviceLogsOnStart': true,
            // 'appium:skipDeviceInitialization': false,
            // 'appium:skipServerInstallation': false,
            // webSocketUrl: true,
            // unhandledPromptBehavior: 'ignore',
        }]
    });
}

export default config;