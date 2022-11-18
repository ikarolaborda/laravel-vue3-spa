<template xmlns="http://www.w3.org/1999/html">
    <div class="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
        <div class="min-w-full align-middle">
            <div class="mb-4">
                <select v-model="selectedCategory" class="block mt-1 w-full sm:w-1/4 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option selected value="">-- Filter by Category --</option>
                    <option v-for="category in categories" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>
            <table class="border border-solid w-full">
                <thead>
                <tr>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</span>
                        <!--                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</span>-->
                        <div class="flex flex-row items-center justify-between cursor-pointer" @click="updateOrdering('id')">
                            <div :class="{ 'font-bold text-blue-600': orderColumn === 'id' }" class="leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </div>
                            <div class="select-none">
                                <span :class="{
                                  'text-blue-600': orderDirection === 'asc' && orderColumn === 'id',
                                  'hidden': orderDirection !== '' && orderDirection !== 'asc' && orderColumn === 'id',
                                }">&uarr;</span>
                                <span :class="{
                                  'text-blue-600': orderDirection === 'desc' && orderColumn === 'id',
                                  'hidden': orderDirection !== '' && orderDirection !== 'desc' && orderColumn === 'id',
                                }">&darr;</span>
                            </div>
                        </div>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Title</span>
                        <!--                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Title</span>-->
                        <div class="flex flex-row items-center justify-between cursor-pointer" @click="updateOrdering('title')">
                            <div :class="{ 'font-bold text-blue-600': orderColumn === 'title' }" class="leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </div>
                            <div class="select-none">
                                <span :class="{
                                  'text-blue-600': orderDirection === 'asc' && orderColumn === 'title',
                                  'hidden': orderDirection !== '' && orderDirection !== 'asc' && orderColumn === 'title',
                                }">&uarr;</span>
                                <span :class="{
                                  'text-blue-600': orderDirection === 'desc' && orderColumn === 'title',
                                  'hidden': orderDirection !== '' && orderDirection !== 'desc' && orderColumn === 'title',
                                }">&darr;</span>
                            </div>
                        </div>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Category</span>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Content</span>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Created at</span>
                        <!--                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Created at</span>-->
                        <div class="flex flex-row items-center justify-between cursor-pointer" @click="updateOrdering('created_at')">
                            <div :class="{ 'font-bold text-blue-600': orderColumn === 'created_at' }" class="leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Created at
                            </div>
                            <div class="select-none">
                                <span :class="{
                                  'text-blue-600': orderDirection === 'asc' && orderColumn === 'created_at',
                                  'hidden': orderDirection !== '' && orderDirection !== 'asc' && orderColumn === 'created_at',
                                }">&uarr;</span>
                                <span :class="{
                                  'text-blue-600': orderDirection === 'desc' && orderColumn === 'created_at',
                                  'hidden': orderDirection !== '' && orderDirection !== 'desc' && orderColumn === 'created_at',
                                }">&darr;</span>
                            </div>
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody class="">
                <tr v-for="post in posts.data">
                    <td class="border divide-opacity-50 divide-x-2 divide-y-2 px-6 py-4 whitespace-no-wrap leading-5 text-sm text-gray-900">{{ post.id }}</td>
                    <td class="border divide-opacity-50 divide-x-2 divide-y-2 px-6 py-4 whitespace-no-wrap leading-5 text-sm text-gray-900">{{ post.title }}</td>
                    <td class="border divide-opacity-50 divide-x-2 divide-y-2 px-6 py-4 whitespace-no-wrap leading-5 text-sm text-gray-900">{{ post.category }}</td>
                    <td class="border divide-opacity-50 divide-x-2 divide-y-2 px-6 py-4 whitespace-no-wrap leading-5 text-sm text-gray-900">{{ post.content }}</td>
                    <td class="border divide-opacity-50 divide-x-2 divide-y-2 px-6 py-4 whitespace-no-wrap leading-5 text-sm text-gray-900">{{ post.created_at }}</td>
                </tr>
                </tbody>
            </table>
            <div class="mx-auto min-w-full align-middle mt-4">
                <TailwindPagination :data="posts" @pagination-change-page="page => getPosts(page, selectedCategory)" />
            </div>
        </div>
    </div>
</template>

<script>
import {ref, onMounted, watch} from "vue";
import usePosts from "../../composables/posts";
import useCategories from "../../composables/categories";
import { TailwindPagination } from 'laravel-vue-pagination';
export default {
    components: {
        TailwindPagination
    },
    setup() {
        const selectedCategory = ref('');
        const orderColumn = ref('created_at');
        const orderDirection = ref('desc');
        const { posts, getPosts } = usePosts();
        const { categories, getCategories } = useCategories();
        onMounted(() => {
            getPosts(),
            getCategories()
        });

        const updateOrdering = (column) => {
            orderColumn.value = column;
            orderDirection.value = (orderDirection.value === 'asc') ? 'desc' : 'asc';
            getPosts(1, selectedCategory.value, orderColumn.value, orderDirection.value);
        }

        watch(selectedCategory, (current, previous) => {
            getPosts(1, current)
        });

        return { posts, getPosts, categories, getCategories, selectedCategory, orderColumn, orderDirection, updateOrdering };
    }
};
</script>
