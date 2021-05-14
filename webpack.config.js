const path = require('path');

module.exports = {
    mode: 'production',
    watch: true,
    entry: {
        index: './src/plugin.ts',
        shell: './src/shell.ts',
        options: './src/panel/options.ts',
        preview: './src/panel/preview.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    plugins: [
    ],
    target: "node",
    externals: [
        "miniprogram-ci"
    ]
};
