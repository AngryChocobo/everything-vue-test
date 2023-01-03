// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Import global styles
import "@/assets/main.css";
import Antdv from "ant-design-vue";

import { mount } from "cypress/vue";

// 改用按需加载就不需要手动配置plugin了
// import Antdv from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

// Cypress.Commands.add("mount", mount);

import { createPinia, setActivePinia } from "pinia";
import { i18n } from "@/plugins/i18n";
setActivePinia(createPinia());

Cypress.Commands.add("mount", (component: any, args: any = {}) => {
  args.global = args.global || {};
  args.global.plugins = args.global.plugins || [];
  args.global.plugins.push(i18n);
  // 改用按需加载就不需要手动配置plugin了
  // args.global.plugins.push(Antdv);
  return mount(component, args) as any;
});

// Example use:
// cy.mount(MyComponent)
