import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.scss';
import { Button, Card, Row, Col, Carousel, Modal } from 'react-materialize';
import { Footer } from '../../components/Footer';
import { Banner } from '../../components/Banner';
import { PageData, AboutType, BannerType, BlogType, CallToActionType, FooterType, Galerytype, InstagramType, ServiceType, SheduleType, TestimonialType, VideoType, Products, JivochatType, NavType, FaqType, ImageLegendsType, SectionListType, NewSectionType } from '../../types/typesdef';
import { CardContent, Carrousel } from '../../components/Carrosel';
import { ChevronDoubleUp, Heart, Stars } from '../../components/Icons';
import cms from '../../services/cms';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
import { Nav } from '../../components/Nav';
import { CardProdutct } from '../../components/CardProduct';
import { CardBlog } from '../../components/CardBlog';
import { FormEvent, useState } from 'react';
import { Whatsapp } from '../../components/Whatsapp';
import { BtnCokies } from '../../components/BtnCokies';
if (process.browser) {
  const M = require('materialize-css');
}
type Props = {
  page_data: PageData,
  navBar: NavType,
  banner: BannerType,
  new_section: NewSectionType,
  service: ServiceType,
  about: AboutType,
  section_list: SectionListType,
  callToAction: CallToActionType,
  image_legends: ImageLegendsType,
  products: Products,
  testimonial: TestimonialType,
  galery: Galerytype,
  video: VideoType,
  instagram: InstagramType,
  blog: BlogType,
  schedule: SheduleType,
  faq: FaqType,
  footer: FooterType,
  jivochat: JivochatType,
  slug: string,
  token: string
}

interface OuthersSendMessage{
  date?: string;
  hour?: string;
}

interface DataSendMessage{
  name: string;
  email: string;
  message: string;
  phone?: string;
  page_id: number;
  page_owner_id: number;
  outhers?: OuthersSendMessage;
}

