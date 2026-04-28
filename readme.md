software development methodology group assignment.

Place the folder in /var/www/html directy for web server, for testing.

Since the links and database need server environment. 

Sorry guys, I know this sucks, and pretty badly. I tried my best at reducing the complexity of the stuff, I guess things do go bloded some how. 

# quick install (recommanded method)

```git clone https://github.com/xiazixin/csit-314-groupwork.git /var/www/html/csit-314-groupwork``` or ```git pull https://github.com/xiazixin/csit-314-groupwork.git /var/www/html/csit-314-groupwork``` or just simply download the file and save to /var/www/html/csit-314-groupwork

```. buildenv.sh``` to auto update the file to latest version and build the required environment. 

# Start server
```pm2 start server.js``` start server

```pm2 ls``` check server is running 

```pm2 restart server.js``` restart

```pm2 delete server.js``` delete

# requirement: (in linux, debian trixie environment)
Node.JS (required) 

```sudo apt update```

```sudo apt install nodejs npm -y```

# dependency

```npm install express```

```npm install body-parser```

```npm install path```

```npm install fs```

Then setup the server with apache2/nginx like how you aways do it. with proxypass from port 3000 so that node.js can listen to it.

# (optional)

pm2 

```sudo npm install -g pm2```

```pm2 start server.js```

# common issues

When there are error 500 on write. Make sure you have permition and ownership with chown and chmod. 

```
sudo chown -R www-data:www-data /var/www/html/csit-314-groupwork
sudo chmod -R 755 /var/www/html/csit-314-groupwork
```




Some time the buildenv.sh isn't updating, and the error message will overran by other commands of the script. 
if it shows 

``` git config --global --add safe.directory ```

the easiest method is just delete the whole thing and just clone again, there should be a better methods but why borders.
