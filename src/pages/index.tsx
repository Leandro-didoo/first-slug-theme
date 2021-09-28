import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss';
import { Button, Card, Row, Col, Carousel } from 'react-materialize';
import { Footer } from '../components/Footer';
import { Banner } from '../components/Banner';
import { PageData, AboutType, BannerType, BlogType, CallToActionType, FooterType, Galerytype, InstagramType, ServiceType, SheduleType, TestimonialType, VideoType } from '../types/typesdef';
import { Carrousel } from '../components/Carrosel';
import { Heart, Stars } from '../components/Icons';
import cms from '../services/cms';
if (process.browser) {
  require('materialize-css');
}


type Props = {
  banner: BannerType,
  service: ServiceType,
  about: AboutType,
  callToAction: CallToActionType,
  testimonial: TestimonialType,
  galery: Galerytype,
  video: VideoType,
  instagram: InstagramType,
  blog: BlogType,
  schedule: SheduleType,
  footer: FooterType
}

function Home({ banner, service, about, callToAction, testimonial, galery, video, footer, schedule, instagram, blog}: Props) {
  const srcImagens = galery.data.map(image => image.src)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        {/* <link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection" /> */}

      </Head>
      <header>
        <Banner banner={banner} />
      </header>

      {/* services  */}
      {service.active ? (
        <section
          id="services"
          style={{ backgroundImage: `url(${service.background})` }}
          className={styles.service}
        >
          <div className="container">
            <h2 style={{ color: service.color_title }} className="center-align">Nossos serviços </h2>
            <div className="row">
              {service.services.map((content, index) => {
                return (
                  <div key={index} className="col s12 m4">
                    <div
                      className="card cardService"
                      style={{ backgroundColor: service.card_background }}
                    >
                      <div className="card-content white-text">
                        <div className={styles.containerIco}>
                          <i
                            style={{ color: service.card_color_ico }}
                            className="fas fa-map-signs center-align"
                          ></i>
                        </div>
                        <span
                          className="card-title center-align"
                          style={{ color: service.card_color }}
                        >{content.title}</span>
                        <p style={{ color: service.card_color }} className="center-align">
                          {content.txt}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}


            </div>
            <div className={styles.groupBtnService}>
              <button
                style={{
                  backgroundColor: service.buttonTwo_background,
                  color: service.buttonOne_color
                }}
                className="btn">{service.buttonOne}</button>
              <button
                style={{
                  backgroundColor: service.buttonOne_background,
                  color: service.buttonTwo_color
                }}
                className="btn">{service.buttonTwo}</button>
            </div>
          </div>
        </section>
      ) : ''}

      {/* about */}
      {about.active ? (
        <section
          id="about"
          className={styles.containerAbout}
        >

          <div
            style={{
              backgroundImage: `url(${about.background})`
            }}
            className={styles.about}
          >
            <div className={`container ${styles.contentAbout}`}>
              <div className={styles.item}>
                <h2>{about.title}</h2>
                <h3>{about.subTitle}</h3>
                <div className={styles.aboutTxt} dangerouslySetInnerHTML={{ __html: `${about.txt}` }} />
                <button
                  style={{
                    backgroundColor: about.backgroundButton
                  }}
                  className="btn">{about.button}</button>
              </div>

            </div>
          </div>
          <div
            style={{

            }}
            className={styles.elementPng}>
            <img src={about.imgPng} alt="" />
          </div>
        </section>
      ) : ''}

      {/* call-to-action */}
      {callToAction.active ? (
        <section id="call-to-action"
          className={styles.callToAction}
          style={{
            backgroundImage: `url(${callToAction.background})`
          }}
        >
          <div className="container">
            <div className={styles.content}>
              <h2 style={{ color: callToAction.colorTitle }} className="center-align">{callToAction.title}</h2>
              {callToAction.subTitle.trim.length != 0 && <h3 style={{ color: callToAction.colorTxt }} className="center-align">{callToAction.subTitle}</h3>}
              <div style={{ color: callToAction.colorTxt }} className="center-align" dangerouslySetInnerHTML={{ __html: `${callToAction.txt}` }} />
              {callToAction.button.trim.length != 0 && <button style={{ backgroundColor: callToAction.background_button, color: callToAction.color_button }} className="btn">{callToAction.button}</button>}
            </div>
          </div>

          <div style={{ backgroundColor: callToAction.overlay }} className={styles.overlay} />
        </section>) : ''}

      {/*products  */}
      <section id="products">
        <div className="container">
          <h2 className="center-align">Nossos Produtos</h2>

          <Carrousel />
          <div className="row center">
            <button
              style={{
                borderRadius: '2rem'
              }}
              className="btn">Ver catalogo</button>
          </div>
        </div>

      </section>
      {/* testimonial */}
      {testimonial.active ? (
        <section id="testimonial"
          className={styles.testimonial}
          style={{
            backgroundImage: `url(${testimonial.background})`
          }}
        >
          <div className="container">
            <div className="row">
              <h2 style={{ color: testimonial.colorTitle }} className="center-align">{testimonial.title}</h2>
              <h4 style={{ color: testimonial.colorTitle }} className="center-align">{testimonial.subTitle} <Heart width={20} color="red" /><span></span><Heart width={20} color="red" /><span></span><Heart width={20} color="red" /></h4>
              <div className="row ">
                {testimonial.clients.map((content, index) => {
                  return (
                    <div key={index} className="col s12 m4">
                      <div className="card">
                        <div className={`card-content ${styles.topCard}`}>
                          <div className={styles.imgProfile}>
                            <img className="circle z-depth-1" width="50px" height="50px" src={content.thumbnail} alt="" />
                          </div>
                          <div className={styles.infoProfile}>
                            <p>{content.name}</p>
                            <p>{content.address} </p>
                          </div>
                          <div className={styles.stars}>
                            <Stars width={15} color="#ffff00" />
                            <Stars width={15} color="#ffff00" />
                            <Stars width={15} color="#ffff00" />
                            <Stars width={15} color="#ffff00" />
                            <Stars width={15} color="#ffff00" />
                          </div>
                        </div>
                        <div className="card-content">
                          <div className="center-align" dangerouslySetInnerHTML={{ __html: `${content.description}` }} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>

          </div>
        </section>
      ) : ''}

      {/* gallery */}
      {galery.active ? (
        <section id="gallery"
          className={styles.gallery}
        >
          <div className="container">
            <div className="row center">
              <h2 style={{ color: galery.colorTitle }}>{galery.title}</h2>
              <h4 style={{ color: galery.colorSubTitulo }}>{galery.subtitulo}</h4>
            </div>

            <Carousel
              carouselId="Carousel-31"
              images={
                srcImagens
              }
              options={{
                dist: -100,
                duration: 200,
                fullWidth: false,
                indicators: false,
                noWrap: false,
                numVisible: 5,
                // onCycleTo: null,
                padding: 0,
                shift: 0
              }}
            />
          </div>

        </section>
      ) : ''}

      {/* video */}
      {video.active ? (
        <section id="video"
          style={{
            backgroundImage: `url(${video.background})`
          }}
          className={styles.video}
        >
          <div className="container">
            <div className={`row ${styles.containerVideo}`}>
              <iframe
                src={'https://www.youtube.com/embed/_LUoegLwDYE'}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              >

              </iframe>

            </div>

          </div>

        </section>
      ) : ''}
      {/* instagram */}
      {instagram.active ? (
        <section id="instagram" 
        className={styles.instagram}
        >
          <div className="container">
            <div className="row center">
              <h2 style={{color: instagram.colorTitle}}>{instagram.title}</h2>
              <h4 style={{color: instagram.colorSubTitle}}>{instagram.subtitle}</h4>
            </div>
            <div className="row">
              {instagram.data.map(content =>{
                return(
                  <div key={content.id} className="col s12 m6 l4">
                      <div className={`card ${styles.cardImgInsta}`}>
                        <div className={styles.contentImg}/>
                      </div>
                  </div>
                )
              })}
              
            </div>
          </div>
        </section>
      ) : ''}

      {/* blog */}
      {blog.active? (
         <section id="blog"
         className={styles.blog}
         >
           <div className="container">
             <div className="row center">
              <h2 style={{color: blog.colorTitle}}>{blog.title}</h2>
              <h4 style={{color: blog.colorSubtitle}}>{blog.subTitle}</h4>
             </div>
             <div className="row">
               <Carrousel />

             </div>

           </div>

         </section>
      ):''}
     
      {/*schedule */}
      {schedule.active ? (
        <section id="schedule"
          style={{ backgroundImage: `url(${schedule.background})` }}
          className={styles.shedule}
        >
          <div className="container">
            <div className="row center">
              <h2 style={{ color: schedule.colorTitle }}>{schedule.title}</h2>
              <h4 style={{ color: schedule.colorSubtitle }}>{schedule.subTitle}</h4>
            </div>
            <div className={styles.contentForm}>
              <div className={styles.imgShedule}>
                <img src={schedule.imgPng} alt="" />
              </div>
              <div className={styles.containerForm}>
                <form className="grey lighten-5">
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
                  <input
                    type="tel"
                    name=""
                    id=""
                    placeholder="whatsapp"
                  />
                  <div className="row">
                    <div className="col s6 m6">
                      <input type="date" name="" id="" />

                    </div>
                    <div className="col s6 m6">
                      <input type="datetime" placeholder="Hora" name="" id="" />
                    </div>
                  </div>
                  <textarea
                    placeholder="Descreva seu pedido"
                    name="" ></textarea>
                  <div className={styles.containerBtn}>
                    <button className="btn" type="submit">Enviar</button>
                  </div>


                </form>
              </div>
            </div>
          </div>

        </section>

      ) : ''}

      <Footer content={footer} />
    </div>
  )
}

export default Home
export const getStaticProps: GetStaticProps = async (ctx) => {
  const theme_slug = 'padrao';
  const access_token = 'Q9yLqJ9Xocp4JAd';

  const response = await cms.get(`page/data/${theme_slug}`, {
    headers: { 'access-token': access_token }
  });

  if (!response || !response.data.result) throw new Error('Impossível carregar a página.');
  const page = response.data.response;
  // END:: REQUEST PAGE | BEGIN:: PARSE PAGE
  const page_data = page.datas[0] as PageData;

  let parseElement = {} as any;
  page.elements.forEach((element: { class_name: string, datas: any[] }) => {
    let tempData = element.datas[0] ?? null;
    if (tempData) {
      tempData.data = JSON.parse(tempData.data);
    }
    parseElement[element.class_name] = tempData;
  });

  const elements = parseElement;
  // END:: PARSE PAGE

  const banner = elements.banner.data;
  const service = { ...elements.service.data, active: elements.service.active };
  const about = { ...elements.about.data, active: elements.about.active };
  const callToAction = { ...elements.callToAction.data, active: elements.callToAction.active };
  const products = { ...elements.cms_catalog.data, active: elements.cms_catalog.active };
  const testimonial = { ...elements.testimonial.data, active: elements.testimonial.active };
  const galery = {
    active: false,
    overlay: '#fff',
    title: 'Galeria',
    colorTitle: '#52AA5E',
    subtitulo: 'Veja fotos de nossa galeria',
    background: '',
    colorSubTitulo: '#333',
    txt: '',
    data: [
      {
        id: 0,
        alt: 'txt',
        src: 'galeria1.png'
      },
      {
        id: 1,
        alt: 'txt',
        src: 'galeria2.png'
      },
      {
        id: 2,
        alt: 'txt',
        src: 'galeria3.png'
      }

    ]
  }
  const video = {
    active: false,
    overlay: '#fff',
    title: 'Galeria',
    background: 'gg.png',
    colorTitle: '#52AA5E',
    subtitulo: 'Veja fotos de nossa galeria',
    colorSubTitulo: '#333',
    txt: '',
    src: ''

  }
  const instagram = {
    active: false,
    background: '',
    overlay: '',
    title: 'Instagram',
    colorTitle: '#52AA5E',
    subtitle: 'Siga o Instagram da nossa Empresa',
    colorSubTitle: '#333',
    data: [
      {
        id: 0,
        alt: '',
        src: 'download.png'
      },
      {
        id: 1,
        alt: '',
        src: 'download.png'
      },
      {
        id: 2,
        alt: '',
        src: 'download.png'
      },
      {
        id: 3,
        alt: '',
        src: 'download.png'
      },
      {
        id: 4,
        alt: '',
        src: 'download.png'
      },
      {
        id: 5,
        alt: '',
        src: 'download.png'
      }
    ]
  }
  const blog ={
    active: false,
     background: '',
     ovelay: '',
     title: 'Blog',
     colorTitle: '#52AA5E',
     subTitle: 'Veja Dicas da nossa Empresa ',
     colorSubtitle:'#333',
     data:[
       {
        author: 'Yury',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        created_at: '',
        date_formatted: '',
        excerpt: '',
        id: 0,
        image: 'download.png',
        published: 0,
        slug: '',
        title: 'item 1',
        updated_at: '',
        user_id: 0,
        wallpaper: 'nossos-servicos.png',
       },
       {
        author: 'Yury',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        created_at: '',
        date_formatted: '',
        excerpt: '',
        id: 2,
        image: 'download.png',
        published: 2,
        slug: '',
        title: 'item 2',
        updated_at: '',
        user_id: 0,
        wallpaper: 'nossos-servicos.png',
       },
       {
        author: 'Yury',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        created_at: '',
        date_formatted: '',
        excerpt: '',
        id: 3,
        image: 'download.png',
        published: 3,
        slug: '',
        title: 'item 3',
        updated_at: '',
        user_id: 0,
        wallpaper: 'nossos-servicos.png',
       }
     ]
  }
  const schedule = {
    active: false,
    background: 'profile.jpg',
    overlay: '#fff',
    title: 'Agendar Horário',
    colorSubtitle: '#fff',
    colorTitle: '#fff',
    subTitle: 'Aqui Você Agenda um horário ou apenas faz um contato!',
    imgPng: 'agendar-medico.png',
    button: 'enviar',
    colorButton: '#fff',
    backgroundButton: '#333',
    placheHouder: {
      name: 'nome',
      email: 'email',
      whatsapp: 'whatsapp',
      data: 'data',
      hora: 'hora',
      textarea: 'Descriva seu pedido',
    }
  }
  const footer = {
    backgroundColor: '#3e3ef0',
    address: {
      logradouro: 'Rua: Antônio fonsechi',
      numero: '391',
      bairro: 'Satélite ires 2',
      cep: '130589643',
      cidade: 'Campinas',
      estado: 'sp'
    },
    phoneOne: '19992465788',
    phoneTwo: '19992465788',
    whatsapp: '19992465788',
    email: 'xxxxxx@gmail.com',
    facebook: 'xxxxx',
    instagram: 'xxxx',
    tiktok: 'xxxx',
    colorTxt: '#fff',
  }
  return {
    props: {
      banner,
      service,
      about,
      callToAction,
      testimonial,
      galery,
      video,
      instagram,
      blog,
      schedule,
      footer
    },
    revalidate: 60 * 60 * 8,
  }
}