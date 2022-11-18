<template>
    <div class="min-h-screen bg-gray-100">
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                <h6 class="mb-4 text-1xl font-extrabold text-gray-900 dark:text-white md:text-1xl lg:text-2xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Post Creation</span> SPA</h6>
                <div class="flex items-center">
                    <a href="tel:5541251234" class="mr-6 text-sm font-medium text-gray-500 dark:text-white hover:underline">{{
                            user.name
                        }}</a>
                    <a href="#" @click="logout" type="button" :class="{ 'opacity-25': processing }" :disabled="processing" class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ user.email }} - Logout</a>
                </div>
            </div>
        </nav>
        <nav class="bg-gray-50 dark:bg-gray-700">
            <div class="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
                <div class="flex items-center">
                    <ul class="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
                        <li>
                            <router-link :to="{ name: 'posts.index'}" active-class="border-b-2 border-indigo-400" class="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out">
                                Posts
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'posts.create'}" active-class="border-b-2 border-indigo-400" class="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out">
                                Create Post
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- Page Heading -->
        <header class="bg-white shadow">
            <div class="inline-flex justify-center items-center max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h2 class="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
                    {{ currentPageTitle}}
                </h2>
            </div>
        </header>

        <!-- Page Content -->
        <main>
            <div class="py-12">
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="p-6 bg-white border-b border-gray-200">
                            <router-view></router-view>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import useAuth from "../composables/auth";
export default {
    setup() {
        const { user, processing, logout } = useAuth();
        return {
            user,
            processing,
            logout
        }
    },
    computed: {
        currentPageTitle() {
            return this.$route.meta.title;
        }
    }
}
</script>

<style scoped>

</style>
