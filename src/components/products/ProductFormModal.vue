<template>
	<v-dialog v-model="isOpen" max-width="600" persistent>
		<v-card elevation="2">
			<v-card-title class="text-h6 px-4 py-3">상품 등록</v-card-title>
			<v-card-text class="px-4 py-3">
				<v-form ref="formRef">
					<!-- 상품명 -->
					<v-text-field
						v-model="form.productName"
						label="상품명"
						variant="outlined"
						density="compact"
					/>

					<!-- 카테고리 -->
					<v-select
						v-model="form.category"
						:items="mockCategories"
						label="카테고리"
						item-title="description"
						item-value="name"
						variant="outlined"
						density="compact"
					/>

					<!-- 상품 설명 -->
					<v-textarea
						v-model="form.description"
						label="상품 설명"
						variant="outlined"
						density="compact"
					/>

					<!-- 경매 시작일 -->
					<v-date-input
						v-model="form.startDate"
						label="경매 시작일"
						variant="outlined"
						density="compact"
						clearable
						:format="formatDate"
					/>

					<!-- 경매 종료일 -->
					<v-date-input
						v-model="form.closeDate"
						label="경매 종료일"
						variant="outlined"
						density="compact"
						clearable
						:format="formatDate"
					/>

					<!-- 시작가 -->
					<v-text-field
						v-model.number="form.startPrice"
						label="시작가"
						type="number"
						variant="outlined"
						density="compact"
						prepend-icon="mdi-currency-krw"
					/>

					<!-- 이미지 업로드 -->
					<v-file-input
						v-model="form.images"
						label="이미지 업로드"
						multiple
						accept="image/*"
						variant="outlined"
						density="compact"
					/>

					<!-- 버튼 영역 -->
					<v-row class="mt-4 mb-4 mr-1" justify="end">
						<v-btn color="red" @click="close">취소</v-btn>
						<v-btn color="primary" @click="submit" class="ml-2">
							{{ product ? '수정' : '등록' }}
						</v-btn>
					</v-row>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script setup>
	import { ref, watch, defineProps, defineEmits } from 'vue';
	import mockCategories from '@/mock/category';

	const props = defineProps({
		modelValue: Boolean,
		product: Object,
	});
	const emit = defineEmits(['update:modelValue', 'submit']);

	const isOpen = ref(props.modelValue);
	watch(
		() => props.modelValue,
		val => (isOpen.value = val),
	);
	watch(isOpen, val => emit('update:modelValue', val));

	const formRef = ref();
	const form = ref({
		productName: '',
		category: '',
		description: '',
		startDate: null,
		closeDate: null,
		startPrice: null,
		images: [],
	});

	watch(
		() => props.product,
		newProduct => {
			if (newProduct) {
				form.value = { ...newProduct };
			} else {
				form.value = {
					productName: '',
					category: '',
					description: '',
					startDate: null,
					closeDate: null,
					startPrice: null,
					images: [],
				};
			}
		},
		{ immediate: true },
	);

	const formatDate = date => {
		if (!date) return '';
		const d = new Date(date);
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
	};

	const submit = () => {
		// 필요시 formRef.value.validate() 같은 유효성 체크 추가 가능
		emit('submit', form.value);
		isOpen.value = false;
	};

	const close = () => {
		isOpen.value = false;
	};
</script>
