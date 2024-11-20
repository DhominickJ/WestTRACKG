function RequestBtn(text: String) {
  return (
    <button
      className="Button"
      style={{ width: 312, height: 60, position: "relative" }}
    >
      <p
        className="RequestADocument"
        style={{
          left: 28,
          top: 14,
          position: "absolute",
          textAlign: "center",
          color: "white",
          fontSize: 24,
          fontFamily: "Poppins",
          fontWeight: "600",
          wordWrap: "break-word",
        }}
      >
        {text}
      </p>
    </button>
  );
}
