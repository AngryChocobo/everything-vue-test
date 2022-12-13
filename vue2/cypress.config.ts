import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'xyjqhg',
  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
  },
  e2e: {
    experimentalRunAllSpecs: true,
  },
});
