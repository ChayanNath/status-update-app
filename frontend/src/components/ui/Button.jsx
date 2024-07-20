const Button = ({ label, onClick }) => {
  return (
    <button
      className="border rounded-md border-gray-950 py-2 px-4"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
