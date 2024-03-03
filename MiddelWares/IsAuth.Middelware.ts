import User from "../Schemas/User/User.schema";

const isAuth = ((req: { session: { isAuth: any } },res: { send: (arg0: { status: number; message: string }) => void },next: () => void)=>{
   if(req.session.isAuth){
    next()
   }
   else{
    res.send({
        status: 400,
        message:"Session expired please login again"
    })
   }
})

export default isAuth