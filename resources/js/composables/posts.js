import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

export default function usePosts() {
    const posts = ref({});
    const post = ref({})
    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false);
    const swal = inject('$swal');

    const getPosts = async (page = 1,
                            search_category = '',
                            search_id = '',
                            search_title = '',
                            search_content = '',
                            search_global = '',
                            order_column = 'created_at',
                            order_direction = 'desc') => {
        axios.get('/api/posts?page=' + page +
            '&search_category=' + search_category +
            '&search_id=' + search_id +
            '&search_title=' + search_title +
            '&search_content=' + search_content +
            '&search_global=' + search_global +
            '&order_column=' + order_column +
            '&order_direction=' + order_direction).then(
            response => {
                posts.value = response.data;
            }
        )
    };

    const getPost = async (id) => {
        axios.get('/api/posts/' + id)
            .then(response => {
                post.value = response.data.data;
            })
    }

    const storePost = async (post) => {
        if(isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};
        axios.post('/api/posts', post).then(
            response => {
                router.push({name: 'posts.index'});
                swal({
                    icon: 'success',
                    title: 'Post Criado com Sucesso!',
                });
            }
        ).catch(error => {
            if(error.response?.data) {
                validationErrors.value = error.response.data.errors;
            }
        }).finally(() => {
            isLoading.value = false;
        });
    }

    const updatePost = async (post) => {
        if(isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};
        axios.put('/api/posts/' + post.id, post).then(
            response => {
                router.push({name: 'posts.index'});
                swal({
                    icon: 'success',
                    title: 'Post Atualizado com Sucesso!',
                });
            }
        ).catch(error => {
            if(error.response?.data) {
                validationErrors.value = error.response.data.errors;
            }
        }).finally(() => {
            isLoading.value = false;
        });
    }

    const deletePost = async (id) => {
        swal({
            title: 'Tem certeza?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, apague-o!',
            confirmButtonColor: '#ef4444',
            timer: 20000,
            timerProgressBar: true,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('/api/posts/' + id).then(
                    response => {
                        getPosts();
                        router.push({name: 'posts.index'});
                        swal({
                            icon: 'success',
                            title: 'Post Apagado com Sucesso!',
                        });
                    }
                ).catch(error => {
                    swal({
                        icon: 'error',
                        title: 'Você não tem permissão para executar esta ação!',
                    })
                })
            }
        }).catch(error => {
            swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo deu errado!' + error,
            });
        })
    }

    return {
        posts,
        post,
        getPosts,
        getPost,
        storePost,
        updatePost,
        deletePost,
        validationErrors,
        isLoading
    };
}
