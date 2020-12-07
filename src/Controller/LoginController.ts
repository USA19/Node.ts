import {Request,Response, NextFunction} from 'express';
import {get,controller, post,bodyValidator} from './decorators';





@controller('/auth')
class LoginController{


@get('/login')
getLogin(req:Request,res:Response):void{
    
    res.send(`
    <form method="POST" action="/login">
    <div>
        <label>Email"</label>
        <input type="email" name="email"/>
    </div>
    <div>
        <label>Password"</label>
        <input type="password" name="password"/>
    </div>
    <button type="submit">login</button>
    </form>
        
    `)
}

@post('/login')
@bodyValidator('email','password')
postLogin(req:Request,res:Response){
    const {email,password}=req.body;
   if(email&&password&& email==="hi@hi.com" && password==="1234"){
       req.session={loggedIn:true}
       res.redirect('/');
   }
   else{
       res.send(`
        email Or password is not defined
       `)
   }
}
@get('/logout')
getLogout(req:Request,res:Response){
    req.session={loggedIn:false};
    res.redirect('/auth/login');
}

}



