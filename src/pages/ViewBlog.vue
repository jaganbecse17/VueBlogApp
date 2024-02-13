<template>
    <div>
        <div class="blog-wrapper">
            <div class="blog-title">
                <p> {{BlogData?.title}} - {{BlogData?.author}}</p>
            </div>
            <div class="blog-content-placer">
                <p>{{BlogData?.content}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import ApiCall from "@/service/index"
    export default {
        mounted(){
            this.FetchAllblogs()
        },
        data(){
            return{
                BlogData:[]
            }
        },
        methods:{
            // Fetch single blog based on blog id
            async FetchAllblogs(){
                let _request ={
                    url:`http://localhost:3000/blog/fetchBlogById/?id=${this.$route.params.blogId}`,
                }
                let _result =await ApiCall.GetApiRequest(_request)
                if(_result?.status && _result?.response?.success){
                    this.BlogData =_result?.response?.data
                }else this.BlogData ={}
            }
        }
    }
</script>

<style scoped>
.blog-wrapper{
    background-color: #fff;
    margin: 1rem;
    padding: 1rem;
}
.blog-title p{
    font-weight: bold;
    margin: 1rem 0;
}
</style>