import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss';
import { Button, Card, Row, Col, Carousel, Modal } from 'react-materialize';
import { Footer } from '../components/Footer';
import { Banner } from '../components/Banner';
import { PageData, AboutType, BannerType, BlogType, CallToActionType, FooterType, Galerytype, InstagramType, ServiceType, SheduleType, TestimonialType, VideoType, Products, JivochatType } from '../types/typesdef';
import { CardContent, Carrousel } from '../components/Carrosel';
import { ChevronDoubleUp, Heart, Stars } from '../components/Icons';
import cms from '../services/cms';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
import { Nav } from '../components/Nav';
import { CardProdutct } from '../components/CardProduct';
import { CardBlog } from '../components/CardBlog';
import { FormEvent, useState } from 'react';
import { Whatsapp } from '../components/Whatsapp';
if (process.browser) {
  const M = require('materialize-css');
}

type Props = {
  page_data: PageData,
  banner: BannerType,
  service: ServiceType,
  about: AboutType,
  callToAction: CallToActionType,
  products: Products,
  testimonial: TestimonialType,
  galery: Galerytype,
  video: VideoType,
  instagram: InstagramType,
  blog: BlogType,
  schedule: SheduleType,
  footer: FooterType,
  jivochat: JivochatType
}

function Home({
  page_data,
  banner,
  service,
  about,
  callToAction,
  products,
  testimonial,
  galery,
  video,
  footer,
  schedule,
  instagram,
  blog,
  jivochat
}: Props) {

  const srcImagens = galery.data.map(image => image.name)
  const [scroll, setScroll] = useState(0);

  // START: SHEDULE
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [data, setData] = useState('');
  const [hour, setHour] = useState('');
  const [mesage, setMesage] = useState('');
  // END: SHEDULLE

  const animeScroll = () => {
    const windowTop = window.pageYOffset;
    setScroll(windowTop)
  }
  if (process.browser) {
    window.addEventListener('scroll', () => {
      animeScroll();
    })
  }
  const notify = () => toast("Enviado com sucesso!");
  function handleShedule(event: FormEvent) {
    let phone = footer.whatsapp;
    event.preventDefault();
    let userMessage = ` *NOME:* ${name} \n\n*E-MAIL:* ${email}\n\n*DATA:* ${data}\n\n*HORÁRIO:* ${hour}\n\n*MENSAGEM:* \n\n ${mesage}`
    userMessage = window.encodeURIComponent(userMessage);
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${userMessage}`)
    notify()
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>{page_data.title}</title>
        <meta name="description" content={page_data.metadescription} />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />
        <link rel="icon" href={page_data.icon ?? "/favicon.ico"} />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        {/* <link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection" /> */}
        {jivochat.active && jivochat.widget && jivochat.widget.trim() ? (
          <script src={`//code-sa1.jivosite.com/widget/${jivochat.widget}`} async></script>
        ) : ''}
      </Head>
      <header id="inicio">
        <Banner banner={banner} >
          <Nav
            color="#333"
            colorTxt=""
            logo={<a className="brand-logo" href="#">Logo</a>}
          >
            {service.active && <li><a href="#services">Serviços</a></li>}
            {about.active && <li><a href="#about">sobre</a></li>}
            {products.active && <li><a href="#products">produtos</a></li>}
            {galery.active && <li><a href="#gallery">galeria</a></li>}
            {blog.active && <li>
              <Link href="/blog">
                <a>blog</a>
              </Link>
            </li>}
            <li><a href="#schedule">contato</a></li>
            <li><a style={{ borderRadius: '2rem', backgroundColor: banner.button_background, color: banner.button_color }} href="#schedule" className="btn">Agendar horario</a></li>
          </Nav>
        </Banner>
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
          <div style={{ backgroundColor: service.overlay }} className="overlay" />
        </section>
      ) : ''}

      {/* about */}
      {about.active ? (
        <section
          id="about"
          className={styles.containerAbout}
        >
          <div className="container">
            <div className="row">

              <div className="col s12 m6">
                <div className={styles.itemLeft}>
                  <div
                    style={{
                      backgroundImage: `url(${about.imgPng})`
                    }}
                    className={styles.item}>

                  </div>
                </div>
              </div>
              <div className="col s12 m6">
                <div className={styles.itemRigth}>
                  <div className={styles.item}>
                    <h2 style={{color: 'white'}}>{about.title}</h2>
                    <h3  style={{color: 'white'}}>{about.subTitle}</h3>
                    <div  style={{color: 'white'}} className={styles.aboutTxt} dangerouslySetInnerHTML={{ __html: `${about.txt}` }} />
                    <button style={{ backgroundColor: about.backgroundButton }}
                      className="btn">{about.button}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div style={{ backgroundImage: `url(${about.background})` }} className={styles.bkgAbout} />

          {/* <div style={{backgroundColor: about.about}} className="overlay"/> */}

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


          <div style={{ backgroundColor: callToAction.overlay }} className="overlay" />
        </section>) : ''}
      {/*products  */}
      {products.active ? (
        <section id="products">
          <div className="container">
            <h2 className="center-align">Nossos Produtos</h2>
            <Carrousel qtd={products.data.length}>
              {products.data.map(content => {
                return (
                  <CardContent key={content.id}>
                    <CardProdutct product={content} />
                  </CardContent>
                )
              })}
            </Carrousel>
            <div className="row center">
              <button style={{ borderRadius: '2rem' }}
                className="btn">Ver catalogo</button>
            </div>
          </div>
          <div style={{ backgroundColor: products.overlay }} className="overlay" />
        </section>

      ) : ''}

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
          <div style={{ backgroundColor: testimonial.overlay }} className="overlay" />
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
          <div style={{ backgroundColor: galery.overlay }} className="overlay" />
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
                src={video.src}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div style={{ backgroundColor: video.overlay }} className="overlay" />
        </section>
      ) : ''}
      {/* instagram */}
      {instagram.active ? (
        <section id="instagram"
          className={styles.instagram}
        >
          <div className="container">
            <div className="row center">
              <h2 style={{ color: instagram.colorTitle }}>{instagram.title}</h2>
              <h4 style={{ color: instagram.colorSubTitle }}>{instagram.subtitle}</h4>
            </div>
            <div className="row">
              {instagram.data.map(content => {
                return (
                  <div key={content.id} className="col s12 m6 l4">
                    <div className={`card ${styles.cardImgInsta}`}>
                      <div className={styles.contentImg} style={{ backgroundImage: `url('${content.name}')` }} />
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
          <div style={{ backgroundColor: instagram.overlay }} className="overlay" />
        </section>
      ) : ''}

      {/* blog */}
      {blog.active ? (
        <section id="blog"
          className={styles.blog}
        >
          <div className="container">
            <div className="row center">
              <h2 style={{ color: blog.colorTitle }}>{blog.title}</h2>
              <h4 style={{ color: blog.colorSubtitle }}>{blog.subTitle}</h4>
            </div>
            <div className="row">
              <Carrousel qtd={blog.data.length}>
                {blog.data.map(content => {
                  return (
                    <CardContent key={content.id}>
                      <CardBlog post={content} />
                    </CardContent>

                  )
                })}
              </Carrousel>
            </div>
          </div>
          <div style={{ backgroundColor: blog.overlay }} className="overlay" />
        </section>
      ) : ''}

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
                <form onSubmit={handleShedule} className="grey lighten-5">
                  <input
                    type="text"
                    name=""
                    onChange={event => setName(event.target.value)}
                    value={name}
                    id=""
                    placeholder={schedule.placeholder_name ?? "nome"}
                  />
                  <input
                    type="email"
                    name=""
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                    id=""
                    placeholder={schedule.placeholder_email ?? "e-mail"}
                  />
                  <input
                    type="tel"
                    name=""
                    onChange={event => setWhatsapp(event.target.value)}
                    value={whatsapp}
                    id=""
                    placeholder={schedule.placeholder_whatsapp ?? "whatsapp"}
                  />
                  <div className="row">
                    <div className="col s12 m6">
                      <input
                        type="date"
                        name=""
                        onChange={event => setData(event.target.value)}
                        value={data}
                        id=""
                        placeholder={schedule.placeholder_data}
                      />

                    </div>
                    <div className="col s12 m6">
                      <input
                        type="time"
                        placeholder={schedule.placeholder_hora ?? "Hora"}
                        name=""
                        onChange={event => setHour(event.target.value)}
                        value={hour}
                        id=""
                      />
                    </div>
                  </div>
                  <textarea
                    placeholder="Descreva seu pedido"
                    name=""
                    onChange={event => setMesage(event.target.value)}
                    value={mesage}
                  >
                  </textarea>
                  <div className={styles.containerBtn}>
                    <button className="btn" type="submit">Enviar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: schedule.overlay }} className="overlay" />
        </section>
      ) : ''}
      {scroll > 700 ? (
        <a href="#inicio" className="upPage">
          <ChevronDoubleUp width={18} color="white" />
        </a>
      ) : ''}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      
    


      <Whatsapp phone={footer.whatsapp} />
      <Footer content={footer} />
    </div>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const theme_slug = process.env.THEME_SLUG;
  const access_token = process.env.USER_ACCESS_TOKEN;

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
  // BEGIN:: HANDLE PRODUCTS
  let dataProducts = [];
  if (elements.cms_catalog.active && elements.cms_catalog.data.api_url) {
    const take = elements.cms_catalog.data.take ?? '';
    const responseProducts = await axios.get(`${elements.cms_catalog.data.api_url}/${take}`);

    if (responseProducts.data.result) {
      dataProducts = responseProducts.data.response.map((product: any) => {
        return {
          id: product.id,
          img: elements.cms_catalog.data.origin + product.logom,
          name: product.name,
          price: Number(product.price),
        }
      });
    }
  }
  const products = {
    ...elements.cms_catalog.data,
    active: elements.cms_catalog.active,
    data: dataProducts
  };
  // END:: HANDLE PRODUCTS
  const testimonial = { ...elements.testimonial.data, active: elements.testimonial.active };
  // BEGIN:: HANDLE GALLERY
  let dataGallery = [];
  if (elements.cms_gallery.active) {
    const responseGallery = await cms.get(`/gallery/show/${elements.cms_gallery.data.slug}`, {
      headers: { 'access-token': access_token, 'take': elements.cms_gallery.data.take }
    });
    if (responseGallery.data.result) {
      dataGallery = responseGallery.data.response.images;
    }
  }
  const galery = {
    ...elements.cms_gallery.data,
    active: elements.cms_gallery.active,
    data: dataGallery
  };
  // END:: HANDLE GALLERY
  const video = { ...elements.video.data, active: elements.video.active };
  // BEGIN:: HANDLE INSTAGRAM
  let dataInstagram = []
  if (elements.cms_instagram.active) {
    const responseInstagram = await cms.get(`/gallery/show/instagram`, {
      headers: { 'access-token': access_token, 'take': elements.cms_instagram.data.take }
    });
    if (responseInstagram.data.result) {
      dataInstagram = responseInstagram.data.response.images;
    }
  }
  const instagram = {
    ...elements.cms_instagram.data,
    active: elements.cms_instagram.active,
    data: dataInstagram
  };
  // END:: HANDLE INSTAGRAM | BEGIN:: HANDLE BLOG
  let dataBlog = [];
  if (elements.cms_blog.active) {
    const responseBlog = await cms.get(`post/feed`, {
      headers: { 'access-token': access_token, 'take': elements.cms_blog.data.take }
    });
    if (responseBlog.data.result) {
      dataBlog = responseBlog.data.response.posts
    }
  }
  const blog = {
    ...elements.cms_blog.data,
    active: elements.cms_blog.active,
    data: dataBlog
  };
  // END:: BLOG
  const schedule = { ...elements.schedule.data, active: elements.schedule.active };
  const footer = elements.footer.data;

  const jivochat = { active: elements.jivochat.active, ...elements.jivochat.data };

  return {
    props: {
      page_data,
      banner,
      service,
      about,
      callToAction,
      products,
      testimonial,
      galery,
      video,
      instagram,
      blog,
      schedule,
      footer,
      jivochat
    },
    revalidate: 60 * 60 * 8,
  }
}