import { FormEvent, useRef, useState } from 'react';
import cms from '../../services/cms';
import styles from './style.module.scss';

interface ModalLoginLeadProps{
  isOpen: boolean;
  closeModal: () => void;
  handleStorageLead: (lead: any, refreshComments?: boolean) => void;
  owner_id: number;
}
export function ModalLoginLead({
  isOpen,
  closeModal,
  handleStorageLead,
  owner_id
}: ModalLoginLeadProps){
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const divResult = useRef<HTMLDivElement>(null);
  const divEmail = useRef<HTMLDivElement>(null);

  function handleLeadSubmit(event: FormEvent){
    event.preventDefault();

    if(isRegister) handleRegister();
    else handleLogin();
  }

  async function handleLogin(){
    const data = new FormData();

    data.append('email', email);
    data.append('owner_id', String(owner_id));

    cms.post(`/post-lead/login`, data).then(response => {
      const data = response.data;
      if(data.result){
        handleStorageLead(data.response);
        handleResult('Logado com Sucesso');

        closeModal();
      }
      else{
        if(divEmail && divEmail.current){
          divEmail.current.classList.add(styles.hasError);
          
          const children = divEmail.current.children;
          if(children.length == 2){
            children[2].innerHTML = data.response;
          }

          setTimeout(function(){
            if(!divEmail || !divEmail.current) return;
            divEmail.current.classList.remove(styles.hasError);
          }, 3500);
        }
      }
    }).catch(function(){
      handleResult('Houve um erro ao enviar o seu login','fail');
    });
  }
  async function handleRegister(){
    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('owner_id', String(owner_id));

    cms.post(`/post-lead/store`, data).then(response => {
      const data = response.data;
      if(data.result){
        handleStorageLead(data.response);
        handleResult('Cadastrado com Sucesso');

        closeModal();
      }
      else handleResult(data.response, 'fail');
    }).catch(function(){
      handleResult('Houve um erro ao enviar o seu cadastro', 'fail');
    });
  }

  function handleResult(response: string, type: 'success' | 'fail' = 'success'){
    if(!divResult || !divResult.current) return;

    divResult.current.innerHTML = response;
    if(type == 'success'){
      divResult.current.classList.remove(styles.alertFail);
      divResult.current.classList.add(styles.alertSuccess);
    }else{
      divResult.current.classList.remove(styles.alertSuccess);
      divResult.current.classList.add(styles.alertFail);
    }
    divResult.current.style.display = 'block';

    if(type == 'fail') setTimeout(function(){
      if(divResult && divResult.current) divResult.current.style.display = 'none';
    }, 5500);
  }

  if(!isOpen) return <></>;
  return(
    <div className={styles.modalLoginLead}>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <header>Login</header>
          <section>
            <form onSubmit={event => handleLeadSubmit(event)}>
              <div className={styles.loginLeadResult} ref={divResult}></div>
              {isRegister ? (
                <div className={`${styles.formGroup} ${styles.divLoginLeadName}`}>
                  <input
                    type="text"
                    className={`${styles.loginLeadName} ${styles.formControl}`}
                    placeholder="Nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                  <span className={styles.errorMessage}>O nome é obrigatório</span>
                </div>
              ) : ''}
              <div className={styles.formGroup} ref={divEmail}>
                <input
                  type="email"
                  className={`${styles.loginLeadEmail} ${styles.formControl}`}
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <span className={styles.errorMessage}>Email não encontrado!</span>
              </div>
              {isRegister ? (
                <button type="submit" className={styles.btnSubmit}>Cadastrar</button>
              ):(
                <button type="submit" className={styles.btnSubmit}>Entrar</button>
              )}
              {isRegister ? (
                <a
                  href="javscript:;"
                  onClick={() => setIsRegister(false)}
                  className={styles.btnLoginLeadRegister}
                >x</a>
              ):(
                <a
                  href="javscript:;"
                  onClick={() => setIsRegister(true)}
                  className={styles.btnLoginLeadRegister}
                  style={{
                    fontSize: '0.7rem',
                    color: 'rgb(136, 136, 136)',
                    marginTop: '.4rem'
                  }}
                >Não sou cadastrado</a>
              )}
            </form>
          </section>
          <button className={styles.closeModal} type="button" onClick={closeModal}>x</button>
        </div>
      </div>
    </div>
  );
}