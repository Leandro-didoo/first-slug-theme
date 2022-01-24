export type PageData = {
  page_id: number;
  user_id: number;
  css?: string;
  fonts?: URL;
  icon: string;
  metadescription: string;
  theme_colors: string;
  title: string;
}
export type Appearance = {
  title: string,
  size_title: string,
  name: string,
  nav_background: string,
  description: string,
  button: string,
  imgLogo: string,
  backgroundImg: string,
  overlay: string
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
export type NewSectionType = {
  active: boolean | Number,
  image: string,
  overlay: string,
  title: string,
  subtitle: string,
  description: string,
  text_color: string,
  button_text: string,
  button_link: string,
  button_color: string,
  button_background: string,
}
export type ServiceType = {
  active: boolean | number,
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
  active: boolean | number,
  background: string,
  title: string,
  subTitle: string,
  txt: string,
  button: string,
  backgroundButton: string,
  button_color: string,
  imgPng: string,
  title_color: string,
  txt_color: string,
  overlay: string
}
export type SectionListType = {
  active: boolean | Number,
  background: string,
  overlay: string,
  title: string,
  subtitle: string,
  items:{ item: string }[],
  image: string,
  text_color: string,
  button_text: string,
  button_link: string,
  button_color: string,
  button_background: string,
}

export type CallToActionType = {
  active: boolean | number,
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

export type ImageLegendsType = {
  active: boolean | Number,
  background: string,
  overlay: string,
  title: string,
  subtitle: string,
  text_color: string,
  images: {
    image: string,
    title: string,
    description: string,
    button_text: string,
    button_link: string,
    button_color: string,
    button_background: string,
  }[],
  text_image_color: string
}

export type Products = {
  active: boolean | number,
  take: number,
  title: string,
  colorTitle: string,
  subTitle: string,
  background: string,
  txt: string,
  colorTxt: string,
  button: string,
  colorButton: string,
  backgroundButton: string,
  linkButton: string,
  overlay: string,
  data: [{
    id: number
    img: string,
    name: string
    price: number,
  }],

}
export type TestimonialType = {
  active: boolean | number,
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
  active: boolean | number,
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
      name: string
    }
  ]
}
export type VideoType = {
  active: boolean | number,
  overlay: string,
  title: string,
  background: string,
  colorTitle: string,
  subtitulo: string,
  colorSubTitulo: string,
  txt: string,
  src: string,
}

export type FaqType ={
  active: boolean | Number,
  background: string;
  overlay: string;
  title: string;
  subtitle: string;
  description: string;
  text_color: string;
  questions: {
    title: string;
    description: string;
  }[];
  question_background: string;
  question_color: string;
}

export type FooterType = {
  backgroundColor: string,
  address_logradouro: string,
  address_numero: string,
  address_bairro: string,
  address_cep: string,
  address_cidade: string,
  address_estado: string
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
  imgPng: string,
  button: string,
  colorButton: string,
  backgroundButton: string,
  placeholder_name: string,
  placeholder_email: string,
  placeholder_whatsapp: string,
  placeholder_data: string,
  placeholder_hora: string,
  placeholder_textarea: string,
}
export type InstagramType = {
  active: boolean | number,
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
      name: string
    }
  ]
}
export type Posts = {
  author: string,
  content: string,
  created_at: string,
  date_formatted: Date,
  excerpt: string,
  id: number,
  image: string,
  published: number,
  slug: string,
  title: string,
  updated_at: Date,
  user_id: number,
  wallpaper: string,
}
export type BlogType = {
  active: boolean | number,
  background: string,
  overlay: string,
  title: string,
  colorTitle: string,
  subTitle: string,
  colorSubtitle: string,
  data: Posts[]
}
export type CommentRating = {
  id: number,
  like: '-1' | '0' | '1',
  comment_post_id: number,
  post_lead_id: number,
  created_at: string,
  updated_at: string,
}
export type Comment = {
  id: number;
  content: string;
  author: string;

  num_answers: number;
  num_likes: number;
  num_unlikes: number;
  ratings: CommentRating[];

  depth: number;
  answer_id: number;
  breadcrumbs: string | null;
  
  post_id: number;
  post_lead_id: number;
  
  created_at: string;
  date_formatted: string;
  updated_at: string;

  answers?: DataComment;
}
export type DataComment = {
  total: number;
  comments: Comment[];
}
export type PostLead = {
  id: number,
  name: string,
  email: string,
  thumbnail?: string;
}
export type JivochatType = {
  active: boolean | number,
  widget?: string
}
export type NavType = {
  logo: string,
  background: string,
  link_color: string,
  button_background: string,
  button_color: string,
}