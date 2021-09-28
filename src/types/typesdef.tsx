
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
  card: {
    background: string,
    color: string,
    hover_background: string,
    hover_color: string,
    color_ico: string
  },
  data: [
    {
      id: number,
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
  backgorundButon: string,
  button_color: string,
  imgPng: string


}
export type CallToActionType = {
  active: boolean,
  backGround: string,
  title: string,
  subTitle: string,
  txt: string,
  button: string,
  color_button: string,
  background_buton: string,
  overlay: string,
  colorTile: string,
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
  backGround: string,
  txt: string,
  colorTxt: string,
  button: string,
  colorButton: string,
  backgroundButton: string,
  ovelay: string,
  data: [
    {
      id: number,
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
  active: boolean,
  overlay: string,
  title: string,
  background: string,
  colorTitle: string,
  subtitulo: string,
  colorSubTitulo: string,
  txt: string,
  src: string,
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
  ovelay: string,
  title: string,
  colorSubtitle: string,
  colorTitle: string,
  subTitle: string,
  imgPng: string,
  button: string,
  colorButton: string,
  backgroundButton: string,
  placheHouder: {
    name: string,
    email: string,
    whatsapp: string,
    data: string,
    hora: string,
    textarea: string,
  }
}
export type InstagramType = {
  active: boolean,
  background: string,
  overlay: string,
  title: string,
  colorTitle: string,
  subtitle: string,
  colorSubTitle: string,
  data: [
    {
      id: number,
      alt: string,
      src: string
    }
  ]
}
export type BlogType = {
  active: boolean,
  background: string,
  ovelay: string,
  title: string,
  colorTitle: string,
  subTitle: string,
  colorSubtitle: string,
  data: [
    {
      author: string ,
      content: string ,
      created_at: Date ,
      date_formatted: string ,
      excerpt: string ,
      id: string ,
      image: string ,
      published: number ,
      slug: string ,
      title: string ,
      updated_at: Date ,
      user_id: string ,
      wallpaper: string ,
    }
  ]
}