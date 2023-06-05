./scripts/docker_build_amd64.sh

(
  cd docker && \
  rm -rf dist
  mkdir dist
  docker save methompson-blog-frontend -o ./dist/methompson-blog-frontend.tar
)