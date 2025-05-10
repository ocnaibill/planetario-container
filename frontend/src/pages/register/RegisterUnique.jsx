import React, { useState, useEffect } from 'react'
import { Country, State, City } from 'country-state-city'
import '../../styles/global.css'
import '../../components/layout/forms.css'
import authService from '../../services/auth.services'
import { cidadesDF } from '../../utils/formOptions'
import styles from './RegisterUnique.module.css'


function RegisterUnique() {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    birthDate: '',
    email: '',
    confirmEmail: '',
    ethnicity: '',
    genre: '',
    nationality: '',
    country: '',
    state: '',
    city: '',
  })
  const [errors, setErrors] = useState({})
  const [countryOptions, setCountryOptions] = useState([])
  const [stateOptions, setStateOptions] = useState([])
  const [cityOptions, setCityOptions] = useState([])

  useEffect(() => {
    setCountryOptions(Country.getAllCountries())
  }, [])

useEffect(() => {
    if (formData.nationality === 'BR') {
      // fixa País = BR e limpa estado/cidade
      setFormData(fd => ({
        ...fd,
        country: 'BR',
        state: '',
        city: ''
      }))
      setStateOptions(State.getStatesOfCountry('BR'))
      setCityOptions([])
    } else {
      // estrangeiros: limpa tudo para escolher país
      setFormData(fd => ({
        ...fd,
        country: '',
        state: '',
        city: ''
      }))
      setStateOptions([])
      setCityOptions([])
    }
  }, [formData.nationality])
  
  useEffect(() => {
    if (formData.nationality && formData.nationality !== 'BR') {
      setFormData(fd => ({
        ...fd,
        state: 'Internacional',
        city: 'Internacional'
      }))
    }
  }, [formData.nationality])

  useEffect(() => {
    if (formData.nationality === 'BR' && formData.state) {
      if (formData.state === 'DF') {
        const dfCidades = cidadesDF.map(cidade => ({ name: cidade }))
        setCityOptions(dfCidades)
      } else {
        const cities = City.getCitiesOfState('BR', formData.state)
        setCityOptions(cities)
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

     if (formData.nationality === 'BR') {
      if (!formData.state)   newErrors.state  = 'Estado é obrigatório';
      if (!formData.city)    newErrors.city   = 'Cidade é obrigatória';
    }
     if (!formData.country) newErrors.country = 'País é obrigatório'
     if (!formData.state) newErrors.state = 'Estado é obrigatório'
     if (!formData.city) newErrors.city = 'Cidade é obrigatória'
     setErrors(newErrors)
     return Object.keys(newErrors).length === 0
   }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validateForm()) return
    try {
      await authService.registrateGuest(formData)
      // ... redirecionar ou notificar ...
    } catch (err) {
      console.error(err)
      alert('Erro ao cadastrar visitante')
    }
  }
  
  return (
    <div className="formContainer">
      <div className="formContent">
        <form onSubmit={handleSubmit} className={`formStyle ${styles.card}`}>
          <h2 className="formTitle">Registro Único</h2>

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
            className="formInput"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="BR">Brasileiro</option>
            <option value="OTHER">Estrangeiro</option>
          </select>

          <label className="formLabel">País:</label>
          <select
            className="formInput"
            name="country"
            value={formData.country}
            onChange={handleChange}
            disabled={formData.nationality === 'BR'}
          >
            <option value="">Selecione o país</option>
            {countryOptions.map(c => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>

        <label className="formLabel">Estado (UF):</label>
          {formData.nationality === 'BR' ? (
            <select
              className="formInput"
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Selecione o estado</option>
              {stateOptions.map(state => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="formInput"
              name="state"
              value={formData.state}
              disabled
            />
          )}

          <label className="formLabel">Cidade:</label>
          {formData.nationality === 'BR' ? (
            <select
              className="formInput"
              name="city"
              value={formData.city}
              onChange={handleChange}
            >
              <option value="">Selecione a cidade</option>
              {cityOptions.map(city => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="formInput"
              name="city"
              value={formData.city}
              disabled
            />
          )}
            

          <button type="submit" className="formButton">Registrar</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterUnique