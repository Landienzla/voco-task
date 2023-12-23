<a href="https://www.postman.com/gold-comet-617949/workspace/new-team-workspace/api/dc8cf5a1-1fd9-4b61-9310-6bf4449d6cc2?action=share&creator=17655551" target="_blank">Postman API Doc</a>

<h2>Getting Started</h2>
<ol>
    <li><strong>Clone the Repository</strong>
        <pre><code>git clone https://github.com/Landienzla/voco-task.git
cd voco-task</code></pre>
    </li>
     <li><strong>Create and Fill the .env File</strong>
    </li>
    <li><strong>Install Dependencies</strong>
        <pre><code>npm install</code></pre>
    </li>
    <li><strong>Set up MONGODB Database</strong>
        <p>Make sure you have MONGODB installed and running. Update the database connection details in the configuration file.</p>
    </li>
    <li><strong>Start the Development Server</strong>
        <pre><code>npm run develop</code></pre>
    <li><strong>Build and Run the Application</strong>
    <ol>
        <li>Build the application by running:
            <pre><code>npm run build</code></pre>
        </li>
        <li>Start the application in production mode using:
            <pre><code>npm run start:prod</code></pre>
        </li>
    </ol>
</li>

</ol>

<p>Your application should now be running at <a href="http://localhost:3001">http://localhost:3001</a>.</p>

<h2>Directory Structure</h2>
<p>Briefly describe the layout of your project, e.g.,</p>
<ul>
    <li><code>src/</code>: All the TypeScript server code resides here.
        <ul>
            <li><code>routes/</code>: Contains Express route definitions for the various API endpoints.</li>
            <li><code>controllers/</code>: Houses the logic for handling requests and responses for each route. Controllers are responsible for interfacing between the API routes and the database models.</li>
            <li><code>middlewares/</code>: Includes middleware functions used across the application. Middlewares are used for tasks like request processing, authentication, error handling, and other common functions that are executed during the HTTP request-response cycle.</li>
            <li><code>utils/</code>: Utility functions that provide common functionalities used throughout the application, such as helper functions, data formatting, and other shared logic.</li>
        </ul>
    </li>
</ul>
