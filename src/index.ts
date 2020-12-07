import express,{Request,Response} from 'express';
// import loginRoutes from './Routes/loginRoutes';
import cookieSession from 'cookie-session';

import {AppRouter} from './AppRouter';
import './Controller/LoginController';
import './Controller/RootController';

const app=express();

app.use(express.urlencoded({extended:true}));
app.use(cookieSession({keys:['akjsjchasjch']}));
// app.use(loginRoutes);
app.use(AppRouter.getInstance());
app.listen(3000,()=>{
    console.log('listening on port 3000');
})