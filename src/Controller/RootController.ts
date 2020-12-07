import {Request,Response,NextFunction} from 'express';
import {controller,get,use} from './decorators';

const auth=(req:Request, res:Response, next:NextFunction):void=>{
    if(req.session&&req.session.loggedIn){
        next();
        return;
    }

    res.status(403).send(`not permitted`);
}


@controller('')
class RootController{
    @get('/')
    getRoot(req:Request,res:Response){
        if(req.session&&req.session.loggedIn){
            res.send(`
                <div>
                    You are logged in
                </div>
                <a href="/auth/logout">Logout</a>
            `);
        }
    
        else{
            res.send(`
            <div>
                You are not logged in
            </div>
            <a href="/auth/login">login</a>
        `)
        }
    }

    @get('/protected')
    @use(auth)
    getProtected(req:Request,res:Response){
        res.send( `welcome to protected route, loggedIn user`);
    }

}