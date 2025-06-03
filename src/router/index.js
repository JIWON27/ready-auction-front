import { createRouter, createWebHistory } from 'vue-router';
import AppHome from '@/components/AppHome.vue';
import ProductDetail from '@/components/products/ProductDetail.vue';
import ProductEnroll from '@/components/products/ProductEnroll.vue';
import ProductEdit from '@/components/products/ProductEdit.vue';
import ProductManagement from '@/components/products/ProductManagement.vue';
import ProductList from '@/components/products/ProductList.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		component: AppHome,
	},
	{
		path: '/products/:id',
		name: 'product-detail',
		component: ProductDetail,
		//props: true, // :id를 props로 전달
	},
	{
		path: '/products/manage',
		name: 'product-manage',
		component: ProductManagement,
	},
	{
		path: '/products/new',
		name: 'product-enroll',
		component: ProductEnroll,
	},
	{
		path: '/products/edit',
		name: 'product-edit',
		component: ProductEdit,
	},
	{
		path: '/products',
		name: 'product-List',
		component: ProductList,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes: routes,
});

export default router;
