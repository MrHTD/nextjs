pipeline {
    agent any
    environment {
        SSH_USER = 'vbox'
        SSH_HOST = '192.168.100.14'
        RUN_SUDO = 'export SUDO_ASKPASS=/home/vbox/secret/mypass.sh'
        APP_NAME = "nextjs"
        REPO_NAME = "nextjs"
        REPO_URL = "git@github.com:MrHTD/nextjs.git"
    }
    stages {
        stage("Git Pull or Clone") {
            steps {
                sshagent(['ssh']) {
                    echo "Pulling latest code from Git repository..."
                    sh '''
                        ssh -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST \
                        "
                        # Navigate to the Projects directory
                        echo 'Navigating to /home/vbox/Projects...';

                        # Check if the Project directory exists
                        if [ ! -d '/home/vbox/Projects' ]; then
                            echo 'Directory $REPO_NAME does not exist. Creating it...';
                            mkdir '/home/vbox/Projects';
                        else
                            echo 'Directory exists. Skipping creation...';
                        fi
                        
                        cd /home/vbox/Projects;

                        # List files to ensure we're in the right directory
                        echo 'Listing contents of Projects directory...';
                        ls -la;

                        # Check if the directory exists
                        if [ ! -d '/home/vbox/Projects/$REPO_NAME' ]; then
                            echo 'Directory $REPO_NAME does not exist. Creating it...';
                            mkdir '/home/vbox/Projects/$REPO_NAME';
                        else
                            echo 'Directory exists. Skipping creation...';
                        fi

                        # Navigate to the project directory
                        cd '/home/vbox/Projects/$REPO_NAME';

                        # Check if it's a Git repository
                        if [ ! -d '.git' ]; then
                            echo 'Directory is not a Git repository. Cloning repository...';
                            git init
                            git remote add origin $REPO_URL
                            git clone $REPO_URL
                            #git switch -c devops
                        else
                            git remote -v
                            git pull origin main
                        fi
                        
                        # Fetch latest changes
                        #git remote -v;
                        #git pull origin devops;
                        "
                    '''
                }
            }
        }
        
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
        stage("Configuration Nginx") {
            steps {
                sshagent(['ssh']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST \
                        "export $RUN_SUDO;

                        cd /etc/nginx/sites-available;

                        ls -la;

                        sudo -A touch $APP_NAME;
                        
                        # Create Nginx config using heredoc
                        sudo -A bash -c 'cat > /etc/nginx/sites-available/$APP_NAME <<EOF
                        server {
                            listen 80;
                            listen [::]:80;
                        
                            root /var/www/html;
                            index index.html index.htm index.nginx-debian.html;
                        
                            server_name $APP_NAME;
                        
                            location / {
                                proxy_pass http://localhost:3000;
                                proxy_http_version 1.1;
                                proxy_set_header Upgrade \$http_upgrade;
                                proxy_set_header Connection \"upgrade\";
                                proxy_set_header Host \$host;
                                proxy_cache_bypass \$http_upgrade;
                            }
                        }
                        EOF'
                        
                        sudo -A ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/;
                        sudo -A nginx -t;
                        sudo -A systemctl restart nginx;
                        "
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
                        "export $RUN_SUDO;
                        cd /home/vbox/Projects/$REPO_NAME;
                        ls -la;
                        
                        sudo -A sudo npm install -g yarn;

                        yarn --version;

                        yarn install;

                        yarn build;
        
                        # Check if the app is running
                        if pm2 list | grep -w "$APP_NAME" > /dev/null; then
                            echo "Application $APP_NAME is already running. Restarting it..."
                            pm2 restart $APP_NAME
                        else
                            echo "Application $APP_NAME is not running. Starting it..."
                            pm2 start yarn --name $APP_NAME -- run dev
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
