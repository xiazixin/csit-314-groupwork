software development methodology group assignment.

Place the folder in /var/www/html directy for web server, for testing.

Since the links and database need server environment. 

Sorry guys, I know this sucks, and pretty badly. I tried my best at reducing the complexity of the stuff, I guess things do go bloded some how. 

#requirement: (in linux, debian trixie environment)
Node.JS (required) 
```sudo apt update```

```sudo apt install nodejs npm -y```

#dependency
```npm install express body-parser```

Then setup the server with apache2/nginx like how you aways do it. with proxypass from port 3000 so that node.js can listen to it.

pm2 (optional)
```sudo npm install -g pm2```

```pm2 start server.js```