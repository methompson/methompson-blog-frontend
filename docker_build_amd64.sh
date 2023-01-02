rm -rf dist
rm -rf docker/artifacts
mkdir -p docker/artifacts

npm run build

mv dist docker/artifacts

(
  cd docker && \
  docker buildx build \
  --platform=linux/amd64 \
  -t methompson-blog-frontend .
)