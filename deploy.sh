
set -e

ssh root@159.203.6.114 "bash -s" < ./deploy_server_side.sh

echo "Deployed to production"
