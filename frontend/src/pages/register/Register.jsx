import React, { useState, useEffect } from 'react';
import '../../styles/global.css';
import '../../components/layout/forms.css';
import authService from '../../services/auth.services';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import { cidadesDF } from '../../utils/formOptions'
import styles from './Register.module.css'

function Register() {
    
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    birthDate: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    ethnicity: '',
    genre: '',
    nationality: '',
    country: '',
    state: '',
    city: '',
  });

  const [errors, setErrors] = useState({});
  const [countryOptions, setCountryOptions] = useState([])
  const [stateOptions, setStateOptions]     = useState([])
  const [cityOptions, setCityOptions]       = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    setCountryOptions(Country.getAllCountries())
  }, [])

  // quando muda nacionalidade
  useEffect(() => {
    if (formData.nationality === 'BR') {
      setFormData(fd => ({ ...fd, country: 'BR', state: '', city: '' }))
      setStateOptions(State.getStatesOfCountry('BR'))
      setCityOptions([])
    } else {
      setFormData(fd => ({ ...fd, country: '', state: 'Internacional', city: 'Internacional' }))
      setStateOptions([])
      setCityOptions([])
    }
  }, [formData.nationality])

  // quando muda estado (apenas BR)
  useEffect(() => {
    if (formData.nationality === 'BR' && formData.state) {
      if (formData.state === 'DF') {
        setCityOptions(cidadesDF.map(c => ({ name: c })))
      } else {
        setCityOptions(City.getCitiesOfState('BR', formData.state))
      }
    }
  }, [formData.state, formData.nationality])



  const validateForm = () => {
    const newErrors = {};

    // Validação do nome
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Nome completo é obrigatório';
    } else if (formData.name.length < 5) {
      newErrors.name = 'O nome deve ter pelo menos 5 caracteres';
    } else if (formData.name.length > 100) {
      newErrors.name = 'O nome deve ter no máximo 100 caracteres';
    }

    // CPF obrigatório e com formato válido
    if (!formData.cpf) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!/\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
      newErrors.cpf = 'CPF com formato inválido!';
    }
    
    // Data de nascimento obrigatória e com formato válido
    if (!formData.birthDate) {
      newErrors.birthDate = 'Data de nascimento é obrigatória';
    } else if (!/\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(formData.birthDate)) {
      newErrors.birthDate = 'Data de nascimento com formato inválido!';
    }

    // E-mail obrigatório e formato válido
    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    // Confirmação de e-mail
    if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Os e-mails não coincidem';
    }

    // Senha obrigatória e correspondência de senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      newErrors.password = 'A senha deve ter pelo menos 8 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

     // Etnia obrigatória e deve ser uma delas
     const validEthnicities = ['branca', 'negra', 'parda', 'amarela', 'indígena', 'outra'];
     if (!formData.ethnicity || formData.ethnicity.trim() === '') {
       newErrors.ethnicity = 'Etnia é obrigatória';
     } else if (!validEthnicities.includes(formData.ethnicity)) {
       newErrors.ethnicity = 'Selecione uma etnia válida';
     }
 
     // Gênero obrigatório e deve ser um dentre eles
     const validGenres = ['masculino', 'feminino', 'não-binário', 'outro'];
     if (!formData.genre || formData.genre.trim() === '') {
       newErrors.genre = 'Gênero é obrigatório';
     } else if (!validGenres.includes(formData.genre)) {
       newErrors.genre = 'Selecione um gênero válido';
     }

    // Nacionalidade obrigatória
    if (!formData.nationality) newErrors.nationality = 'Nacionalidade é obrigatória';

    // País obrigatório
    if (!formData.country) newErrors.country = 'País é obrigatório';

    // Estado obrigatório
    if (!formData.state) newErrors.state = 'Estado é obrigatório';

    // Cidade obrigatória
    if (!formData.city) newErrors.city = 'Cidade é obrigatória';

    setErrors(newErrors);

    // Retorna true se não houver erros
    return Object.keys(newErrors).length === 0;
  };

  const cpfMask = (value) => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }

  const handleChange = (e) => {
    if(e.target.name == "cpf") {
      setFormData({ ...formData, [e.target.name]:  cpfMask(e.target.value)});
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(validateForm()) {
        let res = await authService.registrateUser(formData)
        // storageService.setLoggedUser(res.data);
        navigate('/');
        // setUser(storageService.getLoggedUser());
      }
    }
    catch (error)  {
      console.error(error)
      alert("Erro ao cadastrar")
    }
  };
  
  return (
    <div className="formContainer">
      <div className="formContent">
        <form onSubmit={handleSubmit} className={`formStyle ${styles.card}`}>
          <h2 className="formTitle">Cadastro</h2>

          <label className="formLabel">Nome completo:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="formInput" 
          />
          {errors.name && <p className="errorText">{errors.name}</p>}

          <div className="formRow">
            <div className="formColumn">
              <label className="formLabel">CPF:</label>
              <input 
                type="text" 
                name="cpf" 
                maxLength='14'
                value={formData.cpf} 
                onChange={handleChange} 
                className="formInput" 
              />
              {errors.cpf && <p className="errorText">{errors.cpf}</p>}
            </div>
            
            <div className="formColumn">
              <label className="formLabel">Data de nascimento:</label>
              <input 
                type="date" 
                name="birthDate" 
                value={formData.birthDate} 
                onChange={handleChange} 
                className="formInput" 
              />
              {errors.birthDate && <p className="errorText">{errors.birthDate}</p>}
            </div>
            
          </div>

          <label className="formLabel">E-mail:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="formInput" 
          />
          {errors.email && <p className="errorText">{errors.email}</p>}

          <label className="formLabel">Confirme seu E-mail:</label>
          <input 
            type="email" 
            name="confirmEmail" 
            value={formData.confirmEmail} 
            onChange={handleChange} 
            className="formInput" 
          />
          {errors.confirmEmail && <p className="errorText">{errors.confirmEmail}</p>}

          <label className="formLabel">Senha:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            className="formInput" 
          />
          {errors.password && <p className="errorText">{errors.password}</p>}

          <label className="formLabel">Confirme sua Senha:</label>
          <input 
            type="password" 
            name="confirmPassword" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            className="formInput" 
          />
           {errors.confirmPassword && <p className="errorText">{errors.confirmPassword}</p>}

          <label className="formLabel">Etnia:</label>
          <select 
            name="ethnicity" 
            value={formData.ethnicity} 
            onChange={handleChange} 
            className="formInput"
          >
            <option value="">Selecione sua etnia</option>
            <option value="branca">Branca</option>
            <option value="negra">Negra</option>
            <option value="parda">Parda</option>
            <option value="amarela">Amarela</option>
            <option value="indígena">Indígena</option>
            <option value="outra">Outra</option>
          </select>
          {errors.ethnicity && <p className="errorText">{errors.ethnicity}</p>}

          <label className="formLabel">Gênero:</label>
          <select 
            name="genre" 
            value={formData.genre} 
            onChange={handleChange} 
            className="formInput"
          >
            <option value="">Selecione seu gênero</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="não-binário">Não-binário</option>
            <option value="outro">Outro</option>
          </select>
          {errors.genre && <p className="errorText">{errors.genre}</p>}

          <label className="formLabel">Nacionalidade:</label>
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="formInput"
          >
            <option value="">Selecione</option>
            <option value="BR">Brasileiro</option>
            <option value="OTHER">Estrangeiro</option>
          </select>
          {errors.nationality && <p className="errorText">{errors.nationality}</p>}

          <label className="formLabel">País:</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            disabled={formData.nationality === 'BR'}
            className="formInput"
          >
            <option value="">Selecione o país</option>
            {countryOptions.map(c => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.country && <p className="errorText">{errors.country}</p>}

          <label className="formLabel">Estado (UF):</label>
          {formData.nationality === 'BR' ? (
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="formInput"
            >
              <option value="">Selecione o estado</option>
              {stateOptions.map(s => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              name="state"
              value={formData.state}
              disabled
              className="formInput"
            />
          )}
          {errors.state && <p className="errorText">{errors.state}</p>}

          <label className="formLabel">Cidade:</label>
          {formData.nationality === 'BR' ? (
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="formInput"
            >
              <option value="">Selecione a cidade</option>
              {cityOptions.map(c => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              name="city"
              value={formData.city}
              disabled
              className="formInput"
            />
          )}
          {errors.city && <p className="errorText">{errors.city}</p>}

          <button type="submit" className="formButton">Registrar</button>
        </form>
      </div>
    </div>
  )
}

export default Register