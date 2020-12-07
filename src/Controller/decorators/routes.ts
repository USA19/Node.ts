import 'reflect-metadata';
import {Methods} from './Methods'; 
import {MetaDataKeys} from './MetaDataKeys'
import {RequestHandler} from 'express'

interface RouteHandlerDiscriptor extends PropertyDescriptor{
value?:RequestHandler
}

function bindRoutes(method:string){
return function(path:string){
        return function(target:any,key:string,desc:RouteHandlerDiscriptor){
             //LoginController.prototype, getLogin,
            Reflect.defineMetadata(MetaDataKeys.path,path,target,key);
            //it will set the path key of property path on prototype object of LoginController which is getLogin
            Reflect.defineMetadata(MetaDataKeys.method,method,target,key);
        }
}

}


export const get=bindRoutes(Methods.get);
export const post=bindRoutes(Methods.post);
export const put=bindRoutes(Methods.put);
export const del=bindRoutes(Methods.del);
export const patch=bindRoutes(Methods.patch);
