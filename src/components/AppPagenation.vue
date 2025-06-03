<template>
	<v-row justify="center" class="mt-6">
		<v-pagination
			:model-value="modelValue"
			:length="totalPages"
			:total-visible="10"
			color="primary"
			@update:modelValue="$emit('update:modelValue', $event)"
		/>
	</v-row>
</template>

<script setup>
	defineProps({
		modelValue: Number,
		totalPages: {
			type: Number,
			required: true,
		},
	});
</script>
