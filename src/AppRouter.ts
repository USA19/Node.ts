import express from 'express';

// the purpose is to use single router in the entire application
export class AppRouter{
    private static instance:express.Router;

   static getInstance():express.Router{
        if (!AppRouter.instance){
            AppRouter.instance=express.Router()
        }
        return AppRouter.instance;
    }
}