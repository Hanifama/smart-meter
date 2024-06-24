const Input = (props) => {
    const { type, placeholder, name, value, onChange } = props;
    return (
        <input 
            type={type}
            className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            id={name}
        />
    );
}

export default Input;
