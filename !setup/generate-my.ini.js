const fs = require('fs');

const directory = prompt('Where you install localpride?')
const fileName = 'my.ini';
const content = `
[mysqld]
datadir=${directory}/mariadb/data
socket=${directory}/var/tmp/mysql.sock
tmpdir=${directory}/var/tmp
long_query_time=10
key_buffer_size=256M
sort_buffer_size=4M
read_buffer_size=2M
table_open_cache=400
collation-server=utf8mb4_general_ci
character-set-server=utf8mb4

[client]
socket=${directory}/var/tmp/mysql.sock
plugin-dir=${directory}/mariadb/lib/plugin
`;

fs.writeFile(fileName, content, (err) => {
  if (err) {
    return console.error('Error writing to file:', err);
  }
  console.log('my.ini created successfully!');
});
