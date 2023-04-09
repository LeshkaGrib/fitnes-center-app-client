import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login.vue";
import DietPage from "@/views/DietPage.vue";
import Diets from "@/views/Diets.vue";
import ExerciseTypes from "@/views/ExerciseTypes.vue";
import ManagerClients from "@/views/ManagerClients.vue";
import ManagerExercises from "@/views/ManagerExercises.vue";
import ClientsExercises from "@/views/ClientsExercises.vue";
import Managers from "@/views/Managers.vue";
import ManagerPage from "@/views/ManagerPage.vue";
import ManagerProfile from "@/views/ManagerProfile.vue";
import ClientProfile from "@/views/ClientProfile.vue";

const routes = [
  { path: "/login", name: "Login", component: Login },
  {
    path: "/admin/trainers",
    name: "Managers",
    component: Managers,
    meta: { isAdminRoute: true },
  },
  {
    path: "/admin/exercises",
    name: "Exercise types",
    component: ExerciseTypes,
    meta: { isAdminRoute: true },
  },
  {
    path: "/admin/diets",
    name: "Diets",
    component: Diets,
    meta: { isAdminRoute: true },
  },
  {
    path: "/manager/profile",
    name: "ManagerProfile",
    component: ManagerProfile,
    meta: { isManagerRoute: true },
  },
  {
    path: "/manager/clients",
    name: "ManagerClients",
    component: ManagerClients,
    meta: { isManagerRoute: true },
  },
  {
    path: "/manager/exercises",
    name: "ManagerExercises",
    component: ManagerExercises,
    meta: { isManagerRoute: true },
  },
  {
    path: "/client/profile",
    name: "ClientProfile",
    component: ClientProfile,
    meta: { isClientRoute: true },
  },
  {
    path: "/client/exercises",
    name: "ClientExercises",
    component: ClientsExercises,
    meta: { isClientRoute: true },
  },
  {
    path: "/client/trainer",
    name: "ManagersPage",
    component: ManagerPage,
    meta: { isClientRoute: true },
  },
  {
    path: "/client/diet",
    name: "DietPage",
    component: DietPage,
    meta: { isClientRoute: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
