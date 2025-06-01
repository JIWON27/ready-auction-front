<template>
	<v-container class="pa-0">
		<v-toolbar color="white" flat>
			<v-row align="center" class="w-100" no-gutters>
				<v-col cols="2">
					<v-toolbar-title class="text-h6 font-weight-bold">
						READY AUCTION
					</v-toolbar-title>
				</v-col>

				<v-col cols="8">
					<v-text-field
						v-model="search"
						placeholder="브랜드, 상품 관련 키워드 등"
						append-icon="mdi-magnify"
						hide-details
						single-line
						density="compact"
						variant="solo"
						@keyup.enter="onSearch"
					/>
				</v-col>

				<v-col cols="2" class="d-flex justify-end align-center">
					<v-badge
						:content="notificationCount > 9 ? '9+' : notificationCount"
						color="red"
						offset-x="13"
						offset-y="10"
						v-if="notificationCount > 0"
					>
						<v-btn icon><v-icon>mdi-bell</v-icon></v-btn>
					</v-badge>
					<v-avatar size="32" class="mx-2">
						<v-icon>mdi-account</v-icon>
					</v-avatar>
					<span>{{ userNickname }}</span>
				</v-col>
			</v-row>
		</v-toolbar>
	</v-container>

	<div style="border-bottom: 1px solid #e0e0e0">
		<v-tabs
			v-model="selectedTab"
			centered
			slider-color="black"
			class="mx-auto"
			style="max-width: 1200px"
		>
			<v-tab
				v-for="(category, i) in mockCategories"
				:key="category.name"
				:href="`#tab-${i}`"
			>
				{{ category.description }}
			</v-tab>
		</v-tabs>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import mockCategories from '@/mock/category';

	const selectedTab = ref(null);
	const userNickname = ref('guest님');
	const search = ref('');
	const notificationCount = ref(20);

	function onSearch() {
		console.log('검색어:', search.value);
	}
</script>

<style scoped></style>
