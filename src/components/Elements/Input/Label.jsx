const Label = (props) =>{
    const {children, htmlFor} = props;
    return(
        <label 
        htmlFor={htmlFor} 
        className="absolute left-3 bg-white px-1 text-gray-500 transition-all -top-3.5 text-sm">
            {children} <span className="text-red-600 text-base">*</span>
        </label>           
    );
}

export default Label