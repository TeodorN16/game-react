import { commentApi } from "../../api";
import request from "../../utills/request";

export default function CreateComment({ user, accessToken, gameId, onCreate }) {
  const addCommentAction = async (formData) => {
    const newComment = {
      text: formData.get("text"),
      author: user?.email,
      game_id: gameId,
    };

    try {
      await commentApi.create(newComment, accessToken);
      onCreate();
    } catch (error) {
      alert(error);
      return;
    }
  };
  return (
    <article className="create-comment">
      <label>Add new comment:</label>
      <form className="form" action={addCommentAction}>
        <textarea name="text" placeholder="Comment......"></textarea>
        <input className="btn submit" type="submit" value="Add Comment" />
      </form>
    </article>
  );
}
