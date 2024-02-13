<template>
    <div class="form-wrapper">
        <template v-for="list in formFields">
            <div v-if="list.type=='text'" :key="list.key" :class="list.className" class="input-group">
                <label :for="list.label">{{ list.label }}</label><br>
                <input type="text" :name="list.label" v-model="formModal[list?.key]" :class="list?.fieldClassName">
            </div>
            <div v-if="list.type=='textarea'" :key="list.key" :class="list.className" class="input-group">
                <label :for="list.label">{{ list.label }}</label><br>
                <textarea type="textarea" :name="list.label" v-model="formModal[list?.key]" :class="list?.fieldClassName"></textarea>
            </div>
            <div v-if="list.type=='password'" :key="list.key" :class="list.className" class="input-group">
                <label :for="list.label">{{ list.label }}</label><br>
                <input type="password" :name="list.label" v-model="formModal[list?.key]" :class="list?.fieldClassName">
            </div>
            <div v-if="list.type=='button'" :key="list.key" :class="list?.className" class="btn-wrapper input-group">
                <button @click="OnBtnAction(list)" :class="list?.fieldClassName">{{ list.label }}</button>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        props:[
            "formName",
            "formFields"
        ],
        computed:{
            // To set and get values of fields based on key on fields object along the name of form from store
            formModal:{
                set(data){
                     this.$store.state.formState[this.formName]=data
                },
                get(){
                    return this.$store.state.formState[this.formName]
                }
            }
        },
        methods:{
            // Common function for all button action and logic will be handled by parent component
            OnBtnAction(list){
                this.$emit("OnBtnClick",list)
            }
        }
    }
</script>

<style scoped>
.form-wrapper {
    padding: 1rem;
}
.form-wrapper input,.form-wrapper textarea{
    border-radius: 5px;
    outline: none;
    border: 1px solid black;
    padding: 8px;
    margin: 0.25rem;
}
.form-wrapper button{
    padding: .5rem 1rem;
    border-radius: 4px;
    border: none;
}
.form-wrapper button.submit-btn{
    background-color: #2098D1;
    color: white;
}
.form-wrapper label{
    margin-left: 0.25rem;
}
.input-group{
    margin: 1.5rem .75rem;
}
.btn-wrapper{
    display: flex;
    justify-content: center;
}
</style>