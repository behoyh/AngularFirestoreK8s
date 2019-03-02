# AngularFirestoreK8s
### AFK - The tech stack for lazy devs

Self-replicating blog I whipped up with Angular and Firebase. (Only GitHub clone works so far) The intent is to get this fully self-replicatable so that a user can clone, build a deploy this website to any Kubernetes cluster. Currently the issue is finding a Docker build agent and pushing to Docker Hub, but otherwise Digital Ocean and other cloud providers have the API's needed to deploy right from the client-side site.

### Building
###### You'll need Docker installled and a Docker Hub or another docker registry. 

`docker build -rm -f "Dockerfile" -t <version> .`

### Tagging

`docker tag <version> <registry>/<username>/<name>/<version>`

`docker tag <version> <registry>/<username>/<name>/latest`

### Pushing

`docker push <registry>/<username>/<name>/<version>`

`docker push <registry>/<username>/<name>/latest`

### Deploying
Now you are ready to deploy to your favroite Kubernetes cluster!

Make sure you update afk-kube.yaml to point to your Docker registry.

Against your favorite kubernetes cluster, run

`kubectl create -f afk-kube.yaml`

Check on the hosted IP with

`kubectl get services`

and on your pods with

`kubectl get pods`

That's it! Enjoy your new blog! 


