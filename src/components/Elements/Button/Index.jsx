
const Button = (props) =>{
    const {children, variant = "bg-black", toLink}= props;
    return(
        <button
        className={`h-10 px-6 font-semibold rounded-md ${variant} text-white`}
        >       
        {children}               
        </button>
    )
}

export default Button