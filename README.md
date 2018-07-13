  ## Prerequisites: Node 10.6, npm

Unzip to a folder
`npm install`
#### Logrotate
Assummes input is always correct.

*Run as follows:*

`node ./logrotate.js access.log 5`

### Monitor

Assumes input is always correct.
Program to run needs to be in quotes to also include any
params passed to it.

*Run as follows:*

`node ./monitor.js "ls -l" logs@email.com`