<template>
	<v-footer app class="pa-3 bg-grey-lighten-3">
		<v-container class="d-flex justify-space-between align-center">
			<div>
				&copy; {{ new Date().getFullYear() }} Ready Auction - 개인 프로젝트
			</div>

			<v-btn
				icon
				href="https://github.com/f-lab-edu/ready-auction"
				target="_blank"
				rel="noopener"
				aria-label="GitHub Repository"
			>
				<v-icon>mdi-github</v-icon>
			</v-btn>
		</v-container>
	</v-footer>
</template>

<script setup></script>

<style scoped></style>
