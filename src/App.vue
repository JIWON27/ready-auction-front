<template>
	<v-app>
		<TheHeader />

		<v-main></v-main>

		<TheFooter />
	</v-app>
</template>

<script setup>
	import TheHeader from '@/layout/TheHeader.vue';
	import TheFooter from '@/layout/TheFooter.vue';
</script>

<style lang="scss" scoped></style>
