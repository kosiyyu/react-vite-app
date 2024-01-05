function Home() {

    return (
        <div className="container">
            <hgroup>
                <h1>Home</h1>
                <h2>Welcome to home page!</h2>
            </hgroup>
            <hr />
            <hgroup>
                <h3>✨SciJourDex✨</h3>
                <p>The project comprises two essential segments: the backend and the frontend. Project overview:</p>
            </hgroup>
            <hgroup>
                <h3>Backend</h3>
                <p>The REST API is built on Java-based Spring, coupled with PostgreSQL as the database. It is designed for efficiently filtering and managing scientific journals using data from the Polish Ministry of Education. The API provides file upload capabilities for physical storage, with metadata carefully managed within the database. Additionally, users can manage tags associated with the scientific journals.</p>
            </hgroup>
            <hgroup>
                <h3>Frontend</h3>
                <p>The frontend, developed with React, Pico CSS, and JavaScript, seamlessly integrates with the backend REST. Users can experience an intuitive interface for scientific journal management, which includes features such as data search and filtering, file uploads, precise metadata control, as well as journal and tag management.</p>
            </hgroup>
        </div>
    )
}

export default Home