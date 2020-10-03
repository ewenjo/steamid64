# How to Setup
To setup this website you must start by configuring a few enviorment variables.

Start by creating a copy of the sample `env` file using the following command:
```sh
cp .env.sample .env
```
Then fill in the missing variable `STEAM_API_KEY` with your own private Steam Web API key. Which can be found [here](http://steamcommunity.com/dev/apikey)

You can also set a `PORT` variable, if you want to run the app on a custom port.


## Usage
Run the app with NodeJS.

```bash
node app.js
```

Lastly, make sure to setup a reverse proxy that resolves to the node application.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
