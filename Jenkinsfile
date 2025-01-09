pipeline {
    agent any
    // tools { nodejs "nodejs" }
    environment{
        SSH_USER = 'devxonic'
        SSH_HOST = '192.168.100.14'
        RUN_SUDO = 'export SUDO_ASKPASS=/home/devxonic/secret/mypass.sh'
        APP_NAME = "nextjsapp";
        // APP_PORT = 3000;
    }
    stages {
        stage("Git Pull") {
            steps {
                sshagent(['ssh']) {
                    echo "Pulling latest code from Git repository..."
                    sh '''
                        ssh -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST \
                        "cd /home/devxonic/Projects/deployment;

                        # Check if this is a Git repository
                        if [ -d .git ]; then
                            echo "Git repository found."
        
                            # Check the current branch
                            CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
                            if [ "$CURRENT_BRANCH" = "main" ]; then
                                echo "On main branch. Pulling latest changes..."
                                git pull origin main || { echo "Failed to pull latest changes."; exit 1; }
                            else
                                echo "Not on main branch. Current branch is $CURRENT_BRANCH."
                            fi
                        else
                            echo "This directory is not a Git repository! Exiting."
                            exit 1
                        fi
                        "
                    '''
                }
            }
        }
        // stage("Build") {
        //     steps {
        //         nodejs("nodejs") {
        //             echo "Installing dependencies and building the application..."
        //             sh 'node -v'
        //             sh 'npm install'
        //             sh 'npm run build'
        //         }
        //     }
        // }
        // stage("Installing PM2") {
        //     steps {
        //         nodejs("nodejs") {
        //             echo "Installing PM2 globally..."
        //             sh 'npm install pm2 -g'
        //         }
        //     }
        // }
        stage("Installation") {
            steps {
                    sshagent(['ssh']){
                    echo "Connecting to machine..."
                    sh '''
                        ssh -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST \
                        "export $RUN_SUDO;
                        sudo -A apt update"
                    '''
                }
            }
        }
        stage("Build") {
            steps {
                    sshagent(['ssh']){
                    echo "Connecting to machine..."
                    sh '''
                        ssh -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST \
                        "cd /home/devxonic/Projects/deployment;
                        ls -la;
                        
                        npm run build;
        
                        # Check if the app is running
                        if pm2 list | grep -w "$APP_NAME" > /dev/null; then
                            echo "Application $APP_NAME is already running. Restarting it..."
                            pm2 restart $APP_NAME
                        else
                            echo "Application $APP_NAME is not running. Starting it..."
                            pm2 start npm --name $APP_NAME -- run start
                        fi
                        
                        pm2 ls;
                        pm2 save"
                    '''
                }
            }
        }
        stage("Check PM2 Status") {
            steps {
                sshagent(credentials: ['ssh']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST \
                    "pm2 ls"
                    '''
                }
            }
        }
        // stage("Configuration Nginx") {
        //     steps {
        //         echo "Configuring Nginx as a reverse proxy..."
        //         sh """
        //             echo '
        //             server {
        //                 listen 80;
        //                 listen [::]:80;
                    
        //                 root /var/www/html;
                    
        //                 # Add index.php to the list if you are using PHP
        //                 index index.html index.htm index.nginx-debian.html;
                    
        //                 # Use a wildcard or localhost for the server_name
        //                 server_name _;  # This will accept any domain or IP
                    
        //                 location / {
        //                     proxy_pass http://localhost:3000;
        //                     proxy_http_version 1.1;
        //                     proxy_set_header Upgrade $http_upgrade;
        //                     proxy_set_header Connection 'upgrade';
        //                     proxy_set_header Host $host;
        //                     proxy_cache_bypass $http_upgrade;
        //                 }
        //             }
        //             ' | sudo tee /etc/nginx/sites-available/next-ap

        //             sudo ln -s /etc/nginx/sites-available/next-ap /etc/nginx/sites-enabled/
        //             sudo nginx -t
        //             sudo systemctl restart nginx
        //         """
        //     }
        // }
        stage("End") {
            steps {
                script {
                    if (currentBuild.result == null || currentBuild.result == 'SUCCESS') {
                        echo "Pipeline completed successfully. 🎉"
                    } else {
                        echo "Pipeline encountered errors. Please check the logs. ❌"
                    }
                }
            }
        }
    }
}
