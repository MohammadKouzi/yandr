const WebpackObfuscator = require('webpack-obfuscator');

module.exports = function override(config, env) {
  if (env === 'production') {
    config.plugins.push(
      new WebpackObfuscator(
        {
          rotateStringArray: true,
          stringArray: true,
          stringArrayThreshold: 0.75
        },
        // يمكنك استبعاد ملفات معينة من التعتيم هنا
        ['excluded_bundle_name.js']
      )
    );
  }
  return config;
};
