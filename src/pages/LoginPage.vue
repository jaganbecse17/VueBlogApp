<template>
    <div class="login-wrapper">
        <div class="login-form-wrapper">
            <p class="form_header"> {{getScreenFlag?'Login Form':"Register Form"}}</p>
            <input-form :formFields="getFormFields" formName="loginForm" @OnBtnClick="OnBtnClick"></input-form>
        </div>
    </div>
</template>

<script>
// Dynamic importing form component
const InputForm = ()=>import('@/components/InputForm')
import ApiCall from "@/service/index"
    export default {
        components:{
            InputForm
        },
        data(){
            return{
                loginFields:[
                    {
                        label:"User Name",
                        type:"text",
                        key:"userName",
                        className:""
                    },
                    {
                        label:"Password",
                        type:"password",
                        key:"password",
                        className:""
                    },
                    {
                        label:"Login",
                        type:"button",
                        key:"LOGIN",
                        fieldClassName:"submit-btn"
                    }
                ],
                registerFields:[
                    {
                        label:"E-mailId",
                        type:"text",
                        key:"userName",
                        className:""
                    },
                    {
                        label:"Password",
                        type:"password",
                        key:"password",
                        className:""
                    },
                    {
                        label:"Register",
                        type:"button",
                        key:"REGISTER",
                        fieldClassName:"submit-btn"
                    }
                ]
            }
        },
        computed:{
            // Will login fields if true else will true register fields
            getFormFields(){
                if(this.getScreenFlag){
                    return this.loginFields
                }else if(!this.getScreenFlag){
                    return this.registerFields
                }else{
                    return []
                }
                
            },
            // will return flag true if Login else false for register
            getScreenFlag(){
                if(this.$route?.params?.screen=='Login'){
                    return true
                }else if(this.$route?.params?.screen=='Register'){
                    return false
                }else return false
            }
        },
        methods:{
            OnBtnClick(list){
                // Calling function based on Button Key
                if(list?.key=='LOGIN'){
                    this.UserLoginCall(this.$store.state.formState['loginForm'])
                }else if(list?.key=='REGISTER'){
                    this.UserRegisterCall(this.$store.state.formState['loginForm'])
                }
            },
            /*
                Function to Call login api and set profile data in store
            */
            async UserLoginCall(data){
                let _request ={
                    url:'http://localhost:3000/profile/UserLogin',
                    body:data
                }
                let _result =await ApiCall.PostApiRequest(_request)
                console.log("_result",_result)
                if(_result?.status && _result?.response?.success){
                    this.$store.commit("OnUserLogin",_result?.response?.data)
                }
                if(this.$store.state.profile.loggedIn){
                    // Success login will push to home screen
                    this.$store.state.formState['loginForm']={}
                    this.$router.push({name:"HomePage"})
                }
            },
             /*
                Function to Call login api and set profile data in store
            */
            async UserRegisterCall(data){
                let _request ={
                    url:'http://localhost:3000/profile/userRegister',
                    body:data
                }
                let _result =await ApiCall.PostApiRequest(_request)
                if(_result?.status && _result?.response?.success){
                    this.$store.state.formState['loginForm']={}
                    // Will push to login screen after user register
                    this.$router.push({
                        name:'LoginPage',
                        params:{
                            screen:"Login"
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
.login-form-wrapper{
    margin: 5rem;
    background-color: #fff;
    width: fit-content;
}
.login-wrapper{
    display: flex;
    justify-content: center;
}
.form_header{
    padding: .75rem;
    text-align: center;
    font-weight: bold;
    font-size: large;
}
</style>