<template>
  <div id="app" v-wechat-title="$route.meta.title">
    <router-view v-wechat-title="$route.meta.title" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
