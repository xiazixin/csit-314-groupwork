#!/bin/bash

#update the repository
cd /var/www/html/csit-314-groupwork
pm2 stop server.js
exec bash buildenv.sh
pm2 start server.js