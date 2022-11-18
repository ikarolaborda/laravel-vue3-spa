<template xmlns="http://www.w3.org/1999/html">
    <div class="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
        <div class="min-w-full align-middle">
            <div class="mb-4 grid lg:grid-cols-4 gap-4">
                <input v-model="search_global" type="text" placeholder="Search..." class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            </div>
            <table class="border border-solid w-full">
                <thead>
                <tr>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <input v-model="search_id" type="text" class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Filter by ID">
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <input v-model="search_title" type="text" class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Filter by Title">
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <select v-model="search_category" class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            <option value="" selected>-- all categories --</option>
                            <option v-for="category in categories" :value="category.id">
                                {{ category.name }}
                            </option>
                        </select>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <input v-model="search_content" type="text" class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Filter by Content">
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left"></th>
                    <th class="px-6 py-3 bg-gray-50 text-left"></th>
                </tr>
                <tr>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <div class="flex flex-row items-center justify-between cursor-pointer" @click="updateOrdering('id')">
                            <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider" :class="{ 'font-bold text-blue-600': orderColumn === 'id' }">
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
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        Actions
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
                    <td class="border divide-opacity-50 divide-x-2 divide-y-2 px-6 py-4 whitespace-no-wrap leading-5 text-sm text-gray-900">
                        <div class="inline-flex">
                            <router-link :to="{ name: 'posts.edit', params: { id: post.id } }" class="text-indigo-600 hover:text-indigo-900">
                                <PencilIcon class="text-sm h-5" />
                            </router-link>
                            <a href="#" @click.prevent="deletePost(post.id)" class="text-red-600 hover:text-red-900">
                                <TrashIcon class="ml-5 text-sm h-5" />
                            </a>
                        </div>
                    </td>
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
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";
export default {
    components: {
        TailwindPagination,
        PencilIcon,
        TrashIcon
    },
    setup() {
        const search_category = ref('');
        const search_id = ref('');
        const search_title = ref('');
        const search_content = ref('');
        const search_global = ref('');
        const orderColumn = ref('created_at');
        const orderDirection = ref('desc');
        const { posts, getPosts, deletePost } = usePosts();
        const { categories, getCategories } = useCategories();
        onMounted(() => {
            getPosts(),
            getCategories()
        });

        const updateOrdering = (column) => {
            orderColumn.value = column;
            orderDirection.value = (orderDirection.value === 'asc') ? 'desc' : 'asc';
            getPosts(1, search_category.value,
                search_id.value,
                search_title.value,
                search_content.value,
                orderColumn.value,

                orderDirection.value);
        }

        watch(search_category, (current, previous) => {
            getPosts(
                1,
                current,
                search_id.value,
                search_title.value,
                search_content.value,
                search_global.value)
        });

        watch(search_id, (current, previous) => {
            getPosts(
                1,
                search_category.value,
                current,
                search_title.value,
                search_content.value,
                search_global.value)
        });

        watch(search_title, (current, previous) => {
            getPosts(
                1,
                search_category.value,
                search_id.value,
                current,
                search_content.value,
                search_global.value)
        });

        watch(search_content, (current, previous) => {
            getPosts(
                1,
                search_category.value,
                search_id.value,
                search_title.value,
                current,
                search_global.value)
        });

        watch(search_global, (current, previous) => {
            getPosts(
                1,
                search_category.value,
                search_id.value,
                search_title.value,
                search_content.value,
                current)
        });

        return { posts,
            getPosts,
            deletePost,
            categories,
            getCategories,
            search_category,
            search_id,
            search_title,
            search_content,
            search_global,
            orderColumn,
            orderDirection,
            updateOrdering
        };
    }
};
</script>
