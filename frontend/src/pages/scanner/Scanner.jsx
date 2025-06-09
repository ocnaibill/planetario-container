import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Scanner.module.css';
import '../../styles/global.css';
import '../../components/layout/forms.css';

import { Html5Qrcode } from "html5-qrcode";
import ticketService from '../../services/ticket.services';
import { useUser } from '../../contexts/UserContext';

function Scanner() {
    const { roles, isAuthenticated } = useUser()
    const navigate = useNavigate();

    if (!isAuthenticated || !roles.includes("ROLE_ADMIN")) return navigate('/')

    const scannerRef = useRef(null)
    const readerElement = useRef(null)
    const [errorMessage, setErrorMessage] = useState("Mensagem teste bem grande e legal de erro grandona mesmo.")
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState("Scanning")

    const onSuccess = async (decodedTextType) => {
        scannerRef.current.pause(true)
        readerElement.current.style.display = "none"

        let response
        setLoading(true)
        try {
            response = await ticketService.approveTickect(decodedTextType)

            if (response.status == 202) {
                setStatus("Accepted")
            }
        }
        catch(err) {
            setStatus("Rejected")
            console.warn(err)
            setErrorMessage(err.message)
        }
        setLoading(false)
    }

    const onFailure = (error) => {
    }

    const restartScanning = () => {
        setStatus("Scanning")
        readerElement.current.style.display = "flex"
        scannerRef.current.resume()
    }   
    
    const startScanner = async () => {
        try {
            const devices = await Html5Qrcode.getCameras()
            if(!devices || devices.length === 0) {
                console.warn("Nenhuma câmera encontrada.")
                return
            }

            if (scannerRef.current) {
                await scannerRef.current.clear()
            }

            scannerRef.current = new Html5Qrcode("reader")
            let qrboxFunction = function(viewfinderWidth, viewfinderHeight) {
                let minEdgePercentage = 0.8;
                let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
                let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
                return {
                    width: qrboxSize,
                    height: qrboxSize
                };
            }
    
            await scannerRef.current.start(
                devices[0].id,
                {
                    fps: 5,
                    qrbox: qrboxFunction
                },
                onSuccess,
                onFailure
            )
        } catch (error) {
            console.error("Erro ao iniciar a câmera: ", error)
        }
    }


    useEffect(() => {
        if(loading || status != "Scanning") return

        readerElement.current = document.getElementById("reader")

        const observer = new MutationObserver(() => {
            const video = document.querySelector("#reader video")
            const canvas = document.querySelector("#reader #qr-shaded-region")
            if (video) {
                video.style.borderRadius = '25px'
                canvas.style.borderRadius = '25px'
                observer.disconnect()
            }
        })
    
        observer.observe(readerElement.current, {
            childList: true,
            subtree: true
        })

        return () => {
            observer.disconnect()
        }
    })

    return (
        <div className={styles.scannerContainer}>
            <div className="backgroundGradient"></div>
            <div className="backgroundGradient2"></div>
            <div className="backgroundImage"></div>
            <div className={styles.scannerContent}>
                <div className={styles.scanner} id="reader" >
                    <img src="/assets/activeCamera.svg" alt="ícone de câmera" />
                    <div className={styles.textScanner}>
                        <button onClick={startScanner} className={styles.activeButton}>Ativar Câmera</button>
                        <p>Permita a utilização da sua câmera para começar a leitura.</p>
                    </div>
                </div>

                {loading && (
                    <div className={styles.loadScreen}>
                        <p>Validando Ingresso</p>
                        <div className={styles.loader}></div>
                    </div>
                )}

                {(!loading && status == "Accepted") && (
                    <div className={styles.accepted}>
                        <img src="/assets/acceptedIcon.svg" alt="ícone de câmera" />
                        <p>Validado com sucesso!</p>
                        <button onClick={restartScanning}>Fechar</button>
                    </div>
                )}

                {(!loading && status == "Rejected") && (
                    <div className={styles.rejected}>
                        <p>Erro na validação!</p>
                        <img src="/assets/rejectedIcon.svg" alt="ícone de câmera" />
                        <p>{errorMessage}</p>
                        <button onClick={restartScanning}>Fechar</button>
                    </div>
                )}                    
            </div>
        </div>
    )
}

export default Scanner