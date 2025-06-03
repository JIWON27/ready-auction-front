<template>
	<v-app>
		<TheHeader />
		<v-main>
			<!--현재 라우터 경로에 맞는 페이지 컴포넌트를 보여주는 자리-->
			<router-view></router-view>
		</v-main>
		<TheFooter />
	</v-app>
</template>

<script setup>
	import TheHeader from '@/layout/TheHeader.vue';
	import TheFooter from '@/layout/TheFooter.vue';
</script>

<style lang="scss" scoped></style>
