import React, { useState, useEffect } from "react";
// import authService from "../services/auth.services";
// import storageService from "../services/storage.services";

function Perfil() {
    // const [dataFromBackend, setDataFromBackend] = useState(null); // Estado para armazenar a resposta do backend
    // const config = {headers: { Authorization: `Bearer ${storageService.getLoggedUser()["token"]}` }}

    // useEffect(() => {

    //     const handleSubmit = async (e) => {
    //         try {
    //           let res = await authService.getData(config)
    //           console.log(res)
    //           setDataFromBackend(res)
    //           storageService.setLoggedUser(res);
              
    //         }
    //         catch (error)  {
    //           console.log(error)
    //         }
    //     };
    //     handleSubmit()
    // }, []);

    return (
        <div>
            <h1>Dados atualizados com sucesso!</h1>
        </div>
    );
}

export default Perfil;