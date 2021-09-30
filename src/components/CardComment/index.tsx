import { useState } from "react";
import { Comment, PostLead } from "../../types/typesdef";
import styles from "./style.module.scss";

interface CardCommentProps{
  comment: Comment;
  isLiked: boolean;
  isUnliked: boolean;
  postLead: PostLead | null;

  handleAnswerTo: (comment: Comment) => void;
  handleLike: (comment: Comment, like: '-1' | '0' | '1') => void;
  handleDeleteComment: (comment: Comment) => void;
  loadAnswers: (comment: Comment) => void;
  handleMoreComments: (skip: number, father: Comment | null, disableBtnMore: () => void) => void;
}

const outlineLikeSvg = <svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 24 24' fill='#747480' width='18' height='18'><path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"></path></svg>;
const outlineUnlikeSvg = <svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 24 24' fill='#747480' width='18' height='18'><path d="M20 3H6.693A2.01 2.01 0 0 0 4.82 4.298l-2.757 7.351A1 1 0 0 0 2 12v2c0 1.103.897 2 2 2h5.612L8.49 19.367a2.004 2.004 0 0 0 .274 1.802c.376.52.982.831 1.624.831H12c.297 0 .578-.132.769-.36l4.7-5.64H20c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm-8.469 17h-1.145l1.562-4.684A1 1 0 0 0 11 14H4v-1.819L6.693 5H16v9.638L11.531 20zM18 14V5h2l.001 9H18z"></path></svg>;
const solidLikeSvg = <svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 24 24' fill='#747480' width='18' height='18'><path d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"></path></svg>;
const solidUnlikeSvg = <svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 24 24' fill='#747480' width='18' height='18'><path d="M20 3h-1v13h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4 16h7l-1.122 3.368A2 2 0 0 0 11.775 22H12l5-5.438V3H6l-3.937 8.649-.063.293V14a2 2 0 0 0 2 2z"></path></svg>;
const trashSvg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{ fill: '#dc3545',transform: '',msFilter: ''}}><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>;


export function CardComment({
  comment,
  isLiked,
  isUnliked,

  postLead,

  handleAnswerTo,
  handleLike,
  handleDeleteComment,
  loadAnswers,
  handleMoreComments
}: CardCommentProps) {
  const [haveMoreComments, setHaveMoreComments] = useState(true);

  async function handleMoreAnswers(){
    if(comment.answers)
    
    handleMoreComments(
      comment.answers.comments.length,
      comment,
      () => setHaveMoreComments(false)
    );
  }
  return (
    <div className={styles.contentComment} id={`comment-${comment.id}`}>
      <span className={styles.commentTagUser}>
        {comment.author.substr(0, 2)}
      </span>
      <div className={styles.commentInfo}>
        <strong className={styles.commentAuthor}>
          {comment.author}
        </strong>
        <time className={styles.commentTimestamp}>
          {comment.date_formatted}
        </time>
        <div className={styles.commentBody}>
          {comment.content}
        </div>
        <div className={styles.commentActions} id={`comment-actions-${comment.id}`}>
          <a
            href="#answer-to"
            className={styles.commentAnswer}
            onClick={() => handleAnswerTo(comment)}
          >Responder</a>
          <a
            href="javascript:;"
            onClick={() => handleLike(comment, isLiked ? '0' : '1')}
            className={styles.commentLike} title="Curtir"
          >
            {comment.num_likes}
            {isLiked ? solidLikeSvg : outlineLikeSvg}
          </a>
          <a
            href="javascript:;"
            onClick={() => handleLike(comment, isUnliked ? '0' : '-1')}
            className={styles.commentUnlike} title="Descurtir"
          >
            {comment.num_unlikes}
            {isUnliked ? solidUnlikeSvg : outlineUnlikeSvg}
          </a>
          {postLead && postLead.id == comment.post_lead_id ?
            <a
              href="javascript:;"
              className={styles.commentTrash}
              onClick={() => handleDeleteComment(comment)}
            >{trashSvg}</a>
            : ''}
          {comment.num_answers > 0 ? (
            <span style={{ flex: 1, textAlign: 'right' }} className={styles.seeAnswers}>
              <a href="javascript:;" onClick={() => loadAnswers(comment)}>
                Ver Respostas(<span>{comment.num_answers}</span>)
              </a>
            </span>
          ):''}
        </div>
        <div className={styles.commentResponses}>
          {comment.answers && comment.answers.comments.length > 0 ? (<>
            {comment.answers.comments.map(comment => {
              let breadcrumbs = String(comment.id);
              if(comment.breadcrumbs){
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
            {haveMoreComments && comment.answers.total > comment.answers.comments.length ? (
              <a
                className={styles.btnLogin}
                onClick={handleMoreAnswers}
                style={{
                  textDecoration: 'underline',
                  textAlign: 'center',
                  margin: '.4rem auto',
                  display: 'block'
                }}
              >Mais Comentários</a>
            ):''}
          </>) : ''}
        </div>
      </div>
    </div>
  );
}