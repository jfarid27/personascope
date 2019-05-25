# Personascope

This is the source code for Personascope, an app designed to identify
personas and workflows in user app event logs.

Hosted on [Heroku](https://pscope.herokuapp.com/).

## Motivations

Process mining has been a highly active research field utilizing
graph theory, data mining, statistics, data visualization, and AI
to attempt to identify and build models of processes. This project
focuses on utilizing these techniques and making them accessible to
designers and engineers interested in learning how users interact with
their applications. Currently application design is driven entirely
by project specifications and designers "guessing" their user model.
This enables products to be designed in one direction, but there is
no good feedback mechanisms to validate or iterate on these designs,
and techniques are only known by practitioners in Operations Research
who use process mining. This application hopes to bridge the gap
and allow engineers and designers to data mine their own event logs
to determine workflows, study personas, and identify bottlenecks in
their applications.

## Running locally.

To start the webpack watcher, run the webpack command using
```bash
npm run dev-frontend
```

After, run the server with pm2 using
```bash
npm run dev 
```

## Demo Datasets

[Small Event Requests Log](https://gist.github.com/jfarid27/71e9eff6b3b81ec3d5a7c03a9ddacd2b)
