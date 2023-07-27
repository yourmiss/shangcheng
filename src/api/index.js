/**
 * 网络请求的方法
 */
import axios from "../utils/request"
import base from "./base"

const api = {
    /**
     * 登陆
     */
    login(params) {
        return axios.post(base.baseUrl + base.loginUrl, params);
    },

    /**
     * 注册
     */
    register(params) {
        return axios.post(base.baseUrl + base.register, params)
    },
    /**
     * 商品列表查询
     */
    projectList(params) {
        return axios.get(base.baseUrl + base.projectList, {
            params
        })
    },
    /**
     * 商品数据总条数
     */
    total() {
        return axios.get(base.baseUrl + base.total)
    },
    /**
     * 类目选择
     */
    category(params) {
        return axios.get(base.baseUrl + base.categoryUrl, {
            params
        })
    },
    /**
     * 商品添加
     */
    productAdd(params) {
        return axios.get(base.baseUrl + base.productAdd, {
            params
        })
    },
    /**
     * 商品查询
     */
    search(params) {
        return axios.get(base.baseUrl + base.search, {
            params
        })
    },
    /**
     * 删除商品
     */
    deleteProject(params) {
        return axios.get(base.baseUrl + base.deleteProject, {
            params
        })
    },
    /**
     * 预更新
     */
    preUpdate(params) {
        return axios.get(base.baseUrl + base.preUpdate, {
            params
        })
    },
    /**
     * 修改商品
     */
    updateProject(params) {
        return axios.get(base.baseUrl + base.updateProject, {
            params
        })
    },
    /**
     * 预更新类目选择
     */
    preCategory(params) {
        return axios.get(base.baseUrl + base.preCategory, {
            params
        })
    },
    /**
     * 规格参数查询
     */
    paramsList(params) {
        return axios.get(base.baseUrl + base.paramsList, {
            params
        })
    },
    /**
     * 规格参数 模糊查询
     */
    paramsSearch(params) {
        return axios.get(base.baseUrl + base.paramsSearch, {
            params
        })
    },
    /**
     * 规格参数 添加
     */
    paramsAdd(params) {
        return axios.get(base.baseUrl + base.paramsAdd, {
            params
        })
    },
    /**
     * 添加产品类目获取数据
     */
    categoryData(params) {
        return axios.get(base.baseUrl + base.categoryData, {
            params
        })
    },
    /**
     * 修改规格参数内容
     */
    updateCategory(params) {
        return axios.get(base.baseUrl + base.updateCategory, {
            params
        })
    },
    /**
     * 规格参数删除
     */
    paramsDel(params) {
        return axios.get(base.baseUrl + base.paramsDel, {
            params
        })
    },
    /**
     * 内容分类管理 查询 
     */
    contentList(params) {
        return axios.get(base.baseUrl + base.contentList, {
            params
        })
    },
    /**
     * 内容分类管理 添加
     */
    contentAdd(params){
        return axios.get(base.baseUrl + base.contentAdd, {
            params
        })
    },
    /**
     * 内容分类管理 修改
     */
    contentUpdate(params){
        return axios.get(base.baseUrl + base.contentUpdate, {
            params
        })
    },
    /**
     * 内容分类管理 删除
     */
    contentDel(params){
        return axios.get(base.baseUrl + base.contentDel, {
            params
        })
    },
    /**
     * 内容分类管理 内容查询
     */
    contentInfoList(params){
        return axios.get(base.baseUrl + base.contentInfoList, {
            params
        })
    },
    /**
     * 内容分类管理 内容删除
     */
    contentInfoDel(params){
        return axios.get(base.baseUrl + base.contentInfoDel, {
            params
        })
    },
    /**
     * 内容分类管理 内容添加
     */
    contentInfoAdd(params){
        return axios.get(base.baseUrl + base.contentInfoAdd, {
            params
        })
    }
}

export default api;