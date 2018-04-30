# Build and Test

## Start
1. Fork repo

## To test locally
*No GCP account required if using binary*

1. Install [container builder local](https://github.com/GoogleCloudPlatform/container-builder-local)
2. Run `container-builder-local --config=cloudbuild-local.yaml --dryrun=false .`

## To test in the cloud
*GCP account required*

1. Run `gcloud container builds submit --config=cloudbuild.yaml .`

## To test on SauceLabs
*GCP and SauceLab accounts required*

1. Run `gcloud container builds submit --config=cloudbuild-saucelabs.yaml --substitutions=_USERNAME=<SAUCELABS_USERNAME>,_ACCESS_KEY=<SAUCELABS_ACCESS_KEY> .`

## To test with different versions of node
*Defaults to node 8.11.0. Supported versions: 6.14.0, 9.10.0*

1. Pass in _NODE version: `--substitutions=_NODE=<NODE_VERSION>`