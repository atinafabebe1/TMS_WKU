import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have a Role to access the requested page.</p>
            <div>
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default Unauthorized