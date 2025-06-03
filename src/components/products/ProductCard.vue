<template>
	<v-card
		class="product-card"
		elevation="3"
		style="position: relative"
		cursor="pointer"
		@click="goToDetail"
	>
		<v-img :src="product.imageResponses[0].url" height="150" cover></v-img>
		<v-chip
			v-if="product.recommended"
			class="recommended-chip"
			color="red"
			small
			style="position: absolute; top: 8px; left: 8px; z-index: 10"
		>
			추천!
		</v-chip>
		<v-card-title class="title-sm">{{ product.productName }}</v-card-title>
		<v-card-subtitle>{{ formatPrice(product.startPrice) }}원</v-card-subtitle>
		<v-card-text class="font-weight-bold text-red">
			{{ timeLeft }}
		</v-card-text>
	</v-card>
</template>

<script setup>
	import { useRouter } from 'vue-router';
	import { ref, onMounted, onUnmounted } from 'vue';
	import updateTimeLeft from '@/utils/timeUtils';

	const props = defineProps({ product: Object });

	const formatPrice = price => price.toLocaleString();

	const timeLeft = ref('');
	onMounted(() => {
		timeLeft.value = updateTimeLeft(props.product); // 최초 1회 실행

		const interval = setInterval(() => {
			timeLeft.value = updateTimeLeft(props.product); // 매초 반환값을 timeLeft에 할당
		}, 1000);

		onUnmounted(() => clearInterval(interval)); // 컴포넌트 제거 시 정리
	});

	const router = useRouter();

	const goToDetail = () => {
		router.push(`/products/${props.product.id}`);
	};
</script>

<style scoped>
	.product-card {
		transition: 0.3s ease;
	}
	.title-sm {
		font-size: 16px;
		font-weight: 600;
	}
</style>
