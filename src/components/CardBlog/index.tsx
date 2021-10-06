import { Posts } from '../../types/typesdef';
import { Clock } from '../Icons';
import style from './style.module.scss';
import Link from 'next/link';

type Props = {
    post: Posts,
    slug: string,
}

export const CardBlog = ({post, slug}:Props) => {
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
              <Link href={`/${slug}/blog/${post.slug}`}>
                <a className={style.title}>{post.title}</a>
              </Link>
              <div className={style.contnt} dangerouslySetInnerHTML={{ __html: `${post.content}` }} />
          </div>

        </div>
    )
}