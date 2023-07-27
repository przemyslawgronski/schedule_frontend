import style from "./errorlist.module.css"

const ErrorList = ({errors}) => {
    // filter out undefined and null values
    errors = errors.filter(err => err !== undefined && err !== null);

    return (
        <div className={style.errorlist}>
            <div>
                <b>Wystąpił Błąd:</b>
                <ul>
                    {errors.map((err, idx) => <li key={idx}>{err}</li>)}
                </ul>
                <button onClick={() => window.location.reload()}>Odśwież stronę</button>
            </div>
        </div>
    )
}

export default ErrorList