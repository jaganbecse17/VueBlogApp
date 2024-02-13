<template>
    <div class="Menu-wrapper">
        <ul class="menu-list">
            <!-- Left side menu -->
            <li v-for="list in menus" :key="list" @click="OnClick(list)">{{ list.label }}</li>
        </ul>
        <ul class="menu-list">
            <!-- Right side menu -->
            <li v-for="list in menusRight" :key="list" @click="OnClick(list)">{{ list.label }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                menus:[
                    {
                        label:"Home",
                        link:"/",
                    },
                    {
                        label:"Blogs",
                        link:"/Blogs",
                    },
                    {
                        label:"Create Blog",
                        link:"/CreatBlogs",
                    }
                ]
            }
        },
        computed:{
            // Checking Status for menu bar action buttons
            menusRight(){
                // Show only logout when user logged-in
                if(this.$store.state.profile?.loggedIn){
                    return [{
                        label:"Logout",
                        link:"/",
                        code:"LOGOUT"
                    }]
                }
                // Show when user not logged-in
                else if(!this.$store.state.profile?.loggedIn){
                    return [
                        {
                        label:"Register",
                        link:"/",
                        code:"REGISTER"
                    },
                    {
                        label:"LogIn",
                        link:"/",
                        code:"LOGIN"
                    }]
                }
                return []
            }
        },
        methods:{
            OnClick(list){
                // if logout clear profile data and if any session data store
                if(list?.code=='LOGOUT'){
                    this.$store.state.profile={}
                    // clear seesion storage if any
                }
                if(list?.code=='REGISTER'){
                    // Push to LoginPage with params screen name
                    this.$router.push({
                        name:'LoginPage',
                        params:{
                            screen:"Register"
                        }
                    })
                }
                else if(list?.code=='LOGIN' || list?.code=='LOGOUT'){
                    // Push to LoginPage with params screen name
                    this.$router.push({
                        name:'LoginPage',
                        params:{
                            screen:"Login"
                        }
                    })
                }
                else{
                    this.$router.push(list?.link)
                }
            }
        }
    }
</script>

<style>
.Menu-wrapper{
    background-color: #fff;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
}
.menu-list li{
    display: inline;
    margin: 0 .5rem;
    text-decoration: underline;
    cursor: pointer;
}
</style>