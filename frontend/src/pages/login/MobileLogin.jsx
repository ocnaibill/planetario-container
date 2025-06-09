import React, { useState } from 'react';
import '../../styles/global.css';
import '../../components/layout/forms.css';
import styles from './MobileLogin.module.css';
import Toast from '../../utils/toast';

import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useUser()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // E-mail obrigatório e formato válido
    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    // Senha obrigatória e correspondência de senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await login(email, password)
      Toast.success("Login realizado com sucesso!")
      navigate('/')
    }
    catch (errData)  {
      Toast.error(errData.error)
    }
  };
  
  return (
    <div className={styles.loginContainer}>

      <div className={styles.loginContent}>
        <form onSubmit={handleSubmit} className={`formStyle ${styles.loginBox}`}>
          <h2 className="formTitle">Login</h2>

          <label className="formLabel">E-mail:</label>
          <input 
            type="email" 
            name="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className="formInput" 
          />
          {errors.email && <p className="errorText">{errors.email}</p>}

          <label className="formLabel">Senha:</label>
          <input 
            type="password" 
            name="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="formInput" 
          />
          {errors.password && <p className="errorText">{errors.password}</p>}
          {/* <a href="#" className={styles.passwordLost}>Esqueceu sua senha?</a> */}
          <button type="submit" className="formButton">Entrar</button>

          <p className={styles.registerPrompt}>
            Não possui cadastro? <span className={styles.gradientLink} onClick={() => navigate('/registro')}> Faça agora mesmo aqui!</span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
