import PasswordService from "../../Services/recovering.Servicio.js"


export const passwordController = {
    forgetpassword : async(req,res)=>{
        const {email} = req.body

        const user = await PasswordService.findUserToEmail(email);

        if(!user){
            return res.send("El correo electrónico no está registrado")
        }

        const recoveringToken = PasswordService.generateTokenUnic()
        user.recoveringToken = recoveringToken
        user.expirationToken = new Date(Date.now() + 3600000);

        await user.save()

        const send = await PasswordService.sendEmailRecovering(email,recoveringToken)

        if ( send){
            res.send("Correo electrónico enviado correctamente. Por favor revisa tu bandeja de entrada, spam o promociones.")
        }else{
            res.status(500).send("Error al enviar correo electrónico")
        }
    },

    recoveringPassword : async ( req,res)=>{
        const {token} = req.params;
        const {newPassword} = req.body

        const success = await PasswordService.UpdatePassword(token,newPassword)

        if(success){
            res.send("restablecimiento de contraseña exitoso ")
        }else{
            res.status(400).send("El token caduca o no es válido")
        }
    }
    
}

