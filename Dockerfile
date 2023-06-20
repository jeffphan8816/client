# Use an official Node.js runtime as the base image
FROM node:18 as build-stage

# Set the working directory in the container
WORKDIR /client

# Copy package.json and package-lock.json to the container
COPY package*.json .

# Install dependencies
RUN npm install

ENV NODE_ENV=development
ENV REACT_APP_STRIPE_PUBLIC_KEY=pk_test_51MwbYWDZhLa238hLQgae6bzkliuSe01YV3cJ0OP7ic3i6ZiFoakMFkzRdMvaof6eLr1hGrewZCn84IEITXzppYev0011fZFAuz
ENV REACT_APP_BACKEND_URL=http://54.176.213.148:1338


# Copy the entire project to the container
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight Nginx image as the base for serving the app
FROM nginx:1.21

# Copy the build files from the build-stage to the Nginx server directory
COPY --from=build-stage /client/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
