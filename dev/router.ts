import Vue, { VNode } from 'vue'
import Router from 'vue-router'
import CardsDemo from "./views/Cards.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import("./Index.vue")
    },
    {
      path: '/cards',
      component: CardsDemo
    },
    {
      path: '/modals',
      component: () => import("./views/Modals.vue")
    },
    {
      path: '/buttons',
      component: () => import("./views/Buttons.vue")
    }
    ,{
      path: '/radios',
      component: () => import("./views/Radios.vue")
    },
    {
      path: '/switches',
      component: () => import("./views/Switches.vue")
    },
    {
      path: '/tags',
      component: () => import("./views/Tags.vue")
    },
    {
      path: '/inputtext',
      component: () => import("./views/InputText.vue")
    },
    {
      path: '/loaders',
      component: () => import("./views/Loaders.vue")
    },
    {
      path: '/checkboxes',
      component: () => import("./views/Checkboxes.vue")
    },
    {
      path: '/buttongroup',
      component: () => import("./views/ButtonGroup.vue")
    },
    {
      path: '/contentloaders',
      component: () => import("./views/ContentLoaders.vue")
    },
    {
      path: '/text',
      component: () => import("./views/Text.vue")
    },
    {
      path: '/pagination',
      component: () => import("./views/Pagination.vue")
    },
    {
      path: '/accordions',
      component: () => import("./views/Accordions.vue")
    },
    {
      path: '/box',
      component: () => import("./views/Box.vue")
    },
    {
      path: '/blaw-accordion',
      component: () => import("./views/blaw/blaw-accordion.vue")
    },
    {
      path: '/blaw-autocomplete',
      component: () => import("./views/blaw/blaw-autocomplete.vue")
    },
    {
      path: '/blaw-button',
      component: () => import("./views/blaw/blaw-button.vue")
    },
    {
      path: '/blaw-card',
      component: () => import("./views/blaw/blaw-card.vue")
    },
    {
      path: '/blaw-checkbox',
      component: () => import("./views/blaw/blaw-checkbox.vue")
    },
    {
      path: '/blaw-dropdown',
      component: () => import("./views/blaw/blaw-dropdown.vue")
    },
    {
      path: '/blaw-dropdown-menu',
      component: () => import("./views/blaw/blaw-dropdown-menu.vue")
    },
    {
      path: '/blaw-highlighted-text',
      component: () => import("./views/blaw/blaw-highlighted-text.vue")
    },
    {
      path: '/blaw-horizontal-navigation',
      component: () => import("./views/blaw/blaw-horizontal-navigation.vue")
    },
    {
      path: '/blaw-modal',
      component: () => import("./views/blaw/blaw-modal.vue")
    },
    {
      path: '/blaw-navigation-menu',
      component: () => import("./views/blaw/blaw-navigation-menu.vue")
    },
    {
      path: '/blaw-number-range-input',
      component: () => import("./views/blaw/blaw-number-range-input.vue")
    },
    {
      path: '/blaw-radio-list',
      component: () => import("./views/blaw/blaw-radio-list.vue")
    },
    {
      path: '/blaw-small-spinner',
      component: () => import("./views/blaw/blaw-small-spinner.vue")
    },
    {
      path: '/blaw-spinner',
      component: () => import("./views/blaw/blaw-spinner.vue")
    },
    {
      path: '/blaw-tabs',
      component: () => import("./views/blaw/blaw-tabs.vue")
    },
    {
      path: '/blaw-text-input',
      component: () => import("./views/blaw/blaw-text-input.vue")
    },
    {
      path: '/blaw-textarea',
      component: () => import("./views/blaw/blaw-textarea.vue")
    },
    {
      path: '/blaw-vertical-tabs',
      component: () => import("./views/blaw/blaw-vertical-tabs.vue")
    },
  ]
})
