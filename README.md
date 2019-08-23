# AngularFirestoreK8s
### AFK - The tech stack for lazy devs

Self-replicating blog I whipped up with Angular and Firebase. (Only GitHub clone works so far) The intent is to get this fully self-replicatable so that a user can clone, build a deploy this website to any Kubernetes cluster. Currently the issue is finding a Docker build agent and pushing to Docker Hub, but otherwise Digital Ocean and other cloud providers have the API's needed to deploy right from the client-side site. Example: [beshoyhanna.com](https://beshoyhanna.com)

[![Run on Google Cloud](https://storage.googleapis.com/cloudrun/button.svg)](https://console.cloud.google.com/cloudshell/editor?shellonly=true&cloudshell_image=gcr.io/cloudrun/button&cloudshell_git_repo=https://github.com/behoyh/AngularFirestoreK8s.git)

### Prerequisites
* Google Cloud Firestore account
* Docker Hub (or another Docker registry)
* A working Kubernetes cluster AKS, Amzon AKE, GKE, Digital Ocean Kubernetes (DOK)

### Building
###### You'll need Docker installled and a Docker Hub or another docker registry. 

`docker build -rm -f "Dockerfile" -t <version> .`

### Tagging

`docker tag <version> <registry>/<username>/<name>/<version>`

`docker tag <version> <registry>/<username>/<name>/latest`

### Pushing

`docker push <registry>/<username>/<name>/<version>`

`docker push <registry>/<username>/<name>/latest`

### Deployment Option 1
Now you are ready to deploy to your favroite Kubernetes cluster!

Make sure you update afk-kube.yaml to point to your Docker registry.

Against your favorite kubernetes cluster, run

`kubectl create -f afk-kube.yaml`

Check on the hosted IP with

`kubectl get services`

and on your pods with

`kubectl get pods`

That's it! Enjoy your new blog! 

### Deployment Option 2 

Swap the link in the "Run on Google Cloud" button above to your public git repo and press it! [more info](https://cloud.google.com/blog/products/serverless/introducing-cloud-run-button-click-to-deploy-your-git-repos-to-google-cloud)

### Deployment Option 3 (for testing only)

As of Angular CLI 8.3.0, run [ng deploy](https://angular.io/guide/deployment).

## Project Status
---
#### Blog App
- [x] Basic blog app functional
- [x] WYSIWYG editor integration for creating posts
- [ ] Image upload / Video Streaming via OwnCloud or Google's Firebase platform
- [ ] Create site real-time chat via Firebase
- [ ] Allow users to add comments
- [ ] User management

#### Auto-Replication
- [x] Setup wizard to auto-replicate blog
- [x] Clone on Github via API
- [ ] Automate builds programaticaly (Docker Hub)
- [ ] Configure Firebase Rules
- [ ] Deploy shiny new app to Kubernetes cluster, and make yaml file availiable for download.
- [ ] Setup domain host
- [ ] use Let's Encrpt API to secure site with SSL
- [ ] [Helm](https://helm.sh/) Chart


#### Miscellaneous
- [ ] Cleanup UI/UX
- [ ] Cleanup Code
- [ ] Update environment.ts file after GitHub clone with Firebase variables

## Timeline:
![alt text](https://pbs.twimg.com/media/DwmvXl8UYAAxYAi.jpg:large "No one can stop me")
