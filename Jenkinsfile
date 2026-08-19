pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
              sh '''
              scp -r pb_hooks/* \
                root@192.168.68.55:/opt/pocketbase/pb_hooks/
              '''

              sh '''
              scp -r pb_migrations/* \
                root@192.168.68.55:/opt/pocketbase/pb_migrations/
              '''
            }
          }
      }
  }
