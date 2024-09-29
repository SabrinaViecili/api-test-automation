const { MergeReporter } = require("mocha-multi-reporters");

const options = {
    reporterEnabled: "spec, mocha-junit-reporter",
    mochaJunitReporterOptions: {
        mochaFile: "reports/junit-results.xml",
        toConsole: true,
    },
};

module.exports = (on) => {
    on('before:run', () => {
        // Implementar o MergeReporter aqui
        new MergeReporter(options);
    });
};
