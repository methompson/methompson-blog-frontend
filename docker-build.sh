rm -rf dist
rm -rf docker/artifacts
mkdir -p docker/artifacts

npm run build

mv dist docker/artifacts

(
  cd docker && \
  docker build -t methompson-blog-frontend .
)