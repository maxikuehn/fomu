const Button = ({ handleClick, label }) => {
  return (
    <div
      className="w-max px-10 py-3 rounded-lg  text-2xl bg-spotify-green"
      onClick={handleClick}
    >
      {label}
    </div>
  )
}
export default Button
