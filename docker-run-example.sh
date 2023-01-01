(
  cd docker && \
  docker run \
  --rm \
  -p 3000:80 \
  -e VITE_API_KEY=<Firebase API Key> \
  -e VITE_AUTH_DOMAIN=<Firebase Auth Domain> \
  -e VITE_PROJECT_ID=<Firebase Project ID> \
  -e VITE_STORAGE_BUCKET=<Firebase Storage Bucket> \
  -e VITE_MESSAGING_SENDER_ID=<Firebase Messaging Sender ID> \
  -e VITE_APP_ID=<Firebase App Id> \
  -e VITE_MEASUREMENT_ID=<Firebase Measurement ID> \
  -e VITE_API_URL=<Blog API Url Base> \
  --name methompson-blog-frontend \
  methompson-blog-frontend
)