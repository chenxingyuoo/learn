/*
 * @Description: 文件描述
 * @Date: 2024-01-16 09:59:04
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 * @FilePath: /my-electron-app/forge.config.js
 */
module.exports = {
  packagerConfig: {
    asar: true,
    "protocols": [
      {
        "name": "Electron Fiddle",
        "schemes": ["electron-fiddle"]
      }
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        "mimeType": ["x-scheme-handler/electron-fiddle"]
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
