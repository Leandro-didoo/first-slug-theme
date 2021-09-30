import { GetStaticProps } from "next";
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from "react";
import Head from 'next/head';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import cms from "../../../services/cms";
import Link from 'next/link';
import style from './style.module.scss'
import { Comment, DataComment, FooterType, PageData, PostLead, Posts } from "../../../types/typesdef";

import { Footer } from '../../../components/Footer'
import { ModalLoginLead } from '../../../components/ModalLoginLead';
import { CardComment } from "../../../components/CardComment";
import { Nav } from "../../../components/Nav";
import { ChevronCircleLeft, Clock } from "../../../components/Icons";
if (process.browser) {
    require('materialize-css');
}

type contetPost = {
    post: Posts,
    prevPost?: Posts,
    nextPost?: Posts,
    outhers?: Posts[]
}
type BlogProps = {
    page_data: PageData,
    post: contetPost,
    footer: FooterType
}

export default function ContentBlog({
    page_data,
    footer,
    post,
}: BlogProps) {
    const router = useRouter()

    const [dataComments, setDataComments] = useState<DataComment>({ total: 0, comments: [] });
    const [haveMoreComments, setHaveMoreComments] = useState(true);
    const [responseComment, setResponseComment] = useState({
        show: false,
        error: false,
        message: ''
    });

    const [newComment, setNewComment] = useState('');
    const [answer, setAnswer] = useState<Comment | null>(null);
    const [isOpenModalLogin, setIsOpenModalLogin] = useState(false);

    const [postLead, setPostLead] = useState<PostLead | null>(() => {
        if (!process.browser || !localStorage.getItem('@cms:postLead')) return null;
        return JSON.parse(localStorage.getItem('@cms:postLead') as string) ?? null;
    });

    useEffect(() => { getComments(); }, []);

    useEffect(() => {
        if (process.browser) localStorage.setItem(
            '@cms:postLead',
            JSON.stringify(postLead)
        );
    }, [postLead]);

    async function getComments() {
        let params = ' &';
        if (postLead) params = `${postLead.id}&`;
        cms.get(`/post/comment/show/${post.post.id}&${params}`).then(response => {
            if (response.data.result) {
                setDataComments(response.data.response);
                setHaveMoreComments(true);
            }
        });
    }
    // BEGIN:: HANDLE POSTLEAD
    function handleLogout() {
        if (window.confirm("Tem certeza?")) handleStorageLead(null);
    }
    function handleStorageLead(lead: any = null, refreshComments = true) {
        setPostLead(lead);
        if (refreshComments) getComments();
    }
    // END:: HANDLE POSTLEAD
    async function handleSendComment(event: FormEvent) {
        event.preventDefault();

        if (!postLead) {
            setIsOpenModalLogin(true)
            return;
        }

        const data = new FormData();
        data.append('content', newComment);
        data.append('post_id', String(post.post.id));
        if (answer) data.append('answer_id', String(answer.id));
        data.append('post_lead_id', String(postLead.id));
        data.append('author', postLead.name);
        if (postLead.thumbnail) data.append('thumbnail', postLead.thumbnail);

        cms.post(`/post/comment/store`, data).then(response => {
            const data = response.data;
            if (data.result) {
                handleSetDataComments(data.response, 'unshift');
                setNewComment('');
                handleResponseComment(true, false, 'Enviado com sucesso!');
            }
            else handleResponseComment(true, true, data.response);
        }).catch(err => {
            handleResponseComment(true, true, "Não foi possível enviar seu comentário...");
        });
    }
    function handleResponseComment(show: boolean, error: boolean, message: string) {
        setResponseComment({ ...{ show, error, message } });

        setTimeout(function () {
            setResponseComment({
                ...{
                    show: false,
                    error: false,
                    message: ''
                }
            })
        }, 1000);
    }
    function handleAnswerTo(comment: Comment) {
        setAnswer({ ...comment });
    }
    async function handleLike(comment: Comment, like: '-1' | '0' | '1') {
        if (!postLead) {
            setIsOpenModalLogin(true);
            return;
        }

        const data = new FormData();
        data.append('comment_post_id', String(comment.id));
        data.append('post_lead_id', String(postLead.id));
        data.append('like', like);

        cms.post(`/post-lead/like`, data).then(response => {
            const data = response.data;
            if (data.result) {
                let parseComment = comment;

                let responseLike = handleSetLike(comment, like);

                parseComment.num_likes = responseLike.num_likes;
                parseComment.num_unlikes = responseLike.num_unlikes;
                parseComment.ratings = [data.response];

                handleSetDataComments(parseComment);
            }
        });
    }
    function handleSetLike(comment: Comment, like: '-1' | '0' | '1') {
        let num_likes = comment.num_likes;
        let num_unlikes = comment.num_unlikes;

        let old_like = '0';
        if (comment.ratings.length > 0) old_like = comment.ratings[0].like;

        if (old_like !== '0') {
            if (old_like === '1') {
                if (like === '0' || like === '-1') num_likes--;
            }
            if (old_like === '-1') {
                if (like === '0' || like === '1') num_unlikes--;
            }
        }
        if (like === '1') num_likes++;
        if (like === '-1') num_unlikes++;

        return {
            num_likes: num_likes < 0 ? 0 : num_likes,
            num_unlikes: num_unlikes < 0 ? 0 : num_unlikes
        }
    }
    async function handleDeleteComment(comment: Comment) {
        if (!postLead) {
            setIsOpenModalLogin(true);
            return;
        }

        if (window.confirm('Tem certeza que deseja excluir esse comentário?')) {
            cms.get(`/post/comment/delete/${post.post.id}&${comment.id}&${postLead.id}`).then(response => {
                const data = response.data;
                if (data.result) handleSetDataComments(comment, 'delete');
                else alert(data.response);
            }).catch(err => {
                alert("Houve um erro ao tentar excluir este comentário");
            });
        }
    }
    async function loadAnswers(comment: Comment) {
        let params = `${comment.id}& &`;
        if (postLead) params = `${comment.id}&${postLead.id}&`;
        cms.get(`/post/comment/answers/${post.post.id}&${params}`).then(response => {
            const data = response.data;
            if (data.result) {
                if (data.response.comments.length > 0) {
                    let parseComment = comment;
                    parseComment.answers = data.response
                    handleSetDataComments(parseComment);
                }
            }
        });
    }
    async function handleMoreComments(
        skip: number,
        father: Comment | null = null,
        disableBtnMore: () => void
    ) {
        let params = `${post.post.id}& &${skip}`;
        if (postLead) params = `${post.post.id}&${postLead.id}&${skip}`;

        cms.get(`/post/comment/show/${params}`).then(response => {
            const data = response.data;

            if (data.result) {
                if (data.response.comments.length > 0) {
                    if (father && father.answers) {
                        let parse = father;
                        if (parse.answers) parse.answers = {
                            total: data.response.total,
                            comments: [...parse.answers.comments, ...data.response.comments]
                        };
                        handleSetDataComments(parse);
                    } else {
                        let temp = dataComments;
                        temp = {
                            total: data.response.total,
                            comments: [...temp.comments, ...data.response.comments]
                        }
                        setDataComments({ ...temp });
                    }
                }
                else disableBtnMore();
            }
        });
    }
    function handleSetDataComments(comment: Comment, type: 'update' | 'delete' | 'unshift' = 'update') {
        let temp = dataComments;

        const arrBreadcrumbs = comment.breadcrumbs?.split('-') ?? [];
        const arrComments: { index: number, data: DataComment | undefined }[] = [{
            index: 0,
            data: temp
        }];
        arrBreadcrumbs.forEach(bread => {
            let lastPosition = arrComments.length - 1;
            const index = arrComments[lastPosition].data?.comments.findIndex(
                comm => comm.id === Number(bread)
            ) ?? -1;
            if (index == -1) return;

            arrComments.push({
                index,
                data: arrComments[lastPosition].data?.comments[index].answers ?? {
                    total: 0, comments: []
                }
            });
        });
        const lastPosition = arrComments.length - 1;
        if (type == 'unshift') {
            // @ts-ignore
            arrComments[lastPosition].data.total++;
            // @ts-ignore
            arrComments[lastPosition].data.comments.unshift(comment);
        } else {
            const index = arrComments[lastPosition].data?.comments.findIndex(
                comm => comm.id === comment.id
            ) ?? -1;

            if (index == -1) return;

            if (!arrComments[lastPosition].data || !arrComments[lastPosition].data?.comments) return;

            if (type == 'update') {
                // @ts-ignore
                arrComments[lastPosition].data.comments[index] = comment;
            }
            else if (type == 'delete') {
                // @ts-ignore
                arrComments[lastPosition].data.comments.splice(index, 1);
            }
        }

        for (let i = lastPosition; i > 0; i--) {
            if (arrComments[i - 1].data &&
                arrComments[i - 1].data?.comments
            ) {
                console.log(!arrComments[i - 1].data?.comments[arrComments[i].index].answers);
                if (!arrComments[i - 1].data?.comments[arrComments[i].index].answers) {
                    // @ts-ignore
                    arrComments[i - 1].data.comments[arrComments[i].index] = {
                        // @ts-ignore
                        ...arrComments[i - 1].data.comments[arrComments[i].index],
                        answers: {
                            // @ts-ignore
                            comments: arrComments[i].data.comments,
                            // @ts-ignore
                            total: arrComments[i].data.comments.length
                        }
                    };
                } else {
                    // @ts-ignore
                    arrComments[i - 1].data.comments[
                        arrComments[i].index
                    ].answers.comments = arrComments[i].data?.comments;
                }
            }
            arrComments.splice(i, 1);
        }
        if (arrComments.length > 0 && arrComments[0].data) {
            temp = arrComments[0].data;
        }
        setDataComments({ ...temp });
    }
    const mpublicationDatee = format(parseISO(post.post.created_at), 'd mmm yy', { locale: ptBR })

    return (
        <div className={style.container}>
            <Head>
                <title>{page_data.title}</title>
                <meta name="description" content={page_data.metadescription} />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />
                <link rel="icon" href={page_data.icon ?? "/favicon.ico"} />

                <title>{post.post.title} | {page_data.title}</title>
                <link rel="icon" href={page_data.icon} />
                <style>
                    {page_data.theme_colors}
                    {page_data.css ?? ''}
                </style>
            </Head>
            <Nav
                colorTxt=""
                color="#333"
                logo={<a className="brand-logo" href="#">Logo</a>}
            >
            </Nav>
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        {/* title */}
                        <div className={style.postTop}>
                            <button onClick={()=>router.back()}><ChevronCircleLeft width={27} color="#333" /></button>
                            <h1 className={style.postTitle}>{post.post.title}</h1>

                        </div>
                        {/* banner */}
                        <div style={{ backgroundImage: `url(${post.post.wallpaper})` }} className={style.banner} />

                        <div className={style.topPost}>
                            <p><strong>Autor:</strong> {post.post.author}</p>
                            <p> {mpublicationDatee} </p>
                        </div>
                        {/* content Post */}
                        <main>
                            <div dangerouslySetInnerHTML={{ __html: `${post ? post.post.content : ''}` }} />
                        </main>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <div className={style.controlPageTow}>
                                {post.prevPost ? (
                                    <a href={`/blog/${post.prevPost.slug}`}>Anterior</a>
                                ) : <div></div>}
                                {post.nextPost ? (
                                    <a href={`/blog/${post.nextPost.slug}`}>Próximo</a>
                                ) : ''}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {post.outhers && post.outhers.map(content => {
                            return (
                                <div className="col s12 m3">
                                    <div className={style.cardBlog}>
                                        <div className={style.img}>
                                            <img src={content.image} alt={content.title} />
                                        </div>
                                        <div className={style.info}>
                                            <small>
                                                <Clock width={10} color="blue" />
                                                {format(parseISO(content.created_at), 'd mmm yy', { locale: ptBR })}
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
                    <div className="row">
                        <div className="col s12">
                            <section className={style.commentSection}>
                                <div className={style.tytleSection}>
                                    <div className={style.count}>
                                        <span>
                                            {dataComments.total}
                                        </span>
                                    </div>
                                    <strong>Comentários</strong>
                                    {answer ? (
                                        <div className={style.answerTo} id="answer-to">
                                            <span>{answer.author}</span>
                                            <button type="button" onClick={() => setAnswer(null)}>x</button>
                                            <div className={style.answerHover}>
                                                <strong className={style.commentAuthor}>
                                                    {answer.author}
                                                </strong>
                                                <time className={style.commentTimestamp}>
                                                    {answer.date_formatted}
                                                </time>
                                                <div className={style.commentBody}>
                                                    {answer.content}
                                                </div>
                                            </div>
                                        </div>
                                    ) : ''}
                                </div>
                                <div className={style.commentField}>
                                    <form onSubmit={handleSendComment}>
                                        <textarea
                                            placeholder="Adicione um comentário..."
                                            value={newComment}
                                            onChange={e => setNewComment(e.target.value)}
                                            style={{
                                                borderColor: responseComment.show ? (
                                                    responseComment.error ? '#dc354590' : '#03a06290'
                                                ) : 'rgb(190, 187, 187)'
                                            }}
                                            required
                                        />
                                        <button type="submit">Comentar</button>
                                        {responseComment.show ? (
                                            <span
                                                style={{
                                                    color: responseComment.error ? '#dc3545' : '#03a062'
                                                }}
                                            >{responseComment.message}</span>
                                        ) : ''}
                                    </form>
                                </div>
                                {postLead ? (
                                    <>
                                        <span className={style.btnLogin}>logado com {postLead.email}</span>
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className={style.btnLogin}
                                            style={{
                                                border: '0',
                                                margin: '0 .4rem',
                                                padding: '.1rem .2rem',
                                                borderRadius: '50%'
                                            }}
                                        >x</button>
                                    </>
                                ) : (
                                    <a
                                        className={style.btnLogin}
                                        onClick={() => setIsOpenModalLogin(true)}
                                    >Faça login clicando aqui!</a>
                                )}

                                <div style={{
                                    marginTop: '1rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflowX: 'auto'
                                }}>
                                    {dataComments.comments.map(comment => {
                                        let breadcrumbs = String(comment.id);
                                        if (comment.breadcrumbs) {
                                            breadcrumbs = `${comment.breadcrumbs}-${comment.id}`;
                                        }
                                        let isLiked = comment.ratings &&
                                            comment.ratings.length > 0 &&
                                            comment.ratings[0].like == '1';
                                        let isUnliked = comment.ratings &&
                                            comment.ratings.length > 0 &&
                                            comment.ratings[0].like == '-1';

                                        return <CardComment
                                            comment={comment}
                                            isLiked={isLiked}
                                            isUnliked={isUnliked}

                                            postLead={postLead}

                                            handleAnswerTo={handleAnswerTo}
                                            handleLike={handleLike}
                                            handleDeleteComment={handleDeleteComment}
                                            loadAnswers={loadAnswers}
                                            handleMoreComments={handleMoreComments}

                                            key={comment.id}
                                        />;
                                    })}
                                    {dataComments.comments.length === 0 ? (
                                        <small style={{
                                            textAlign: 'center',
                                            color: '#99a'
                                        }}>Sem comentários</small>
                                    ) : ''}
                                    {haveMoreComments && dataComments.total > dataComments.comments.length ? (
                                        <a
                                            className={style.btnLogin}
                                            onClick={() => handleMoreComments(
                                                dataComments.comments.length,
                                                null,
                                                () => setHaveMoreComments(false)
                                            )}
                                            style={{
                                                textDecoration: 'underline',
                                                textAlign: 'center',
                                                marginTop: '.4rem'
                                            }}
                                        >Mais Comentários</a>
                                    ) : ''}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <Footer content={footer} />
            <ModalLoginLead
                isOpen={isOpenModalLogin}
                closeModal={() => setIsOpenModalLogin(false)}
                owner_id={post.post.user_id}
                handleStorageLead={handleStorageLead}
            />
        </div>
    )
}
export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const theme_slug = process.env.THEME_SLUG;
    const access_token = process.env.USER_ACCESS_TOKEN;
    if (!ctx.params) throw new Error('Página não encontrada');
    // BEGIN:: REQUEST PAGE
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
    const footer = elements.footer.data;

    const reponsePost = await cms.get(`post/show/${ctx.params.id}`, {
        headers: { 'access-token': access_token }
    });
    if (!reponsePost || !reponsePost.data.result) throw new Error('Impossível carregar a página.');
    const post = reponsePost.data.response;


    return {
        props: {
            page_data,
            post,
            footer
        }
    }
}