#!/bin/bash

#update the repository
pm2 stop server.js

pm2 delete server.js

bash buildenv.sh

pm2 start server.js