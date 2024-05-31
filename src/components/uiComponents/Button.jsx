

function Button({title, action}) {
  return (
    <button onClick={action} className="bg-accent hover:bg-accentDark text-primary font-poppins text-base md:text-base rounded-lg py-1 px-4 capitalize font-medium">{title}</button>
  )
}

export default Button