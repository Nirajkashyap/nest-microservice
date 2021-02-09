const sonarqubeScanner =  require('sonarqube-scanner');
sonarqubeScanner(
    {
        serverUrl:  'http://localhost:9000',
        options : {
            
            'sonar.login':'admin', 
            'sonar.password': 'admin',
            'sonar.sources': 'src',
            'sonar.inclusions'  :  '**', // Entry point of your code
            // 'sonar.exclusions':'',
           
            'sonar.tests': 'src',
            'sonar.test.inclusions': 'src/**/*.spec.ts,src/**/*.test.ts',
            // 'sonar.test.exclusions': 'src/**/*.spec.js,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx',
            
            'sonar.javascript.lcov.reportPaths':  'coverage/lcov.info',
            'sonar.testExecutionReportPaths':  'coverage/test-reporter.xml',

            'sonar.cpd.exclusions':''
        }
    }, () => {});