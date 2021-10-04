import { GetStaticProps } from "next"
import { Nav } from "../../components/Nav";
import cms from "../../services/cms";
import { BlogType, FooterType, NavType, PageData } from "../../types/typesdef";
import { Button, Card, Row, Col, Carousel, } from 'react-materialize';
import style from '../../styles/Blog.module.scss';
import { ChevronCircleLeft, Clock } from "../../components/Icons";
import { CardBlog } from "../../components/CardBlog";
import { Footer } from '../../components/Footer'
import { useRouter } from 'next/router'
import Link from 'next/link';
import Head from 'next/head';

if (process.browser) {
    require('materialize-css');
}


type BlogProps = {
    page_data: PageData;
    blog: BlogType,
    footer: FooterType,
    navBar: NavType,
}

export default function Blog({ page_data, blog, footer, navBar }: BlogProps) {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>{page_data.title}</title>
                <meta name="description" content={page_data.metadescription} />
                <link rel="icon" href={page_data.icon ?? "/favicon.ico"} />

                <title>Blog | {page_data.title}</title>
                <link rel="icon" href={page_data.icon} />
            </Head>
            <div className={style.blogPage}>
                <Nav
                    color='#333'
                    colorTxt=""
                    data={navBar}
                >
                    <li>
                        <Link href="/">
                            <a>Inicio</a>

                        </Link>
                    </li>
                </Nav>
                <div className="container" style={{ minHeight: '90vh'}}>

                    <header>
                        <br />
                        <br />
                        <div className="row">
                            <div className="col">
                                <div className={style.titleBlog}>
                                    <h1>{blog.title}</h1>
                                </div>
                            </div>
                            <div className="col s12">
                                <div className={style.subTitle}>
                                    <button onClick={() => router.back()}><ChevronCircleLeft width={27} color="#333" /></button>
                                    <h2>{blog.subTitle}</h2>

                                </div>
                            </div>
                        </div>
                        {blog.data.length > 0 ? (
                            <div className="row">
                                <div className="col s12 m6 ">
                                    <div className={style.ImgEmphasis}>
                                        <img src={blog.data[0].wallpaper} alt="" />
                                    </div>
                                </div>
                                <div className="col s12 m6 ">
                                    <div className={style.InfoEmphasis}>
                                        <div className={style.item}>
                                            <h3>{blog.data[0].title}</h3>
                                            <small >
                                                <Clock width={20} color="blue" />
                                                {blog.data[0].date_formatted}
                                            </small>
                                            <div className={style.contnt} dangerouslySetInnerHTML={{ __html: `${blog.data[0].content}` }} />

                                        </div>
                                    </div>
                            </div>
                        </div>
                        ) : ''}
                    </header>
                    <main>
                        <div className="row">

                            {blog.data.map((content, index) => {
                                if (index === 0) return;
                                return (
                                    <div key={content.id} className={`col s12 m3`}>
                                        <div className={style.cardBlog}>
                                            <div className={style.img}>
                                                <img src={content.image} alt={content.title} />
                                            </div>
                                            <div className={style.info}>
                                                <small>
                                                    <Clock width={10} color="red" />
                                                    {content.date_formatted}
                                                </small>
                                                <Link href={`/blog/${content.slug}`}>
                                                    <a className={style.title}>{content.title}</a>
                                                </Link>
                                                <div className={style.contnt} dangerouslySetInnerHTML={{ __html: `${content.content}` }} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>

                    </main>
                </div>
                <Footer content={footer} />

            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const theme_slug = process.env.THEME_SLUG;
    const access_token = process.env.USER_ACCESS_TOKEN;

    const response = await cms.get(`page/data/${theme_slug}`, {
        headers: { 'access-token': access_token }
    });
    if (!response || !response.data.result) throw new Error('Impossível carregar a página.');

    const page = response.data.response;
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
    let dataBlog = [];
    if (elements.cms_blog.active) {
        const responseBlog = await cms.get(`post/feed`, {
            headers: { 'access-token': access_token, 'take': elements.cms_blog.data.take }
        });
        if (responseBlog.data.result) {
            dataBlog = responseBlog.data.response.posts
        }
    }
    const navBar = elements.navbar.data

    const blog = {
        ...elements.cms_blog.data,
        active: dataBlog.length === 0 ? false : elements.cms_blog.active,
        data: dataBlog
    };
    const footer = elements.footer.data;

    return {
        props: {
            page_data,
            blog,
            navBar,
            footer
        },
        revalidate: 60 * 60 * 8,
    }
}