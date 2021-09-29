import { Clock } from '../Icons';
import style from './style.module.scss';

type Blog = {
    author: string,
    content: string,
    created_at: Date,
    date_formatted: string,
    excerpt: string,
    id: string,
    image: string,
    published: number,
    slug: string,
    title: string,
    updated_at: Date,
    user_id: string,
    wallpaper: string,
}
type Props = {
    post: Blog
}

export const CardBlog = ({post}:Props) => {
    return (
        <div className={style.container}>
          <div className={style.img}>
              <img src={post.image} alt={post.title} />
          </div>
          <div className={style.info}>
              <small>
                  <Clock width={10} color="red" />
                  {post.date_formatted}
              </small>
              <p className={style.title}>{post.title}</p>
              <div className={style.contnt} dangerouslySetInnerHTML={{ __html: `${post.content}` }} />
          </div>

        </div>
    )
}