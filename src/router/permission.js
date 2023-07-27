import router from "./index"
import store from "../store"

router.beforeEach((to,from,next) =>{
    if(to.meta.isLogin){
        const token = store.state.loginModule.user.token;
        if(token){
            next();
        }else{
            next({
                path:"/login"
            })
        }
    }else{
        next();
    }
})