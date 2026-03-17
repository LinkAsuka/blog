<script setup>
import { ref, onMounted } from 'vue'
import '../public/css/index.scss'
import '../public/css/home.scss'
const show = ref(false)
var isMobile = false
const videoLoaded = () => {
  show.value = true
}
onMounted(() => {
  isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const timeoutId = setTimeout(() => {
    show.value = true
  }, 5000)
  return () => clearTimeout(timeoutId)
})
</script>

<template>
  <main>
    <div v-show="!show" class="loading">
      <img class="loading-icon" src="/images/asuka.png" />
      <div class="loading-image-dot"></div>
    </div>
    <div class="home-video" v-if="show && !isMobile">
      <video  src="/video/1_15488489004283.mp4" autoplay loop muted @loadedmetadata="videoLoaded"></video>
    </div>
    <div class="home-container" v-if="show && isMobile">
      <img class="home-img" src="/images/mobj.jpg" />
    </div>
  </main>
</template>
<style></style>
