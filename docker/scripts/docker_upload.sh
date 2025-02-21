# appName=methompson_blog_frontend
# registryUrl=docker.kakomu.com

# docker load -i docker/dist/$appName.tar
# docker tag $appName $registryUrl/$appName
# docker push $registryUrl/$appName

appName=methompson_blog_frontend
registryUrl=docker.kakomu.com

docker load -i docker/dist/$appName.tar
docker tag $appName $registryUrl/$appName
docker push $registryUrl/$appName
