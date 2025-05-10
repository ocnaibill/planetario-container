package com.undf.sistema_planetario.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
// fala rapeize, bianco aqui, vou falar o que mexi aqui
public class QrCodeService {

    public static String createQrCode(String data, String identification, int height, int width) throws WriterException, IOException {
        BitMatrix matrix = new MultiFormatWriter().encode(data, BarcodeFormat.QR_CODE, width, height);

        // Nova pasta para salvar fora do resources
        String staticPath = "/ticket-" + identification + ".jpg";
        Path folderPath = FileSystems.getDefault().getPath("./qrcodes").toAbsolutePath();

        // Cria a pasta se ela não existir
        if (!folderPath.toFile().exists()) {
            folderPath.toFile().mkdirs();
        }

        Path qrcodePath = folderPath.resolve("ticket-" + identification + ".jpg");
        MatrixToImageWriter.writeToPath(matrix, "JPG", qrcodePath);

        return staticPath;
    }
}