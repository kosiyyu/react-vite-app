function Csv(){

    function handleSubmit(e){
        e.preventDefault()
        console.log(e.target.file.files[0])
    }

    return (
        <div className="container">
            <hgroup>
                <h1>Csv</h1>
                <h2>Welcome! Upload your Ministerial List of Scientific Journals in <code>.csv</code> format, to save it into the database.</h2>
            </hgroup>
            <hr></hr>
            <article>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <fieldset>
                        <label>Csv file</label>
                        <input name = "file" type="file" accept=".csv" />
                    </fieldset>
                    <button type="submit" >Send</button>
                </form>
            </article>
        </div>
    )
}

export default Csv