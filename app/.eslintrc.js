module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  globals: {
    GeoVis: true,
    earth: true,
    DrawHelper: true,
    $: true,
    make_feedback: true,
    THREE: true,
    three: true,
    planet: true,
    mapv: true,
    fetch:true,
    echarts:true,
    require: true
  },
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "vue/no-reserved-keys": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    'max-len': ['warn', 180, { ignoreUrls: true, }],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};
