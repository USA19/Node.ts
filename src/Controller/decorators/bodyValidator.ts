import 'reflect-metadata'
import {MetaDataKeys} from './MetaDataKeys';


export function bodyValidator(...keys:string[]):Function{
    return function(target:any,key:string,desc:PropertyDecorator){
        Reflect.defineMetadata(MetaDataKeys.validator,keys,target,key);
    }
}