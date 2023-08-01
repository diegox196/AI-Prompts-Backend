const sendResetPasswordEmail = async (email, verificationToken) => {
  /*try {
    const mailOptions = {
      from: 'your_gmail_username@gmail.com', // Remitente del correo (debe ser el mismo correo de configuración)
      to: email, // Correo de destino (correo a verificar)
      subject: 'Verificación de correo electrónico', // Asunto del correo
      html: `<p>Hola,</p>
             <p>Gracias por registrarte en nuestro sitio. Por favor, haga clic en el siguiente enlace para verificar su correo electrónico:</p>
             <p><a href="http://localhost:3000/reset-password?email=${email}&auth_token=${verificationToken}">Verificar correo electrónico</a></p>
             <p>Si no se registró en nuestro sitio, puede ignorar este mensaje.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Correo electrónico de verificación enviado con éxito.');
  } catch (error) {
    console.error('Error al enviar el correo electrónico de verificación:', error);
  }*/
  console.log(`http://localhost:3000/reset-password?email=${email}&auth_token=${verificationToken}`);
};

module.exports = sendResetPasswordEmail;