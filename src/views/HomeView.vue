<script setup>

</script>

<template>
  <!-- 直接使用程式碼即可產生畫面 -->
  <v-app id="container">

    <v-navigation-drawer
      class="pt-4"
      color="grey-lighten-3"
      model-value
      rail>

      <v-avatar
        v-for="n in 6"
        :key="n"
        :color="`grey-${n === 1 ? 'darken' : 'lighten'}-1`"
        :size="n === 1 ? 36 : 20"
        class="d-block text-center mx-auto mb-9">
      </v-avatar>

    </v-navigation-drawer>

    <v-main>
      <PerfectScrollbar>
        <div class="box" v-for="i in 20" style="width: 100px; height: 100px; border: 1px solid black;">
          {{ i }}
        </div>
      </PerfectScrollbar>
    </v-main>

  </v-app>
</template>

<style>
.ps{
  height: 100vh;
}
</style>
