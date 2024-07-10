const fs = require('fs');
const readline = require('readline');

// Membuat interface readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Meminta input pengguna dengan readline
rl.question('[generate-nginx.conf] Where you install localpride? ', (directory) => {
  const fileName = 'nginx.conf';
  const content = `
#user  nobody;
# Calcul: grep processor /proc/cpuinfo | wc -l
worker_processes  auto;

error_log  ${directory}/var/log/nginx/error.log warn;
pid        ${directory}/var/log/nginx/nginx.pid;

events {
    # Definition of the maximum number of simultaneous connections (Use the command to know the maximum value of your server: ulimit -n)
    worker_connections  1024;
    multi_accept        on;
}

http {
    ##
    # ngx_http_charset_module
    ##
    charset  utf-8;

    ##
    # ngx_http_core_module
    ##
    client_max_body_size  500M;
    include               mime.types;
    default_type          application/octet-stream;
    keepalive_timeout     65s;
    sendfile              on;
    #tcp_nopush           on;

    ##
    # ngx_http_gzip_module
    ##
    gzip             on;
    gzip_proxied     any;
    gzip_comp_level  6;
    gzip_types       text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

    ##
    # ngx_http_log_module
    ##
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    #access_log        ${directory}/var/log/nginx/http_access.log  main;
    error_log          ${directory}/var/log/nginx/http_error.log  warn;

    ##
    # Virtual Host Configs
    ##
    
    # Existing Server Block
    server {
        listen       80;
        server_name  localhost;
        
        root   ${directory}/www;
        
        location / {
            index  index.html index.htm index.php;
        }
        
        # redirect server error pages to the static page /50x.html
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
        
        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        location ~ \.php$ {
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME  $realpath_root$fastcgi_script_name;
            include        fastcgi_params;
        }
        
        # deny access to .htaccess files, if Apache's document root concurs with nginx's one
        location ~ /\.ht {
            deny  all;
        }
        
        #access_log  ${directory}/var/log//nginx/localhost.access.log;
        error_log   ${directory}/var/log//nginx/localhost.error.log warn;
    }

    # New Server Block
    server {
        listen       80;
        server_name  localhost;

        root   ${directory}/www;

        location / {
            index  index.html index.htm index.php;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        location ~ \.php$ {
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME  $realpath_root$fastcgi_script_name;
            include        fastcgi_params;
        }

        location ~ /\.ht {
            deny  all;
        }

        error_log   ${directory}/var/log/nginx/localhost.error.log warn;
    }
}
`;

rl.close()

  fs.writeFile(fileName, content, (err) => {
    if (err) {
      return console.error('Error writing to file:', err);
    }
    console.log('nginx.conf created successfully!');
  });
});

rl



