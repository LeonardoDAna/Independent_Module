import Vue from 'vue';
export default new Vue({
    data(){
        return {
            massage:null,
        }
    },
    created () {
        // 绑定监听
        this.$on('chosenStu_Info', (val)=>{
          this.massage = val
        })
    }
});