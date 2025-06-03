<template>
	<v-container class="py-6">
		<v-card class="mb-8" height="200px" color="primary" dark>
			<v-row class="fill-height" align="center" justify="center">
				<v-col class="text-center">
					<h1 class="display-1">READY-AUCTION</h1>
				</v-col>
			</v-row>
		</v-card>

		<!-- 경매 마감 임박 상품 -->
		<h3 class="mb-2">
			<v-icon class="mr-1" color="red">mdi-timer-sand</v-icon>
			경매가 곧 종료돼요!
		</h3>
		<v-slide-group show-arrows center-active class="pa-2">
			<v-slide-item v-for="product in mockProducts" :key="product.id">
				<v-card class="ma-2" width="200">
					<ProductCard :product="product" />
				</v-card>
			</v-slide-item>
		</v-slide-group>

		<!-- 곧 시작하는 경매 -->
		<h3 class="mb-2">
			<v-icon class="mr-1" color="blue">mdi-rocket-launch</v-icon>
			경매가 곧 시작돼요!
		</h3>
		<v-slide-group show-arrows center-active class="pa-2">
			<v-slide-item v-for="product in mockProducts" :key="product.id">
				<v-card class="ma-2" width="200">
					<ProductCard :product="product" />
				</v-card>
			</v-slide-item>
		</v-slide-group>

		<!-- 참여자 많은 인기 경매 상품 -->

		<h3 class="mb-2">
			<v-icon class="mr-1" color="orange">mdi-fire</v-icon>
			참여자가 많은 경매예요!
		</h3>
		<v-slide-group show-arrows center-active class="pa-2">
			<v-slide-item v-for="product in mockProducts" :key="product.id">
				<v-card class="ma-2" width="200">
					<ProductCard :product="product" />
				</v-card>
			</v-slide-item>
		</v-slide-group>
	</v-container>
</template>

<script setup>
	import ProductCard from '@/components/products/ProductCard.vue';
	import mockProducts from '@/mock/products';
</script>

<style scoped></style>
