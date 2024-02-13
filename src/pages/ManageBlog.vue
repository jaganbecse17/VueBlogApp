<template>
    <div>
        <p class="header-text">Blogs</p>
        <!-- User not logined will see this message -->
        <div v-if="!$store.state.profile?.loggedIn">
            <p style="text-align:center"> Login to see Your Blogs</p>
        </div>
        <!-- Only Logged user will see there post -->
        <div v-else>
            <template v-for="blog in BlogsList">
                <div :key="blog.id" class="blog-wrapper">
                    <div class="blog-header">
                        <p>{{ blog?.title }}</p>
                        <button class="btn" @click="ViewBlog(blog)">View</button>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import ApiCall from "@/service/index"
    export default {
        data(){
            return{
                BlogsList:[
                    {
                        title:"New Post",
                        content:"New post on modern technology",
                        id:1
                    },
                    {
                        title:"New Post",
                        content:"New post on modern technology",
                        id:1
                    }
                ]
            }   
        },
        mounted(){
            this.FetchAllblogs()
        },
        methods:{
            /*
            On clicking the blog titile, Api will be called to fetch 
            specific blog based on the Id of blog
            */
            ViewBlog(blog){
                console.log('blog',blog)
                // fetch blog
                // save onto store
                // navigate
                this.$router.push({
                    name:"BlogViewer",
                    params:{
                        blogId:blog.id
                    }
                })
            },
            // Fetch All blogs based on the current user logined
            async FetchAllblogs(){
                let _request ={
                    url:`http://localhost:3000/blog/fetchBlogByAuthor/?id=${this.$store.state.profile?.userName}`,
                }
                let _result =await ApiCall.GetApiRequest(_request)
                console.log("_result",_result)
                if(_result?.status && _result?.response?.success){
                    this.BlogsList =_result?.response?.data
                }
            }
        }
    }
</script>

<style>
.header-text{
    font-weight: bold;
    font-size: large;
    padding: 1rem;
}
.blog-wrapper{
    background-color: #fff;
    padding: 1rem;
    margin: 1rem;
    border-radius: 8px;
}
.blog-wrapper .blog-header{
    display: flex;
    justify-content: space-between;
}
.blog-wrapper .blog-header .btn{
    padding: .5rem;
    border: none;
    background-color: #2098D1;
    border-radius: 4px;
    color:white
}
</style>