import { useEffect, useState } from "react";
import request from "../../utills/request";
import CommentItem from "./comment-item/CommentItem";

export default function CommentList({ gameId }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    request(`/comments?game_id=eq.${gameId}`).then((result) =>
      setComments(result),
    );
  }, [gameId]);

  return (
    <div className="details-comments">
      <h2>Comments:</h2>
      <ul>
        {comments.map((comment) => (
          <CommentItem key={comment.id} {...comment} />
        ))}
      </ul>
      {/* <!-- Display paragraph: If there are no games in the database --> */}
      {/* <!-- <p class="no-comment">No comments.</p> --> */}
    </div>
  );
}
