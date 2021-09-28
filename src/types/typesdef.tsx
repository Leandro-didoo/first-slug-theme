export type PageData = {
  css?: string;
  fonts?: string;
  icon: string;
  metadescription: string;
  theme_colors: string;
  title: string;
}

export type BannerType = {
  img: string,
  overlay: string,
  title: string,
  caption: string,
  txt: string,
  png_img: string,
  txt_button: string,
  button_background: string,
  button_color: string,
  color_title: string,
  color_caption: string,
  color_txt: string
}

export type ServiceType = {
  active: boolean,
  background: string,
  overlay: string,
  title: string,
  color_title: string,
  buttonOne: string,
  buttonOne_background: string,
  buttonOne_color: string,
  buttonTwo: string,
  buttonTwo_background: string,
  buttonTwo_color: string,  
  card_background: string,
  card_color: string,
  card_hover_background: string,
  card_hover_color: string,
  card_color_ico: string,
  services: [
    {
      ico: string,
      title: string,
      subTitulo: string,
      txt: string,
      txt_color: string
    }
  ]
}

export type AboutType = {
  active: boolean,
  background: string,
  title: string,
  subTitle: string,
  txt: string,
  button: string,
  backgroundButton: string,
  button_color: string,
  imgPng: string


}
export type CallToActionType = {
  active: boolean,
  background: string,
  title: string,
  subTitle: string,
  txt: string,
  button: string,
  color_button: string,
  background_button: string,
  overlay: string,
  colorTitle: string,
  colorTxt: string
}

export type Products = {
  id: number,
  img: string,
  name: string,
  price: number,
}

export type TestimonialType = {
  active: boolean,
  title: string,
  subTitle: string,
  colorTitle: string,
  background: string,
  txt: string,
  colorTxt: string,
  button: string,
  colorButton: string,
  backgroundButton: string,
  overlay: string,
  clients: [
    {
      thumbnail: string,
      name: string,
      address: string,
      stars: number,
      description: string,
    }
  ],
}

export type Galerytype = {
  active: boolean,
  overlay: string,
  title: string,
  subtitulo: string,
  txt: string,
  colorTitle: string,
  colorSubTitulo: string,
  data: [
    {
      id: number,
      alt: string,
      src: string
    }
  ]
}

export type VideoType = {
  active: boolean ,
  overlay: string ,
  title: string ,
  background: string ,
  colorTitle: string ,
  subtitulo: string ,
  colorSubTitulo: string ,
  txt: string ,
  src: string ,
}

export type FooterType = {
    backgroundColor: string,
    address: {
      logradouro: string,
      numero: string,
      bairro: string,
      cep: string,
      cidade: string,
      estado: string
    },
    phoneOne: string,
    phoneTwo: string,
    whatsapp: string,
    email: string,
    facebook: string,
    instagram: string,
    tiktok: string,
    colorTxt: string,
}
export type SheduleType = {
  active: true,
  background: string,
  overlay: string,
  title: string,
  colorSubtitle: string,
  colorTitle: string,
  subTitle: string,
  imgPng:string,
  button: string,
  colorButton: string,
  backgroundButton: string,
  placheHouder:{
    name: string,
    email: string,
    whatsapp:string,
    data: string,
    hora: string,
    textarea: string,
  }
}