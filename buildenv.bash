#!/bin/bash

# Clone or update the repository
if [ ! -d "/var/www/html/csit-314-groupwork/.git" ]; then
	sudo git clone https://github.com/xiazixin/csit-314-groupwork.git /var/www/html/csit-314-groupwork
else
	cd /var/www/html/csit-314-groupwork
	sudo git pull https://github.com/xiazixin/csit-314-groupwork.git
fi

# Update package list
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm -y

# Change to project directory
cd /var/www/html/csit-314-groupwork

# Install required npm packages locally
sudo npm install express body-parser path fs

# Install pm2 globally
sudo npm install -g pm2
