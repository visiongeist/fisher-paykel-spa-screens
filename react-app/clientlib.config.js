module.exports = {
    // default working directory (can be changed per 'cwd' in every asset option)
    context: __dirname,

    // path to the clientlib root folder (output)
    clientLibRoot: "./../ui.apps/src/main/content/jcr_root/apps/spa-screens/clientlibs",

    libs: [
        {
            name: "react-app",
            allowProxy: true,
            categories: ["spa-screens.react"],
            serializationFormat: "xml",
            jsProcessor: ["min:gcc"],
            dependencies:["spa-screens.grid"],
            assets: {
                js: [
                    "build/static/**/*.js",
                    "src/browser/DataModel.js"
                ],
                css: [
                    "build/static/**/*.css"
                ]
            }
        },
        {
            name: "ceddl-polyfill",
            allowProxy: true,
            categories: ["spa-screens.ceddl"],
            serializationFormat: "xml",
            jsProcessor: ["min:gcc"],
            assets: {
                js: [
                    "node_modules/@ceddl/ceddl-polyfill/dist/index.js"
                ],
                css: []
            }
        }
    ]
};