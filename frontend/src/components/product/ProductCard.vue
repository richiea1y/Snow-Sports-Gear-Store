<template>
  <div class="product-card">
    <div class="product-image">
      <!-- 暫時使用預設圖片 -->
      <img src="https://via.placeholder.com/200" alt="產品圖片">
    </div>
    <div class="product-info">
      <h3>滑雪板</h3>
      <p class="price">NT$ 15,000</p>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  width: 250px;
  background: white;
}

.product-image img {
  width: 100%;
  height: 200px;
  /* 調整圖案在範圍的填充類型，這個是讓圖片有覆蓋到整個範圍，但相對圖片會被放大，因為原本的圖片比較細長 */
  object-fit: cover;
  border-radius: 4px;
}

.product-info {
  padding: 0.5rem 0;
}

.price {
  color: #e53e3e;
  font-weight: bold;
}
</style>

