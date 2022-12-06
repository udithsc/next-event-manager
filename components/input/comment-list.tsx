import Comment from '../../models/Comment';
import classes from './comment-list.module.css';

interface CommentListProps {
  items: Comment[];
}

function CommentList({ items }: CommentListProps) {
  return (
    <ul className={classes.comments}>
      {items.map((item) => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
