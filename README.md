# Canary
Simple bot that alerts users by slack channel when bandwidth exceeds a performance threshold

# Installation
Assuming you are in root directory:
```
npm install
cp config.example.json config.json
```

# Configuration Options Example:
Please edit the config.json file to suit your needs:
```js
{
"apiToken": "xoxb-95176950242-cI2MPysci1pZC4uWSvJxO7Pn", // APIToken used for Slack 
"channel": "#interwebs", // Slack channel you wish to alert
"warningPing": 300, // Max warning ping you would like to be alerted about
"stdDevPing": false, // If false then ignore, otherwise check for stdDev ping as well
"numberOfRequests": 5000, // How many requests to make before reporting back
"timeout": 10,
"host": "google.com", // Host to ping
"cron" : "*/5 * * * *", // Cron syntax for how often the check should run
}
```

# Usage
```
node canary.js
```

Feel free to use whatever daemon you wish to keep the process running, I personally use ```forever```
