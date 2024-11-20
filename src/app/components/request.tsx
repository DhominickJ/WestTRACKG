interface RequestBtnProps {
  text: string;
}

function RequestBtn({ text }: RequestBtnProps) {
  return (
    <button
      className="btn-floating btn-large waves-effect waves-light bg-red-600"
      type="button"
    >
      <p className="text-center text-white left-5 top-5">{text}</p>
    </button>
  );
}

export default RequestBtn;
