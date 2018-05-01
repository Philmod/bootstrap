# Build and Test

## Start
1. Fork repo
2. Build chromium-xvfb images for headless browser testing  
`gcloud container builds submit --config=cloudbuild-baseimages.yaml .`

*For final version these images will be pre-built and cached on worker so you don't have to create them*

## To test locally
*No GCP account required if using binary*

1. Install [container builder local](https://github.com/GoogleCloudPlatform/container-builder-local)
2. Run Docker
3. Run `container-builder-local --config=cloudbuild-local.yaml --dryrun=false .`

*For faster builds `docker pull` the images from cloudbuild.yaml "Pull Images" step to cache them locally*

## To test in the cloud
*GCP account required*

1. [Create a GCP project and install the Cloud SDK](https://cloud.google.com/container-builder/docs/quickstart-docker)
2. Create a GCS bucket for caching  
`gsutil mb -l us-east1 gs://<YOUR_BUCKET_NAME>/`
3. Run `gcloud container builds submit --config=cloudbuild.yaml --substitutions=_BUCKET=<YOUR_BUCKET_NAME> .`

*Bootstrap could provide a publically availablly bucket so contributors don't need one. Step 2 and 3 would collapse to be `gcloud container builds submit --config=cloudbuild.yaml .`*

## To test on SauceLabs
*GCP and SauceLab accounts required*

1. Run `gcloud container builds submit --config=cloudbuild-saucelabs.yaml --substitutions=_USERNAME=<SAUCELABS_USERNAME>,_ACCESS_KEY=<SAUCELABS_ACCESS_KEY> .`

## To test with different versions of node
*Defaults to node 8.11.0. Supported versions: 6.14.0, 9.10.0*

1. Pass in _NODE version, e.g. `gcloud container builds submit --config=cloudbuild.yaml --substitutions=_NODE=<NODE_VERSION>,_BUCKET=<YOUR_BUCKET_NAME> .`

## TODOs for production

* add chromium, ruby, and jekyll builders to [cloud builders](https://github.com/GoogleCloudPlatform/cloud-builders) and cache on worker
* create shared GCS cache
* update GCS cache fetch and push steps to feel more native
* combine cloudbuild-local.yaml and cloudbuild.yaml into one build config
* add container builder local to homebrew for easier local installation without a gcp account
* create a working main.flow file and use that + GitHub app for onboarding and automated triggering flow