import 'reflect-metadata';
import {MetaDataKeys} from './MetaDataKeys';
import {RequestHandler} from 'express';


export function use(middleware:RequestHandler):Function{
    return function(target:any,key:string,desc:PropertyDecorator){
        const middlewares=Reflect.getMetadata(MetaDataKeys.middleware,target,key)||[];
        middlewares.push(middlewares);
        Reflect.defineMetadata(MetaDataKeys.middleware,target,key);
    }
}
