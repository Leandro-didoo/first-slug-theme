import { Posts } from '../../types/typesdef';
import { Clock } from '../Icons';
import style from './style.module.scss';


type Props = {
    post: Posts
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
                  {post.slug}
              </small>
              <p className={style.title}>{post.title}</p>
              <div className={style.contnt} dangerouslySetInnerHTML={{ __html: `${post.content}` }} />
          </div>

        </div>
    )
}