function Home({
  page_data,
  navBar,
  banner,
  new_section,
  service,
  about,
  section_list,
  callToAction,
  image_legends,
  products,
  testimonial,
  galery,
  video,
  faq,
  footer,
  schedule,
  instagram,
  blog,
  jivochat,
  slug,
  token
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
  async function handleShedule(event: FormEvent) {
    event.preventDefault();
    let phone = footer.whatsapp;

    let dataSendMessage: DataSendMessage = {
      name, email, message: mesage,
      page_id: page_data.page_id,
      page_owner_id: page_data.user_id
      
    };
    let outhers: OuthersSendMessage = {};
    let outhersMessage = '';
    if(whatsapp) dataSendMessage['phone'] = whatsapp;
    if(data){
      let date_broken = data.split('-');
      if(date_broken.length === 3){
        let date = new Date(
          Number(date_broken[0]), 
          Number(date_broken[1]), 
          Number(date_broken[2])
        );
        let date_formatted = new Intl.DateTimeFormat('pt-BR').format(date);
        outhers = { date: date_formatted };
        outhersMessage = `${date_formatted} `;
      }
    }
    if(hour){
      if(outhers) outhers['hour'] = hour;
      else outhers = { hour };
      outhersMessage+=hour;
    }
    if(outhers){
      dataSendMessage['outhers'] = outhers;
      dataSendMessage['message'] = `${mesage}<br/><br/>Agendado para:<br/>${outhersMessage}`;
    }

    let userMessage = ` *NOME:* ${name} \n\n*E-MAIL:* ${email}\n\n*DATA:* ${data}\n\n*HORÁRIO:* ${hour}\n\n*MENSAGEM:* \n\n ${mesage}`;
    userMessage = window.encodeURIComponent(userMessage);

    try{
      const { data } = await cms.post("/contact/send",dataSendMessage, {
        headers: { 'access-token': token }
      });
      if(data.result){
        handleSendToWhatsapp(phone,userMessage);
        notify()
        handleClearFormContact();
      }else handleSendToWhatsapp(phone,userMessage, true);
    }catch(err){
      console.log(err);
      handleSendToWhatsapp(phone,userMessage, true);
    }
  }
  function handleSendToWhatsapp(phone: string, text: string, confirm = false){
    if(confirm &&
      !window.confirm('Não foi possível armazenar sua mensagem. Deseja enviar mesmo assim?')
    ) return;
    
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`);
    return;
  }
  function handleClearFormContact(){
    setName('');
    setEmail('');
    setWhatsapp('');
    setData('');
    setHour('');
    setMesage('');
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>{page_data.title}</title>
        <meta name="description" content={page_data.metadescription} />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />
        <link rel="icon" href={page_data.icon ?? "/favicon.ico"} />
        {/* <link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection" /> */}
        {jivochat.active && jivochat.widget && jivochat.widget.trim() ? (
          <script src={`//code-sa1.jivosite.com/widget/${jivochat.widget}`} async></script>
        ) : ''}
        <link rel="stylesheet" href="/icons/nucleo/css/nucleo.css" type="text/css" />



        <style>
          {page_data.fonts}
          {page_data.theme_colors}
          {page_data.css ?? ''}
        </style>
      </Head>
      <header id="inicio">
        <Banner banner={banner} >
          <Nav
            color="#333"
            colorTxt=""
            data={navBar}
          >
            {service.active && <li style={{ color: navBar.link_color }}><a href="#services">Serviços</a></li>}
            {about.active && <li style={{ color: navBar.link_color }} ><a href="#about">Sobre</a></li>}
            {products.active && <li style={{ color: navBar.link_color }}><a href="#products">Produtos</a></li>}
            {galery.active && <li style={{ color: navBar.link_color }} ><a href="#gallery">Galeria</a></li>}
            {blog.active && <li style={{ color: navBar.link_color }}>
              <Link href={`/${slug}/blog`}>
                <a style={{ color: navBar.link_color }} >Blog</a>
              </Link>
            </li>}
            <li style={{ color: navBar.link_color }}><a href="#schedule">Contato</a></li>
            <li style={{ color: navBar.link_color }}><a style={{ borderRadius: '2rem', backgroundColor: banner.button_background, color: banner.button_color }} href="#schedule" className="btn">Agendar Horario</a></li>
          </Nav>
        </Banner>
      </header>

      {new_section.active == true || new_section.active == 1 ? (
        <section
          id="new_section"
          className={styles.newSection}
          style={{ backgroundImage: `url('${new_section.image}')` }}
        >
          <div className={styles.overlay} style={{ background: new_section.overlay }}></div>
          <div className={styles.content}>
            <h2 className={styles.title} style={{ color: new_section.text_color }}>
              { new_section.title }
            </h2>
            <h4 className={styles.subtitle} style={{ color: new_section.text_color }}>
              { new_section.subtitle }
            </h4>
            <p style={{ color: new_section.text_color }}>
              { new_section.description }
            </p>
            <a
              className={styles.btnAction}
              href={ new_section.button_link }
              style={{
                background: new_section.button_background,
                color: new_section.button_color
              }}
            >
              { new_section.button_text }
            </a>
          </div>
        </section>
      ):''}
      {/* services  */}
      {service.active == true || service.active == 1 ? (
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
                            className={`${content.ico ? content.ico : 'fas fa-map-signs'}  center-align`}
                          >
                          </i>
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
              <div className="row">
                {products.active == true || products.active == 1 ? (
                  <div className="col s12 m6">
                    <a
                      href={products.linkButton}
                      style={{
                        backgroundColor: service.buttonTwo_background,
                        color: service.buttonOne_color
                      }}
                      className="btn">{service.buttonOne}
                    </a>
                  </div>
                ) : ''}
                <div className={`col s12  ${products.active == true || products.active == 1 ? 'm6':'m12' }`}>
                  <a
                   href="#schedule"
                    style={{
                      backgroundColor: service.buttonOne_background,
                      color: service.buttonTwo_color
                    }}
                    className="btn">{service.buttonTwo}
                  </a>

                </div>
              </div>


            </div>
          </div>
          <div style={{ backgroundColor: service.overlay }} className="overlay" />
        </section>
      ) : ''}

      {/* about */}
      
      {about.active == true || about.active == 1 ? (
        <section
          id="about"
          className={styles.containerAbout}
        >
          <div className="container">
            <div className="row">

              <div className="col s12 m6">
                <div className={styles.itemLeft}>
                  <div className={styles.item} >
                      <img src={about.imgPng} alt="" />
                  </div>
                </div>
              </div>
              <div className="col s12 m6">
                <div className={styles.itemRigth}>
                  <div className={styles.item}>
                    <h2 style={{ color: about.title_color }}>{about.title}</h2>
                    <h3 style={{ color: about.txt_color }}>{about.subTitle}</h3>
                    <div style={{ color: about.txt_color }} className={styles.aboutTxt} dangerouslySetInnerHTML={{ __html: `${about.txt}` }} />
                    <Link href="#schedule">
                      <a style={{ backgroundColor: about.backgroundButton }}
                        className="btn">{about.button}
                      </a>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div style={{ backgroundImage: `url(${about.background})` }} className={styles.bkgAbout} />

          <div style={{ backgroundColor: about.overlay }} className="overlay" />

        </section>
      ) : ''}

      {section_list.active == true || section_list.active == 1 ? (
        <section
          id="section_list"
          className={styles.sectionList}
          style={{ backgroundImage: `url('${section_list.background}')` }}
        >
          <div className={styles.overlay} style={{ background: section_list.overlay }}></div>
          <div className={styles.content}>
            <h2 className={styles.title} style={{ color: section_list.text_color }}>
              { section_list.title }
            </h2>
            <h4 className={styles.subtitle} style={{ color: section_list.text_color }}>
              { section_list.subtitle }
            </h4>
            <div className={styles.row}>
              <ul style={{ color: section_list.text_color }}>
                {section_list.items.map((item, i) => { return(
                  <li key={`item-${i}`}>{item.item}</li>
                );})}
              </ul>
              <img src={section_list.image} className={styles.image}/>
            </div>
            <a
              className={styles.btnAction}
              href={ section_list.button_link }
              style={{
                background: section_list.button_background,
                color: section_list.button_color
              }}
            >{ section_list.button_text }</a>
          </div>
        </section>
      ): ''}
      
      {/* call-to-action */}
      {callToAction.active == true || callToAction.active == 1 ? (
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

      {image_legends.active == true || image_legends.active == 1 ? (
        <section
          id="image_legends"
          className={styles.imageLegends}
          style={{ backgroundImage: `url('${image_legends.background}')` }}
        >
          <div className={styles.overlay} style={{ background: image_legends.overlay }}></div>
          <div className={styles.content}>
            <h2 className={styles.title} style={{ color: image_legends.text_color }}>
              { image_legends.title }
            </h2>
            <h4 className={styles.subtitle} style={{ color: image_legends.text_color }}>
              { image_legends.subtitle }
            </h4>
            <div className={styles.flexImages}>
              { image_legends.images.map((image, i) => { return (
                <figure style={{ color: image_legends.text_image_color }} key={`image_legend_${i}`}>
                  <img src={image.image}/>
                  <figcaption>{image.title}</figcaption>
                  <p>{image.description}</p>
                  <a
                    className={styles.btnAction}
                    href={ image.button_link }
                    style={{
                      background: image.button_background,
                      color: image.button_color
                    }}
                  >
                    { image.button_text }
                  </a>
                </figure>
              ); })}
            </div>
          </div>
        </section>
      ) : ''}

      {/*products  */}
      {products.active == true || products.active == 1  ? (
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
              <a
                href={products.linkButton}
                style={{ borderRadius: '2rem', backgroundColor: products.backgroundButton, color: products.colorButton }}
                className="btn">Ver catalogo
              </a>
            </div>
          </div>
          <div style={{ backgroundColor: products.overlay }} className="overlay" />
        </section>

      ) : ''}

      {/* testimonial */}
      {testimonial.active == true || testimonial.active == 1 ? (
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
      {galery.active == true || galery.active == 1 ? (
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
      {video.active == true || video.active == 1 ? (
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
      {instagram.active == true || instagram.active  == 1? (
        <section id="instagram"
          className={styles.instagram}
        >
          <div className="container">
            <div className="row center">
              <h2 style={{ color: instagram.colorTitle }}>{instagram.title}</h2>
              <h4 style={{ color: instagram.colorSubTitle }}>{instagram.subtitle}</h4>
            </div>
            <div className="row">
              {instagram.data.map((content: any) => {
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
      {blog.active == true || blog.active == 1 ? (
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
                      <CardBlog slug={slug} post={content} />
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
      {schedule.active == true || schedule.active  == 1? (
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
                    onChange={event => setName(event.target.value)}
                    value={name}
                    placeholder={schedule.placeholder_name ?? "nome"}
                    required
                  />
                  <input
                    type="email"
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                    placeholder={schedule.placeholder_email ?? "e-mail"}
                    required
                  />
                  <input
                    type="tel"
                    onChange={event => setWhatsapp(event.target.value)}
                    value={whatsapp}
                    placeholder={schedule.placeholder_whatsapp ?? "whatsapp"}
                  />
                  <div className="row">
                    <div className="col s12 m6">
                      <input
                        type="date"
                        onChange={event => setData(event.target.value)}
                        value={data}
                        placeholder={schedule.placeholder_data}
                      />

                    </div>
                    <div className="col s12 m6">
                      <input
                        type="time"
                        placeholder={schedule.placeholder_hora ?? "Hora"}
                        onChange={event => setHour(event.target.value)}
                        value={hour}
                      />
                    </div>
                  </div>
                  <textarea
                    placeholder="Descreva seu pedido"
                    onChange={event => setMesage(event.target.value)}
                    value={mesage}
                    required
                  ></textarea>
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

      {faq.active == true || faq.active == 1 ? (
        <section
          id="faq"
          className={styles.faq}
          style={{ backgroundImage: `url('${faq.background}')` }}
        >
          <div className={styles.overlay} style={{ background: faq.overlay }}></div>
          <div className={styles.content}>
            <hgroup>
              <h2 className={styles.title} style={{ color: faq.text_color }}>
                { faq.title }
              </h2>
              <h4 className={styles.subtitle} style={{ color: faq.text_color }}>
                { faq.subtitle }
              </h4>
            </hgroup>
            <p style={{ color: faq.text_color }}>
              { faq.description }
            </p>

            <div className={styles.card} style={{
              background: faq.question_background, 
              color: faq.question_color,
            }}>
              { faq.questions.map((question, i) => { return (
                <div key={`question_${i}`}>
                  <strong
                    onClick={(e: any) => {
                      let description = e.target.nextSibling;
                      description.style.display = description.style.display == 'block' ? 'none':'block';
                    }}
                  >{question.title}</strong>
                  <div style={{ display: 'none' }}>{question.description}</div>
                </div>
              ); })}
            </div>
          </div>
        </section>
      ):''}

      {scroll > 700 ? (
        <a href="#inicio" className="upPage">
          <ChevronDoubleUp width={18} color="white" />
        </a>
      ) : ''}

      <BtnCokies />

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



export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.params) throw new Error('Página não encontrada');
  const slug = ctx.params.slug;
  const theme_slug = 'padrao';

  const userPage = await cms.get(`page/token/${slug}/${theme_slug}`, {
    headers: { 'access-token': 'GhaehSVvA3caqfQ' }
  });

  const access_token = userPage.data.response.access_token;

  if (!userPage) throw new Error('Não foi possível se comunicar com o servidor!');
  if (!userPage.data.result) throw new Error(userPage.data.response);


  const response = await cms.get(`page/data/${theme_slug}`, {
    headers: { 'access-token': access_token }
  });

  if (!response || !response.data.result) throw new Error('Impossível carregar a página.');
  const page = response.data.response;
  // END:: REQUEST PAGE | BEGIN:: PARSE PAGE
  if (!Array.isArray(page.datas) || page.datas.length === 0) throw new Error('Configure sua página.');
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

  const navBar = elements.navbar ? elements.navbar.data : { active: false };
  const banner = elements.banner ? elements.banner.data : { active: false };
  const new_section = elements.new_section ? {
    ...elements.new_section.data, active: elements.new_section.active
  } : { active: false };
  const service = elements.service ? { 
    ...elements.service.data, active: elements.service.active
  } : { active: false };
  const about = elements.about ? {
    ...elements.about.data, active: elements.about.active
  } : { active: false };
  const section_list = elements.section_list ? {
    ...elements.section_list.data, active: elements.section_list.active
  } : { active: false };
  const callToAction = elements.callToAction ? {
    ...elements.callToAction.data, active: elements.callToAction.active
  } : { active: false };
  const image_legends = elements.image_legends ? {
    ...elements.image_legends.data, active: elements.image_legends.active
  } : { active: false };

  // BEGIN:: HANDLE PRODUCTS
  let dataProducts = [];
  if (elements.cms_catalog && elements.cms_catalog.active && elements.cms_catalog.data.api_url) {
    try{
      const take = elements.cms_catalog.data.take ?? '';
      const responseProducts = await axios.get(`${elements.cms_catalog.data.api_url}/${take}`);

      if (responseProducts.data.result) {
        dataProducts = responseProducts.data.response.map((product: any) => {
          let name = product.name
          try {
            if (name.indexOf('"pt"') != -1 && JSON.parse(product.name)) {
              name = JSON.parse(product.name).pt
            }
          } catch {
            name = product.name

          }
          return {
            id: product.id,
            img: elements.cms_catalog.data.origin + product.logom,
            name: name,
            price: Number(product.price),
          }
        });
      }
    }catch(e: any) {}
  }
  const products = {
    ...elements.cms_catalog?.data,
    active: dataProducts.length === 0 ? false : elements.cms_catalog.active,
    data: dataProducts
  };
  // END:: HANDLE PRODUCTS
  const testimonial = elements.testimonial ? {
    ...elements.testimonial.data, active: elements.testimonial.active
  } : { active: false };
  // BEGIN:: HANDLE GALLERY
  let dataGallery = [];
  if (elements.cms_gallery && elements.cms_gallery.active && elements.cms_gallery.data.slug) {
    try {
      const responseGallery = await cms.get(`/gallery/show/${elements.cms_gallery.data.slug}`, {
        headers: { 'access-token': access_token, 'take': elements.cms_gallery.data.take }
      });
      if (responseGallery.data.result) {
        dataGallery = responseGallery.data.response.images;
      }
    }catch(e: any){ }
  }

  const galery = {
    ...elements.cms_gallery?.data,
    active: dataGallery.length === 0 ? false : elements.cms_gallery.active,
    data: dataGallery
  };
  // END:: HANDLE GALLERY
  const video = elements.video ? {
    ...elements.video.data, active: elements.video.active
  } : { active: false };
  // BEGIN:: HANDLE INSTAGRAM
  let dataInstagram = []
  if (elements.cms_instagram && elements.cms_instagram.active) {
    try {
      const responseInstagram = await cms.get(`/gallery/show/instagram`, {
        headers: { 'access-token': access_token, 'take': elements.cms_instagram.data.take }
      });
      if (responseInstagram.data.result) {
        dataInstagram = responseInstagram.data.response.images;
      }
    }catch(e: any){ }
  }
  const instagram = {
    ...elements.cms_instagram?.data,
    active: dataInstagram.length === 0 ? false : elements.cms_instagram.active,
    data: dataInstagram
  };
  // END:: HANDLE INSTAGRAM | BEGIN:: HANDLE BLOG
  let dataBlog = [];
  if (elements.cms_blog.active) {
    try{
      const responseBlog = await cms.get(`post/feed`, {
        headers: { 'access-token': access_token, 'take': elements.cms_blog.data.take }
      });
      if (responseBlog.data.result) {
        dataBlog = responseBlog.data.response.posts
      }
    }catch(e: any){ }
  }
  const blog = {
    ...elements.cms_blog.data,
    active: dataBlog.length === 0 ? false : elements.cms_blog.active,
    data: dataBlog
  };
  // END:: BLOG
  const schedule = elements.schedule ? {
    ...elements.schedule.data, active: elements.schedule.active 
  } : { active: false };
  const faq = elements.faq ? {
    ...elements.faq.data, active: elements.faq.active 
  } : { active: false };
  const footer = elements.footer.data;
  const jivochat = elements.jivochat ? {
    active: elements.jivochat.active, ...elements.jivochat.data
  } : { active: false };

  return {
    props: {
      page_data,
      navBar,
      banner,
      new_section,
      service,
      about,
      section_list,
      callToAction,
      image_legends,
      products,
      testimonial,
      galery,
      video,
      instagram,
      blog,
      schedule,
      faq,
      footer,
      jivochat,
      slug,
      token: access_token
    },

  }
}