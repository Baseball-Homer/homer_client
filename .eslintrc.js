module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended"],
  rules: {
    "no-var": "error",
    "no-unused-vars": "error",
    "no-empty": "error",
    "vue/multi-word-component-names": "off",
  },
};
