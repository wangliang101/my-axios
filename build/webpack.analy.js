const prodConfig = require('./webpack.base.js');
const { merge } = require('webpack-merge');

// This plugin measures your webpack build speed,
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
// Visualize size of webpack output files with an interactive zoomable treemap.
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = smp.wrap(merge(prodConfig, { plugins: [new BundleAnalyzerPlugin()] }));
