/**
 * 网络请求地址
 */

const base = {
    iwenBaseUrl:"/iwen_api",
    baseUrl:"/api",
    loginUrl:"/api/login",
    register:"/api/register",
    projectList:"/api/backend/item/selectTbItemAllByPage",
    total:"/api/total", // 商品总条数据
    categoryUrl:"/api/backend/itemCategory/selectItemCategoryByParentId", // 类目选择地址
    productAdd:"/api/backend/item/insertTbItem", // 商品添加
    search:"/api/search", // 商品查询
    deleteProject:"/api/backend/item/deleteItemById", // 商品删除
    preUpdate:"/api/backend/item/preUpdateItem", // 预更新
    updateProject:"/api/backend/item/updateTbItem", // 修改商品
    preCategory:"/api/preCategory", // 预更新 类目选择
    paramsList:"/api/backend/itemParam/selectItemParamAll", // 规格参数列表
    paramsSearch:"/api/params/search", // 规格参数模糊查询
    paramsAdd:"/api/backend/itemParam/insertItemParam", // 规格参数添加
    categoryData:"/api/category/data", // 添加商品类目数据获取
    updateCategory:"/api/update/category", // 修改规格参数
    paramsDel:"/api/params/delete", // 规格参数删除
    contentList:"/api/content/selectContentCategoryByParentId", // 内容分类管理的查询
    contentAdd:"/api/content/insertContentCategory", // 内容分类管理添加子导航
    contentUpdate:"/api/content/updateContentCategory", // 内容分类管理修改子导航
    contentDel:"/api/content/deleteContentCategoryById", // 内容分类管理删除子导航
    contentInfoList:"/api/content/selectTbContentAllByCategoryId", // 内容分类管理 内容查询
    contentInfoDel:"/api/content/deleteContentByIds", // 内容分类管理 内容删除
    contentInfoAdd:"/api/content/insertTbContent", // 内容分类管理 内容添加
}

export default base