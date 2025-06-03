<template>
	<v-container>
		<v-row justify="end">
			<v-col cols="12" md="2">
				<v-select
					v-model="orderOption"
					:items="mockOrder"
					item-title="description"
					item-value="name"
					density="compact"
					label="정렬 기준"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col
				v-for="product in paginatedProducts"
				:key="product.id"
				cols="12"
				md="4"
				lg="2"
			>
				<ProductCard :product="product" />
			</v-col>
		</v-row>

		<AppPagenation
			v-model="currentPage"
			:total-pages="Math.ceil(mockProducts.length / itemsPerPage)"
		/>
	</v-container>
</template>

<script setup>
	import { ref, computed } from 'vue';
	import ProductCard from '@/components/products/ProductCard.vue';
	import mockProducts from '@/mock/products';
	import mockOrder from '@/mock/order';
	import AppPagenation from '@/components/AppPagenation.vue';

	const currentPage = ref(1);
	const orderOption = ref('최신순');
	const itemsPerPage = 12;

	const paginatedProducts = computed(() => {
		const start = (currentPage.value - 1) * itemsPerPage;
		return mockProducts.slice(start, start + itemsPerPage);
	});
</script>

<style scoped></style>
