const routes = [
  {
    path: "/",
    component: () => import("pages/my_webpage.vue"),
    // component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "tasks", component: () => import("pages/my_tasks_page.vue") },
      { path: "forms", component: () => import("pages/my_forms.vue") },
      { path: "tables", component: () => import("pages/my_tables.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
