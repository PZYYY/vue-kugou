/*
* @Author: peng
* @Date:   2017-08-20 18:31:56
* @Last Modified by:   peng
* @Last Modified time: 2017-08-20 18:42:33
*/

'use strict';
//接口配置

//把全体接口封装在的前端配置文件（序号与接口文档一一对应），多个环境配置时可快速切换整站式的全部接口，不用逐个页面去改。
const config = require('../../config');

let url = {
    apiUrl: "/ccp-web/api", //接口路径
    //ctxPath: "/ccp-web/dist", //tomcat服务dist目录
    ctxPath: "/dist", //node服务dist目录

    //staticPath:config.dev.staticPath,       //开发环境静态资源路径  
    staticPath: process.env.NODE_ENV !== 'development' ?  config.build.staticPath: config.dev.staticPath
};

//----------------请注意：如果正式环境，不需要本地json数据模拟，请删除以上代码和api中的模拟接口。----------------


export const api = {
            "getList":url.staticPath+"../../static/jsons/songList.json",
            "getRank":url.staticPath+"../../static/jsons/rankSongs.json",
            "getOther":url.staticPath+"../../static/jsons/other.json",
            "getCollect":url.staticPath+"../../static/jsons/collect.json",
            "getLove":url.staticPath+"../../static/jsons/love.json"
    }
    

export default api
