module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true
  },
  purge: {
    layers: ['utilities'],
    content: [
      './src/**/*.vue'
    ]
  },
  theme: {
    extend: {
      spacing: {
        '72': '18rem'
      },
      colors: {
        myfavcolour: {
          lighter: '#f3e9fc',
          default: '#8a2be2',
          darker: '#340c5a',
          reallydark: '#000000'
        }
      }
    }
  },
  variants: {},
  plugins: [],
}
