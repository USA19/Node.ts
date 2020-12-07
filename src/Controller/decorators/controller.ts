import 'reflect-metadata';
import {Router,Request,Response, NextFunction, RequestHandler} from 'express';
import {AppRouter} from '../../AppRouter';
import {Methods} from './Methods';
import {MetaDataKeys} from './MetaDataKeys'

function bodyValidator(keys:string):RequestHandler{
    return function(req:Request,res:Response,next:NextFunction){
        if(!req.body){
            res.status(422).send('invalid request')
            return;
        }

        for(let key of keys){
            if(!req.body[key]){
                res.status(422).send('invalid request')
                return;
            }
        }
        next();
    }
}

export function controller(routePrefix:string){
    const router=AppRouter.getInstance();
return function(target:Function){     
    for(let key in target.prototype){
        const routeHandler=target.prototype[key];
        const path=Reflect.getMetadata(MetaDataKeys.path,target.prototype,key);
        const methods:Methods=Reflect.getMetadata(MetaDataKeys.method,target.prototype,key);
        const middlewares=Reflect.getMetadata(MetaDataKeys.middleware,target.prototype,key)||[];
        const validatorKeys=Reflect.getMetadata(MetaDataKeys.validator,target.prototype,key)||[];

        const validator=bodyValidator(validatorKeys);
        if(path){
            router[methods](`${routePrefix}${path}`,...middlewares,validator,routeHandler);
        }
    }
}
}