<template>
    <div class="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
        <div class="min-w-full align-middle">
            <table class="border border-solid w-full">
                <thead>
                <tr>
                    <th class="px-6 py-3 bg-gray-100 border text-left">
                        <span class="text-xs leading-3 font-medium text-gray-500 uppercase tracking-wider">ID</span></th>
                    <th class="px-6 py-3 bg-gray-100 border text-left">
                        <span class="text-xs leading-3 font-medium text-gray-500 uppercase tracking-wider">Title</span></th>
                    <th class="px-6 py-3 bg-gray-100 border text-left">
                        <span class="text-xs leading-3 font-medium text-gray-500 uppercase tracking-wider">Content</span></th>
                    <th class="px-6 py-3 bg-gray-100 border text-left">
                        <span class="text-xs leading-3 font-medium text-gray-500 uppercase tracking-wider">Created At</span></th>
                </tr>
                </thead>
                <tbody class="">
                <tr v-for="post in posts.data">
                    <td class="border divide-opacity-50 divide-x-2 divide-y-2 px-6 py-4 whitespace-no-wrap leading-5 text-sm text-gray-900">{{ post.id }}</td>
                    <td class="border divide-opacity-50 divide-x-2 divide-y-2 px-6 py-4 whitespace-no-wrap leading-5 text-sm text-gray-900">{{ post.title }}</td>
                    <td class="border divide-opacity-50 divide-x-2 divide-y-2 px-6 py-4 whitespace-no-wrap leading-5 text-sm text-gray-900">{{ post.content }}</td>
                    <td class="border divide-opacity-50 divide-x-2 divide-y-2 px-6 py-4 whitespace-no-wrap leading-5 text-sm text-gray-900">{{ post.created_at }}</td>
                </tr>
                </tbody>
            </table>
            <div class="mx-auto min-w-full align-middle mt-4">
                <TailwindPagination :data="posts" @pagination-change-page="getPosts" />
            </div>
        </div>
    </div>
</template>

<script>
import {onMounted} from "vue";
import usePosts from "../../composables/posts";
import { TailwindPagination } from 'laravel-vue-pagination';
export default {
    components: {
        TailwindPagination
    },
    setup() {
        const { posts, getPosts } = usePosts();
        onMounted(getPosts);

        return { posts, getPosts };
    }
};
</script>
