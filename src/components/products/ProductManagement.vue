<template>
	<v-container>
		<!-- 탭 메뉴 -->
		<v-tabs v-model="selectedTab" background-color="grey lighten-4" grow>
			<v-tab value="ongoing">경매 진행중</v-tab>
			<v-tab value="ended">경매 종료</v-tab>
			<v-tab value="waiting">경매 대기</v-tab>
		</v-tabs>
		<v-row class="mt-3 mr-1 mb-3" justify="end">
			<v-btn color="primary" @click="onEnroll">상품 등록</v-btn>
		</v-row>

		<!-- 상품 리스트 -->
		<v-row class="mt-4" dense>
			<v-col
				v-for="product in paginatedProducts"
				:key="product.id"
				cols="12"
				md="6"
				lg="2"
			>
				<ProductCard :product="product" />

				<!-- 하단 버튼 -->
				<v-row v-if="isWaitingTab" class="mt-2" justify="end" no-gutters>
					<v-btn
						size="small"
						variant="outlined"
						color="primary"
						@click="onEdit(product)"
					>
						수정
					</v-btn>
					<v-btn
						size="small"
						variant="outlined"
						color="error"
						class="ml-2"
						@click="onDelete(product)"
					>
						삭제
					</v-btn>
				</v-row>
			</v-col>
		</v-row>

		<AppPagenation
			v-model="currentPage"
			:total-pages="Math.ceil(filteredProducts.length / itemsPerPage)"
		/>

		<!-- 상품 등록/수정 모달 -->
		<ProductFormModal
			v-model="isDialogOpen"
			:product="selectedProduct"
			@submit="onSubmit"
		/>
	</v-container>
</template>

<script setup>
	import { ref, computed, watch } from 'vue';
	import ProductCard from '@/components/products/ProductCard.vue';
	import ProductFormModal from '@/components/products/ProductFormModal.vue';
	import mockProducts from '@/mock/products';
	import AppPagenation from '@/components/AppPagenation.vue';

	const selectedTab = ref('ongoing');
	const now = new Date();

	function getStatus(product) {
		const start = new Date(product.startDate);
		const close = new Date(product.closeDate);

		if (now < start) return 'waiting';
		if (now >= start && now < close) return 'ongoing';
		return 'ended';
	}

	const filteredProducts = computed(() =>
		mockProducts.filter(p => getStatus(p) === selectedTab.value),
	);

	const isWaitingTab = computed(() => selectedTab.value === 'waiting');

	const currentPage = ref(1);
	const itemsPerPage = 12;

	const paginatedProducts = computed(() => {
		const start = (currentPage.value - 1) * itemsPerPage;
		return filteredProducts.value.slice(start, start + itemsPerPage);
	});

	const isDialogOpen = ref(false);
	const selectedProduct = ref(null);

	watch(selectedTab, () => {
		currentPage.value = 1;
	});

	function onEnroll() {
		selectedProduct.value = null;
		isDialogOpen.value = true;
	}

	function onEdit(product) {
		selectedProduct.value = { ...product }; // 복사본
		isDialogOpen.value = true;
	}

	function onDelete(product) {
		console.log('삭제', product);
		// 삭제 로직 연결
	}
	function onSubmit(updatedProduct) {
		console.log('제출됨', updatedProduct);
		isDialogOpen.value = false;
	}
</script>
