

function Button({title, action}) {
  return (
    <button onClick={action} className="bg-accent text-primary font-poppins text-base md:text-lg  rounded-lg py-2 px-4 capitalize font-medium">{title}</button>
  )
}

export default Button