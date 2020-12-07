import {Router,Request,Response, NextFunction} from 'express';

interface RequestBody extends Request{
    body:{[key:string]:string|undefined
            }
        }

const auth=(req:RequestBody,res:Response, next:NextFunction):void=>{
    if(req.session&&req.session.loggedIn){
        next();
        return;
    }

    res.status(403).send(`not permitted`);
}

const router=Router();

router.get('/',(req:RequestBody,res:Response)=>{
    if(req.session&&req.session.loggedIn){
        res.send(`
            <div>
                You are logged in
            </div>
            <a href="/logout">Logout</a>
        `);
    }

    else{
        res.send(`
        <div>
            You are not logged in
        </div>
        <a href="/login">login</a>
    `)
    }
})
router.get('/login',(req:Request,res:Response)=>{
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
});


router.post('/login',(req:RequestBody,res:Response)=>{
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
})


router.get('/logout',(req:RequestBody,res:Response)=>{
    req.session={loggedIn:false};
    res.redirect('/');
})


router.get('/protected',auth,(req:RequestBody,res:Response)=>{
    res.send( `welcome to protected route, loggedIn user`);
});


export default router;

