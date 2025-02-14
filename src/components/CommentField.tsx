import "@/styles/commentField.scss";

export default function CommnetField() {
  return (
    <div className="comment_field">
      <textarea rows={5} />
      <div>
        <input type="text" placeholder="닉네임" />
        <input type="text" />
      </div>
    </div>
  );
}
