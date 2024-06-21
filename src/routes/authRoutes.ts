import express , {Application , Request , Response , Router} from 'express';
const router : Router = express.Router();



router.get('/google',(req : Request ,res : Response)=>{
    console.log("Hello");
});

export default router;