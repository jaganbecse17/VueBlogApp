<template>
    <div>
        <div class="create-blog-wrapper">
            <div v-if="!$store.state.profile?.loggedIn">
                <p style="text-align:center"> Login to create blogs</p>
            </div>
            <template v-else>
                <div class="create-blog-header">
                    <p>Create New Blog</p>
                </div>
                <div class="create-blog-content">
                    <input-form :formFields="getFormFields" formName="blogForm" @OnBtnClick="OnBtnClick"></input-form>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
// dynmic import - lazy load
const InputForm = ()=>import('@/components/InputForm')
import ApiCall from '@/service/index'
    export default {
        components:{
            InputForm
        },
        computed:{
            // To get Updated values from data property
            getFormFields(){
                return this.fields
            }
        },
        mounted(){
            // Initialy set empty object on form State
            this.$store.state.formState['blogForm']={}
        },
        data(){
            return{
                fields:[
                    {
                        label:"Title",
                        type:"text",
                        key:"title",
                        className:""
                    },
                    {
                        label:"Content",
                        type:"textarea",
                        key:"content",
                        className:""
                    },
                    {
                        label:"Save Blog",
                        type:"button",
                        key:"SAVE",
                        fieldClassName:"submit-btn"
                    }
                ]
            }
        },
        methods:{
            OnBtnClick(data){
                // Calling function based on key of field object
                if(data?.key=="SAVE"){
                    this.SaveNewBlog()
                }
            },
            async SaveNewBlog(){
                // Getting data from the store of form State 
                let data =this.$store.state.formState['blogForm']
                // binding addition data to request for blog validation
                data['authorId'] = this.$store.state.profile?.id
                data['author'] = this.$store.state.profile?.userName
                let _request ={
                    url:'http://localhost:3000/blog/saveNewBlog',
                    body:data
                }
                let _result =await ApiCall.PostApiRequest(_request)
                if(_result?.status && _result?.response?.success){
                    // After success form state will be cleared
                    this.$store.state.formState['blogForm']={}
                    // Will be pushed to blogs sreen to view all saved blogs by current user
                    this.$router.push({
                        name:'Blogs'
                    })
                }
            }
        }
    }
</script>

<style >
.create-blog-wrapper{
    background-color: #fff;
    margin: 1rem;
    padding: 1rem;
}
.create-blog-header{
    font-weight: bold;

}
</style>