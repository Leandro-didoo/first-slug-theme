import { FormEvent } from 'react'
import { FooterType } from '../../types/typesdef'
import { Facebook, Instagram, Tiktok, WhatsappIco } from '../Icons'
import style from './style.module.scss'

type FooterProps ={
    content: FooterType
}
export const Footer = ({content}:FooterProps) => {

    function handlNewLester(event: FormEvent){
        event.preventDefault();
    }
    return (
        <div style={{ backgroundColor: 'blue' }} className={style.container}>
            <div className="container">
                <div className="row" 
                style={{color: content.colorTxt}}
                >
                    <div className="col s12 m3">
                        <h5>Acesso Rápido</h5>
                        <ul>
                            <li> <a style={{color: content.colorTxt}} className=" text-lighten-3" href="#!">Link 1</a></li>
                            <li> <a style={{color: content.colorTxt}} className=" text-lighten-3" href="#!">Link 2</a></li>
                            <li> <a style={{color: content.colorTxt}} className=" text-lighten-3" href="#!">Link 3</a></li>
                        </ul>
                    </div>
                    <div className="col s12 m3">
                        <h5>Endereço</h5>
                        <p className=" text-lighten-4">{content.address_logradouro}</p>
                        <p className=" text-lighten-4">CEP: {content.address_cep}</p>
                        <p className=" text-lighten-4">CEP: {content.address_cidade} - {content.address_estado}</p>
                    </div>
                    <div className="col s12 m3">
                        <h5>Fale conosco</h5>
                        <p className=" text-lighten-4">{content.phoneOne}</p>
                        <p className=" text-lighten-4">{content.phoneTwo}</p>
                        <div className="row">
                            <div className="col">
                               <Facebook width={20} color={content.colorTxt} />
                            </div>
                            <div className="col">
                                <Instagram width={20} color={content.colorTxt} />
                            </div>
                            <div className="col">
                                <WhatsappIco width={20} color={content.colorTxt} />
                            </div>
                            <div className="col">
                                <Tiktok  width={20} color={content.colorTxt}/>
                            </div>
                        </div>

                    </div>
                    <div className="col s12 m3">
                        <h5>Receba nossas novidades</h5>
                        <form onSubmit={handlNewLester}>
                            <input
                                type="text"
                                name=""
                                id=""
                                placeholder="nome"
                            />
                            <input
                                type="email"
                                name=""
                                id=""
                                placeholder="e-mail"
                            />
                            <button style={{backgroundColor: 'transparent', border: 'none', color: content.colorTxt}} type="submit">Enviar</button>
                        </form>

                    </div>
                
                </div>
                <hr />
                <div style={{color: content.colorTxt}} className="row center">
                    <p>Criado com Tecnologia Didoo Sistemas Digitais</p>
                </div>
            </div>

        </div >
    )
}