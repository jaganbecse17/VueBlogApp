<template>
    <div>
        <p class="header-text">Blog Collection</p>
        <div>
            <!-- Blog list have been put into loop -->
            <template v-for="blog in BlogsList">
                <div :key="blog.id" class="blog-wrapper">
                    <div class="blog-header">
                        <p><strong>Title: </strong>{{ blog?.title }} <strong>author:</strong> {{ blog?.author }}</p>
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
                ]
            }   
        },
        mounted(){
            // Will be fetched on page load
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
            /*
                Function to fetch all blogs available
                will call a common function for service api call's
            */
            async FetchAllblogs(){
                let _request ={
                    url:'http://localhost:3000/blog/fetchAllBlogs',
                }
                let _result =await ApiCall.GetApiRequest(_request)
                // On Success on api will set response to data property
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
.blog-wrapper .blog-header strong:last-child{
    margin-left: 1.5rem;
}
.blog-wrapper .blog-header .btn{
    padding: .5rem;
    border: none;
    background-color: #2098D1;
    border-radius: 4px;
    color:white
}
</style>