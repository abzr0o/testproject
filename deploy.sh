echo "switch to main brach"
git checkout main
echo "building app ..."
npm run build
echo "deploying to server"
scp -i linux.pem -r dist/* ubuntu@ec2-18-133-30-98.eu-west-2.compute.amazonaws.com:/var/server/dist
scp -i linux.pem  package.json ubuntu@ec2-18-133-30-98.eu-west-2.compute.amazonaws.com:/var/server
scp -i linux.pem  .env ubuntu@ec2-18-133-30-98.eu-west-2.compute.amazonaws.com:/var/server
echo "done"
