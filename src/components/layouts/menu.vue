<template>
  <v-navigation-drawer
    v-if="isLogedIn"
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <v-list-item
      :title="user?.auth?.login"
      nav
      active-color="primary"
      :active="isProfilePage"
      @click="goTo({ name: profilePageName })"
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
      <template v-slot:prepend>
        <v-avatar v-if="userAvatar" :image="userAvatar"></v-avatar>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list variant="flat" density="compact" nav>
      <v-list-item
        v-for="item in items"
        :key="item.routeName"
        :prepend-icon="item.icon"
        :title="item.title"
        :active="isActiveMenuItem(item)"
        :value="item.routeName"
        @click="goTo({ name: item.routeName })"
        active-color="primary"
      />
      <v-list-item
        v-once
        active-color="primary"
        @click="logout"
        prepend-icon="mdi-logout"
        :title="t('menu.quite')"
        value="logout"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import MenuItem from "@/types/utils/MenuItem";
import useGoTo from "@/hooks/useGoTo";
import AvatarsService from "@/services/AvatarsService";
import { useI18n } from "vue-i18n";

const store = useStore();
const route = useRoute();
const goTo = useGoTo();
const { t } = useI18n();

const drawer = ref(true);
const rail = ref(true);

const user = computed(() => store.getters["auth/user"]);
const role = computed(() => store.getters["auth/role"]);
const isLogedIn = computed(() => store.getters["auth/isLogedIn"]);

const logout = () => {
  store.commit("auth/logout");
  sessionStorage.clear();
  store.reset();
};

const profilePageName = computed<string>(() => {
  if (role.value === "manager") {
    return "ManagerProfile";
  }
  return "ClientProfile";
});

const isProfilePage = computed<boolean>(() => {
  return route.name === profilePageName.value;
});

const isActiveMenuItem = (menuItem: MenuItem): boolean => {
  return route.name === menuItem.routeName;
};

const items = computed<MenuItem[]>(() => {
  if (role.value == "admin") {
    return [
      {
        title: t("menu.trainers"),
        icon: "mdi-account-group-outline",
        routeName: "Managers",
      },
      {
        title: t("menu.exerciseTypes"),
        icon: "mdi-dumbbell",
        routeName: "ExerciseTypes",
      },
      {
        title: t("menu.diets"),
        icon: "mdi-food-fork-drink",
        routeName: "Diets",
      },
    ];
  } else if (role.value == "manager") {
    return [
      {
        title: t("menu.clients"),
        icon: "mdi-account-group-outline",
        routeName: "ManagerClients",
      },
      {
        title: t("menu.exerciseTypes"),
        icon: "mdi-animation",
        routeName: "ManagersExercisesTypes",
      },
      {
        title: t("menu.diets"),
        icon: "mdi-food-fork-drink",
        routeName: "ManagerDiets",
      },

      {
        title: t("menu.exercises"),
        icon: "mdi-dumbbell",
        routeName: "ManagerExercises",
      },
    ];
  } else {
    return [
      {
        icon: "mdi-dumbbell",
        routeName: "ClientExercises",
        title: t("menu.exercises"),
      },
      {
        icon: "mdi-kabaddi",
        routeName: "ManagerPage",
        title: t("menu.trainer"),
      },
      {
        icon: "mdi-food-fork-drink",
        routeName: "DietPage",
        title: t("menu.diet"),
      },
    ];
  }
});

const userAvatar = computed(() => {
  return AvatarsService.getAvatarUrl(user.value);
});
</script>

<style scoped></style>
