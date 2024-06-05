const Input = (props) =>{
    const { type,placeholder, name, value, onChange } = props;
 return (
    <input 
        type={type}
        className="text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-50" 
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        id={name}
    />
 )
}

export default Input