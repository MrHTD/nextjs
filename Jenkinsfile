pipeline {
    agent any
    // tools { nodejs "nodejs" }
    stages {
        stage("Build") {
            steps {
                nodejs("nodejs") {
                    echo "Installing dependencies and building the application..."
                    sh 'node -v'
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage("Installing PM2") {
            steps {
                nodejs("nodejs") {
                    echo "Installing PM2 globally..."
                    sh 'npm install pm2 -g'
                }
            }
        }
        stage("Start") {
            steps {
                nodejs("nodejs") {
                    echo "Starting the application with PM2..."
                    sh 'pm2 start npm --name app1 -- run start -- -p 3000'
                    sh 'pm2 ls'
                    sh 'pm2 save'
                }
                echo "App started successfully"
            }
        }
        stage("Deployment") {
            steps {
                echo "Configuring Nginx as a reverse proxy..."
                sh """
                    echo '
                    server {
                        listen 80;
                        server_name example.com;

                        location / {
                            proxy_pass http://localhost:3000;
                            proxy_http_version 1.1;
                            proxy_set_header Upgrade \$http_upgrade;
                            proxy_set_header Connection 'upgrade';
                            proxy_set_header Host \$host;
                            proxy_cache_bypass \$http_upgrade;
                        }
                    }
                    ' | sudo tee /etc/nginx/sites-available/nodeapp

                    sudo ln -s /etc/nginx/sites-available/next-ap /etc/nginx/sites-enabled/
                    sudo nginx -t
                    sudo systemctl restart nginx
                """
            }
        }
    }
    post {
        always {
            echo "Pipeline execution completed."
        }
        failure {
            echo "Pipeline execution failed. Check the logs for details."
        }
    }
}
