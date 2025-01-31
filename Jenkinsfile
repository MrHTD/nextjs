pipeline {
    agent any
    environment {
        APP_NAME = "nextjs"
        REPO_NAME = "nextjs"
        REPO_URL = "git@github.com:MrHTD/nextjs.git"
        DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1328627802194444359/wKmS_3V7cbHvBZzQu8B2JB1A1Hqc9Q0-vj0mIQLqD5ZH_bQCXg5aj0LLdBEqQq4dGem5"
        PORT = '4011'
    }
    stages {
        stage("Git Pull or Clone") {
            steps {
                sshagent(['myubuntu']) {
                    echo "Pulling latest code from Git repository..."
                    sh """
                        ssh ${env.SSH_USER}@${env.SSH_HOST}<< ENDSSH
                        set -x

                        # Check if the development directory exists
                        if [ ! -d "/home/ahmed/development" ]; then
                            echo "Directory /home/ahmed/development does not exist. Creating it..."
                            mkdir -p "/home/ahmed/development"
                        fi

                        # Navigate to the directory (outside the if block so it always runs)
                        cd /home/ahmed/development || { echo "Failed to change directory"; exit 1; }

                        # List files to ensure we're in the right directory
                        echo 'Listing contents of development directory...';
                        ls -la;

                        # Check if the repository folder exists inside development
                        if [ ! -d '${REPO_NAME}' ]; then
                            echo 'Repository folder does not exist. Cloning repository...';
                            git clone ${REPO_URL} ${REPO_NAME};
                            cd ${REPO_NAME};
                            git switch ${env.BRANCH_NAME};
                        else
                            echo 'Repository folder exists. Checking if it is a Git repository...';
                            cd ${REPO_NAME};
    
                            # Check if it's a Git repository
                            if [ ! -d '.git' ]; then
                                echo 'Not a Git repository. Initializing repository...';
                                git init;
                                git remote add origin ${REPO_URL};
                                git fetch origin;
                                git switch ${env.BRANCH_NAME};
                            else
                                echo 'Directory is a Git repository. Pulling latest changes...';
                                git fetch origin;
                                git switch ${env.BRANCH_NAME};
                                git pull origin ${env.BRANCH_NAME};
                            fi
                        fi
                    """
                }
            }
        }
        stage("Build") {
            steps {
                sshagent(['myubuntu']) {
                    echo "Building the application..."
                    sh """
                        ssh ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
                        set -x
                        
                        export ${env.RUN_SUDO};

                        cd /home/ahmed/development/${REPO_NAME}

                        # Ensure Yarn is installed
                        if ! command -v yarn &> /dev/null; then
                            echo 'Yarn not found. Installing...'
                            sudo npm install -g yarn
                        else
                            echo 'Yarn is installed. Skipping installation...'
                            yarn --version;
                        fi

                        # Clean cache and reinstall dependencies
                        echo 'Cleaning node_modules and cache...';
                        yarn cache clean;

                        yarn install;

                        yarn build;
                    """
                }
            }
        }
        // stage("Test") {
        //     steps {
        //         sshagent(['myubuntu']) {
        //             echo "Running tests..."
        //             script {
        //                 try {
        //                     sh """
        //                         ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} uname -a << ENDSSH
        //                         set -x

        //                         cd /home/ahmed/development/${REPO_NAME};

        //                         yarn test;
        //                     """
        //                 } catch (Exception e) {
        //                     echo "Tests failed: ${e.message}"
        //                     discordSend(
        //                         description: "❌ Tests failed for ${APP_NAME}.",
        //                         footer: "Jenkins Pipeline Notification",
        //                         link: env.BUILD_URL,
        //                         result: "FAILURE",
        //                         title: env.JOB_NAME,
        //                         webhookURL: env.DISCORD_WEBHOOK
        //                     )
        //                     error("Test stage failed. Stopping pipeline.")
        //                 }
        //             }
        //         }
        //     }
        // }
        stage("Deploy") {
            steps {
                sshagent(['myubuntu']) {
                    echo "Deploying the application..."
                    sh """
                        ssh ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH

                        cd /home/ahmed/development/${REPO_NAME};

                        npx pm2 list | grep -w "${APP_NAME}"

                        # Check if the app is running
                        if npx pm2 list | grep -qw "${APP_NAME}"
                        then
                            echo "Application ${APP_NAME} is already running. Restarting it..."
                            npx pm2 restart "${APP_NAME}"
                        else
                            echo "Application ${APP_NAME} is not running. Starting it..."
                            npx pm2 start "PORT='${PORT}' yarn run start" --name '${APP_NAME}'
                        fi

                        npx pm2 save;

                        npx pm2 list | grep -w "${APP_NAME}"

                        npx pm2 logs ${APP_NAME} --lines 5 --nostream;
                    """
                }
            }
        }
    }
    post {
        success {
            discordSend description: "✅ Pipeline succeeded for ${APP_NAME}!", footer: "Jenkins Pipeline Notification", link: env.BUILD_URL, result: "SUCCESS", title: env.JOB_NAME, webhookURL: env.DISCORD_WEBHOOK
        }
        failure {
            discordSend description: "❌ Pipeline failed for ${APP_NAME}. Check logs!", footer: "Jenkins Pipeline Notification", link: env.BUILD_URL, result: "FAILURE", title: env.JOB_NAME, webhookURL: env.DISCORD_WEBHOOK
        }
        always {
            echo "Pipeline completed."
        }
    }
}
