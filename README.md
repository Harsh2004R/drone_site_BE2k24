<!-- # drone_site_BE2k24
Building this repo as a backend of my drone_site. -->
# drone_site_be2k24

Backend for drone_site

## Description

This is the backend for the drone site application. It provides various functionalities such as user authentication | mail sending | product |management | image handling | payment processing | and more...

## Folder and File Structure

##  drone_site_be2k24

```sh
drone_site_be2k24/
├── Config/
│ └── cloudnaryConfig.js
├── models/
│ ├── admin.product.model.js
│ ├── camera_drone.model.js
│ ├── image.model.js
│ ├── product.pages.model.js
│ ├── razorpay.model.js
│ └── user.model.js
├── routes/
│── EmailTemplates/
│   └── conf_payment.ejs 
│   └── welcomeEmail.ejs
│ ├── admin.routes.js
│ ├── camera_drone.routes.js
│ ├── cart.routes.js
│ ├── dynamic.pages.routes.js
│ ├── image.routes.js
│ ├── payment.routes.js
│ ├── product.routes.js
│ └── send.email.routes.js
├── .gitignore
├── index.js
├── .env
├── README.md
└── db.js -->
```
## Installation

1. Clone the repository
    ```sh
    git clone https://github.com/Harsh2004R/drone_site_BE2k24.git
    ```
2. Install dependencies
    ```sh
    cd drone_site_BE2k24
    npm install
    ```
3. Create a `.env` file in the root directory and add the following environment variables:
    ```
    JWT_SECRET=<your_jwtSecret>
    PORT=<your_port>
    LOCAL_IP=<your_local_ip>
    MONGO_URL=<your_mongodb_uri>
    CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
    CLOUDINARY_API_KEY=<your_cloudinary_api_key>
    CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
    EMAIL_USER=<senders_email>
    EMAIL_PASS=<app_password> (get it from google security)
    RAZORPAY_KEY_ID=<your_razorpay_key_id>
    RAZORPAY_KEY_SECRET=<your_razorpay_key_secret>
    ```

## Running the Server

Start the server with nodemon:
```sh
npm run server 
```

## Routes
#### User Routes
- `POST /users/register` - Register a new user
- `POST /users/login` - Login a user
- `POST /users/:id` - Get single user information.
### Admin Routes
- `GET /admin/products` - Get all products
POST /admin/products - Add a new product
### Camera Drone Routes
- `GET /camera_drones/get/aerial ` Get all Aerial camera drones data.
- `GET /camera_drones/get/immersive ` Get all immersive camera drones data.
- `POST /camera_drones/add/aerial` Add new Aerial camera drone list.
- `POST /camera_drones/add/immersive` Add new immersive camera drone list.
### Image Routes
- `GET /api/images/get` - Get all images saved in cloudnary.
- `POST /api/images/upload` - Upload a new image on cloudnary.
### Product Routes
- `GET /api/all/data/get` - Get all products
- `GET /api/all/data/get/products` - Get all products based on sort and category (use query to pass)
- `GET /api/all/data/:id` - Get single product information.
- `GET /api/all/data/:id/random` - Get any three product information saved in data base.
### Email Routes
It's not a route we can say I have build sendEmail function their that's all.
### Dynamic Pages Routes
- `GET /api/page/:id` - Get dynamic pages based on product ID.
- `POST /api/pages/info` - Add a new dynamic page
### Payment Routes
-  `POST /api/checkout` - This request will create a order for user.
-  `POST /api/paymentVerification` - This request will verify user's order and match some razorpay credientials.
-  `POST /api/sendPaymentMail` - This request will send you a conformation mail to your registered email.
## Database Connection
**The database connection is established in db.js using MongoDB. Ensure your MongoDB URI is correctly set in the .env file.**

### License
  This project is licensed under the ISC License - see the LICENSE file for details.

### Author
Harsh2004R

### Repository
GitHub Repository