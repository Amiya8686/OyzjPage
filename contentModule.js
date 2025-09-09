import {reactive,ref} from "./vue.esm-browser.js"
const contentModule={
    setup(){
        let control = reactive({
            isShowMenus:false
        });
        let content = reactive({
            name:"欧阳樟浚",
            university:"中山大学",
            avatar:"./sources/images/Oyzj.png",
            location:"中国·广东"
        })
        let content_en = reactive({
            name:"Ouyang Zhangjun",
            university:"Sun Yat-sen University",
            avatar:"./sources/images/Oyzj.png",
            location:"GuangDong"
        })
        

        const handleMenus=()=>{
            control.isShowMenus=!control.isShowMenus;
        }

        return {control,content,content_en,handleMenus};
    }
}
export {contentModule} ;