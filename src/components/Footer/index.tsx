import { FormEvent } from 'react';
import { FooterType } from '../../types/typesdef';
import { Facebook, Instagram, Tiktok, WhatsappIco } from '../Icons';
import style from './style.module.scss';
import Link from 'next/link';

type FooterProps = {
    content: FooterType
}
export const Footer = ({ content }: FooterProps) => {
    return (
        <div style={{ backgroundColor: content.backgroundColor }} className={style.container}>
            <div className="container">
                <div className="row"
                    style={{ color: content.colorTxt }}
                >
                    <div className="col s12 m3">
                        <h5>Acesso Rápido</h5>
                        <ul>
                            <li>
                                <Link href="/">
                                    <a style={{ color: content.colorTxt }} className=" text-lighten-3">Home</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog">
                                    <a style={{ color: content.colorTxt }} className=" text-lighten-3">Blog</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/politica-privacidade">
                                    <a style={{ color: content.colorTxt }} className=" text-lighten-3" >Política de privacidade</a>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col s12 m3">
                        <h5>Endereço</h5>
                        <p className=" text-lighten-4">{content.address_logradouro}</p>
                        <p className=" text-lighten-4">CEP: {content.address_cep}</p>
                        <p className=" text-lighten-4">Cidade: {content.address_cidade} - {content.address_estado}</p>
                    </div>
                    <div className="col s12 m3">


                    </div>

                    <div className="col s12 m3">
                        <h5>Fale conosco</h5>
                        <p className=" text-lighten-4">{content.phoneOne}</p>
                        <p className=" text-lighten-4">{content.phoneTwo}</p>
                        <p className=" text-lighten-4">{content.email}</p>
                        <div className="row" style={{ marginTop: '1rem' }}>
                            <div className="col">
                                {content.facebook ? (
                                    <a href={content.facebook}>
                                        <Facebook width={20} color={content.colorTxt} />
                                    </a>
                                ) : ''}
                            </div>
                            <div className="col">
                                {content.instagram ? (
                                    <a href={content.instagram}>
                                        <Instagram width={20} color={content.colorTxt} />
                                    </a>
                                ) : ''}

                            </div>
                            <div className="col">
                                {content.whatsapp ? (
                                    <a rel="noreferrer" href={`https://api.whatsapp.com/send?phone=${content.whatsapp}`} target="_blank">
                                        <WhatsappIco width={20} color={content.colorTxt} />
                                    </a>
                                ) : ''}

                            </div>
                            <div className="col">
                                {content.tiktok ? (
                                    <a href={content.tiktok}>
                                        <Tiktok width={20} color={content.colorTxt} />
                                    </a>
                                ) : ''}

                            </div>
                        </div>

                    </div>

                </div>
                <hr />
                <div style={{ color: content.colorTxt }} className="row center">
                    <a href="https://www.didoo.app.br/">Criado com Tecnologia Didoo Sistemas Digitais</a>
                </div>
            </div>

        </div >
    )
}