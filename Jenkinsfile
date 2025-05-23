pipeline {
    agent any

    environment {
        IMAGE_NAME = "devopsdevxonic/mawrid-user"  // Your Docker Hub repo
        DOCKER_CREDENTIALS_ID = "DockerR"          // Docker Hub credentials stored in Jenkins
        REPO_URL = "git@github.com:MrHTD/nextjs.git"
        DIRECTORY = "development"
    }

    stages {
        stage("Checkout") {
            steps {
                git branch: "docker", url: "${REPO_URL}"
            }
        }

        stage("Build and Push Docker Image") {
            steps {
                script {
                    def tag = "${BUILD_NUMBER}"
                    def fullImage = "${IMAGE_NAME}:${env.BRANCH_NAME}-${tag}"

                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        def image = docker.build(fullImage, "--build-arg BRANCH=${BRANCH_NAME} .")
                        image.push()
                    }
                }
            }
        }
    }
}