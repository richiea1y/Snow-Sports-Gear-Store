<template>
  <!-- 
  <header> 用於頁首
  <nav> 用於導航
  <main> 用於主要內容
  <aside> 用於側邊欄
  <section> 用於內容區塊
  -->

  <!-- Header 區域 -->
  <header id="app" class="header-wrapper">
    <nav class="nav-main">
      <a href="../../assets/Logo-removebg-preview.png" class="logo"><img src="../../assets/Logo-removebg-preview.png"
          alt="Logo"></a>
      <ul class="nav-category">
        <li class="nav-item"><a href="#">SNOWBOARD</a></li>
        <li class="nav-item"><a href="#">SKI</a></li>
        <li class="nav-item"><a href="#">BACKCOUNTRY</a></li>
        <li class="nav-item"><a href="#">ACCESSORIES</a></li>
        <li class="nav-item"><a href="#">CLOTHING</a></li>
        <li class="nav-item"><a href="#">HIRE</a></li>
      </ul>
    </nav>
  </header>

  <!-- 主要內容區 -->
  <main class="main-container">
    <!-- 左側過濾區 -->
    <aside class="category-filter">
      <h2>Category Filter By</h2>
      <!-- 過濾選項將在這裡添加 -->
    </aside>

    <!-- 右側內容區 -->
    <div class="content-wrapper">
      <!-- 排序選單 -->
      <section class="sort-menu">
        <h2>Menu</h2>
        <!-- 排序選項將在這裡添加 -->
      </section>

      <!-- 產品列表 -->
      <section class="product-list">
        <!-- 產品卡片將在這裡添加 -->
      </section>
    </div>
  </main>
</template>

<script setup>
</script>

<style scoped>
  @import 'main.scss';
</style>