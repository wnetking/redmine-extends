module.exports = {
  verbose: true,
  resolver: null,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}'
  ],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    "\\.js$": "babel-jest",
  },
  transformIgnorePatterns: []
}