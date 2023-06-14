import css from "./Company.module.css";

const Company = ({logo_path, name}) => {
    return (
        <div className={css.company}>
            <div className={css.img_container}>
                <img src={logo_path} alt={name}/>
            </div>
            <span>{name}</span>
        </div>
    );
};

export {Company};