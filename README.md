# Project FIT

Project FIT is a dynamic web application designed to help users monitor their weight and record their food intake. 

The application uses advanced web-scraping to pull real-time nutritional information directly from three of Ireland's largest supermarkets (Tesco, Dunnes Stores and Aldi). As a result, users can easily create meals where the nutritional information for each individual food item is automatically calculated and pre-populated.

## Technologies Used

- **Express:** Express is used to build the application's server-side. It provides a framework for creating and handling HTTP requests and routes.

- **Node:** Node is used as the runtime environment for the application. It allows server-side JavaScript execution and facilitates the handling of asynchronous operations.

- **Angular:** Angular is used to create the client-side of the application. It provides a robust framework for building dynamic and responsive web user interfaces that interact with the Express-based server.

- **Cloud Firestore:** Cloud Firestore is used as the primary database for the application. It stores all of the application's text-based data.

- **Cloudinary:** Cloudinary is used as the secondary database for the application. It stores all of the application's image-based data.

- **Firebase Auth:** Firebase Auth is used to implement user authentication in the application. It allows users to sign in and securely access the application's features and data.

## Prerequisites

### Software Installations

Before running the application, the following software must be installed:

- [Node](https://nodejs.org/)
- [Angular Cli](https://angular.io/cli)

### Environment Variables

Before running the application, the following environment variables must be set, these variables should be stored in a `.env` file at the project root:

| **Environment Variable**          | **Description**                                     |
|-----------------------------------|-----------------------------------------------------|
| **CLOUDINARY_API_KEY**            | The API key for Cloudinary.                         |
| **CLOUDINARY_API_SECRET**         | The API secret for Cloudinary.                      |
| **CLOUDINARY_CLOUD_NAME**         | The cloud name for Cloudinary.                      |
| **DEV_SERVER_URL**                | The URL of the development server.                  |
| **FIREBASE_API_KEY**              | The API key for Firebase.                           |
| **FIREBASE_APP_ID**               | The application ID for Firebase.                    |
| **FIREBASE_AUTH_DOMAIN**          | The authentication domain for Firebase.             |
| **FIREBASE_MEASUREMENT_ID**       | The measurement ID for Firebase.                    |
| **FIREBASE_MESSAGING_SENDER_ID**  | The sender ID for Firebase.                         |
| **FIREBASE_PROJECT_ID**           | The project ID for Firebase.                        |
| **FIREBASE_STORAGE_BUCKET**       | The storage bucket for Firebase.                    |
| **OPENAI_API_KEY**                | The API key for OpenAI.                             |
| **OPENAI_ORG_ID**                 | The organisation ID for OpenAI.                     |
| **PROD_SERVER_URL**               | The URL of the production server.                   |
| **SERVER_PORT**                   | The port on which the server should listen.         |
| **WHITELISTED_CORS_URLS**         | A list of URLs allowed for Cross-Origin requests.   |

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/fiachrahealy/Project_FIT.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Project_FIT
    ```

3. Install the dependencies for both the server and client:

    ```bash
    npm install
    ```

4. Create the `.env` file (see prerequisites section above for file contents):

    ```bash
    cat > .env
    ```

5. Set up the client environment:

    ```bash
    npm run client-setup
    ```

6. Start the server and the client:

    To start both the server and the client:

    ```bash
    npm start
    ```

    To start the client only:

    ```bash
    npm run client
    ```

     To start the server only:

    ```bash
    npm run server
    ```

7. Access the application:

    Access the client in a web browser at http://localhost:4200.

    Access the server in a web browser or API platform at http://localhost:[SERVER_PORT].

## Features

### Authentication

When a user navigates to the web application for the first time, they are presented with a landing page prompting them to sign in. As the application is invite-only, sign-up of new users is done manually by the application administrator from the Firebase console.

When a user signs in, authentication is carried out client-side by Firebase Auth. If the sign-in is successful, the user is redirected to their dashboard, and a Firebase session cookie is assigned to the user’s browser. If the sign-in is unsuccessful, an error message is displayed to the user. Every time the user makes a request to the server, a unique token accompanies the request. This token is used to identify the user on the server and ensure they are signed in and authorised to make such a request.

### Recording Food Intake

A user can record a meal in their food diary directly from the application's navigation bar by clicking "Record Meal". Upon doing so, a pop-up appears, prompting the user to select a meal from a drop-down list and a date for the entry. If the user chooses the current date, they'll see their new meal entry appear immediately in their food diary on their dashboard. The food diary will automatically deduct the new meal's calories, protein, sugar, salt, fat, and saturated fat from the totals (calculated from the user's specified nutritional goals) for that day.

### Monitoring Weight Change

A user can record their weight on the weight graph directly from the application's navigation bar by clicking "Record Weight". Upon doing so, a popup appears, prompting the user to enter a weight in KG and a date for the entry. After closing the popup, the user will see their new weight appear immediately on the weight graph on their dashboard. The graph will automatically adjust to show the most relevant data and update the user's current weight, BMI, and total weight loss to date on the dashboard.

### Creating Meals

A user can create a meal directly from the application's navigation bar by clicking "Create Meal". Upon doing so, a pop-up appears. On the left-hand side of this popup, the user can manually enter food data into the "Add Item" form. Here, they can record the item's name, the amount of the item being added to the meal, and the item's nutritional information. Clicking the "Add Item" button adds the item to the meal and updates the total meal calories and other nutritional information shown in the "Create Meal" form. When the user has added all of the meal's items, they can name the meal and upload an image of the meal from their device. Clicking the "Save Meal" button will create the meal using all of the added items.

### Searching for Food Items

To make creating meals easier, a user can use the search functionality on the right-hand side of the "Create Meal" popup to pre-populate the "Add Item" form with a specific food item's data. A user searches for an item using the search bar, and the "Search Results" area, which contains three columns (one for Tesco, one for Dunnes Stores, and one for Aldi), will populate with the top ten results for that search query on each of the supermarkets' websites. The user can choose an item they wish to add to their meal, and the item's name and nutritional data will prepopulate in the "Add Item" form. Should the user wish to increase the amount of the item in their meal, the application will recalculate the nutritional information based on the new amount inputted by the user.

### Updating Information

A user can update their personal and nutritional information directly from the application's navigation bar by clicking "Settings". Here, the user can modify their name, their height (used to calculate their BMI), and their current nutritional goals (target calories, protein, sugar, salt, fat, and saturated fat).

## Authors

- [Fiachra Healy](https://www.linkedin.com/in/fiachrahealy/)

## Disclaimer

This project is a personal hobbyist endeavor. It was not created for commercial gain. The application is not live on the internet. Any data obtained through the use of web-scraping for this project was used for personal, educational, and non-commercial purposes only.

If you clone or fork this repository, you are expected to adhere to the terms and conditions of the websites scraped by this application. You are responsible for your use of the code, the data it generates, and its compliance with relevant laws and regulations.

## Acknowledgments

The following is a list of 3rd party websites, libraries and tools used in the production of Project FIT:

- [Aldi](https://groceries.aldi.ie/)
- [Angular](https://angular.io/)
- [Bootstrap](https://getbootstrap.com/)
- [ChartJS](https://www.chartjs.org/)
- [Cloudinary](https://cloudinary.com/)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)
- [Dunnes Stores](https://dunnesstoresgrocery.com/)
- [Express](https://expressjs.com/)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Font Awesome](https://fontawesome.com/)
- [GitHub](https://github.com/)
- [Multer](https://www.npmjs.com/package/multer)
- [Node](https://nodejs.org/en/)
- [OpenAI](https://openai.com/)
- [Sass](https://sass-lang.com/)
- [Tesco](https://www.tesco.ie/)
