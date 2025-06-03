<template>
	<v-container class="py-8">
		<v-row>
			<!-- 이미지 캐러셀 + 상품 설명 -->
			<v-col cols="12" md="6">
				<v-carousel height="350" hide-delimiter-background show-arrows cycle>
					<v-carousel-item
						v-for="(image, index) in product.imageResponses"
						:key="index"
					>
						<v-img :src="image.url" height="300" cover></v-img>
					</v-carousel-item>
				</v-carousel>

				<!-- 상품 설명 -->
				<v-card
					class="pa-3"
					color="white"
					elevation="0"
					style="border: 1px solid #ccc; border-radius: 8px"
				>
					<p class="text-body-1">{{ product.description }}</p>
				</v-card>
			</v-col>

			<!-- 상품 정보 및 입찰 -->
			<v-col cols="12" md="6" class="d-flex justify-center">
				<v-card elevation="2" class="pa-4" max-width="500px" width="100%">
					<div class="d-flex justify-space-between align-center mb-4">
						<h2 class="text-h5 font-weight-bold mb-0">
							{{ product.productName }}
						</h2>
						<v-chip class="ml-3" color="indigo" text-color="white" small>
							{{ product.category }}
						</v-chip>
					</div>

					<v-divider class="mb-5"></v-divider>

					<v-row class="mb-2 pl-3" align="center">
						<v-icon left>mdi-account</v-icon>
						<span class="text-subtitle-2">판매자:</span>
						<strong class="ml-2">{{ product.userId }}</strong>
					</v-row>

					<v-row class="mb-2 pl-3" align="center">
						<v-icon left>mdi-currency-krw</v-icon>
						<span class="text-subtitle-2">시작가:</span>
						<strong class="ml-2">
							{{ formatPrice(product.startPrice) }}원
						</strong>
					</v-row>

					<v-row class="mb-2 pl-3" align="center">
						<v-icon left>mdi-currency-krw</v-icon>
						<span class="text-subtitle-2">현재 최고가:</span>
						<strong class="ml-2">{{ formatPrice(currentPrice) }}원</strong>
					</v-row>

					<v-row class="mb-4 pl-3" align="center">
						<v-icon left color="red">mdi-clock-alert-outline</v-icon>
						<strong class="ml-2" style="color: red">{{ timeLeft }}</strong>
					</v-row>

					<v-text-field
						v-model="bidPrice"
						label="입찰가를 입력하세요."
						type="number"
						prepend-inner-icon="mdi-currency-krw"
					/>

					<!-- 경매 주의사항 -->
					<v-alert
						type="warning"
						dense
						outlined
						border="left"
						colored-border
						elevation="1"
						class="mb-4 mt-2"
					>
						<div>
							<p>※ 입찰 후 취소는 불가능합니다.</p>
							<p>※ 입찰가는 현재 최고가보다 높아야 합니다.</p>
							<p>※ 경매 마감 후 낙찰자는 별도 안내 메시지를 받습니다.</p>
						</div>
					</v-alert>

					<v-btn color="primary" @click="submitBid" :disabled="!bidPrice" block>
						<v-icon left>mdi-gavel</v-icon>
						입찰하기
					</v-btn>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
	import { ref, onMounted, onUnmounted } from 'vue';
	import updateTimeLeft from '@/utils/timeUtils';

	// 예시용 mockProduct 데이터
	const product = ref({
		id: 1,
		userId: 'user001',
		productName: '나이키 에어포스 1',
		description:
			'클래식한 디자인의 나이키 운동화입니다.클래식한 디자인의 나이키 운동화입니다.클래식한 디자인의 나이키 운동화입니다.클래식한 디자인의 나이키 운동화입니다.클래식한 디자인의 나이키 운동화입니다.클래식한 디자인의 나이키 운동화입니다.클래식한 디자인의 나이키 운동화입니다.',
		category: 'FASHION',
		imageResponses: [
			{ url: '/images/macbook.jpeg' },
			{ url: '/images/teslar.jpeg' },
		],
		startDate: '2025-06-01T10:00:00',
		closeDate: '2025-06-10T15:00:00',
		startPrice: 50000,
		recommended: true,
	});

	const bidPrice = ref('');
	const currentPrice = ref(product.value.startPrice); // 초기값은 시작가

	const formatPrice = price =>
		price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	const timeLeft = ref('');
	onMounted(() => {
		timeLeft.value = updateTimeLeft(product.value); // 최초 1회 실행

		const interval = setInterval(() => {
			timeLeft.value = updateTimeLeft(product.value); // 매초 반환값을 timeLeft에 할당
		}, 1000);

		onUnmounted(() => clearInterval(interval)); // 컴포넌트 제거 시 정리
	});

	const submitBid = () => {
		const bid = Number(bidPrice.value);

		if (bid <= currentPrice.value) {
			alert('현재 최고가보다 높은 금액을 입력해주세요.');
			return;
		}

		alert(`입찰가 ${formatPrice(bid)}원으로 입찰 요청`);
		currentPrice.value = bid; // 실제로는 SSE 수신으로 업데이트 예정
		bidPrice.value = '';
	};
</script>
<style scoped></style>
