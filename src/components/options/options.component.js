import './options.styles.css';

export const Options = ({handleToggle}) => (
    <div className="options">
        <button className="btn btn-info buttons" component="button" type="button" onClick={handleToggle}>Add New User</button>
    </div>
)