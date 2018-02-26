# The Burner Games User Interface
> This is the frontend application of https://games.midburn.org. The backend application repo can be found at https://github.com/midburn/burner-games

Burner games is a simple trivia game developed by the midburn.org organization volunteers as an educational step for the [Midburn organization](http://midburn.org) ticketing system. While playing the game, the participants will be questioned about [Midburn 10 principeles](http://midburn.org/en-ten-principles/) which are the primary guidance of the Midburn Organization.

Our goal is to educate all Midburn events participants about the 10 principles, the events' vibe and explain the participants' behavior in a simple, fun & humoristic way.

### What's in it?

* Simple src/index.jsx and src/index.css (local module css).

* Webpack configuration for development (with hot reloading) and production (with minification).
* CSS module loading, so you can include your css by ```import styles from './path/to.css';```.
* Both js(x) and css hot loaded during development.
* [Webpack Dashboard Plugin](https://github.com/FormidableLabs/webpack-dashboard) on dev server.

## Development Guidance (for all levels)

1. Clone the repository and `cd` into the repo folder.

2. Install Dependencies (using [yarn](https://yarnpkg.com/en/docs/install) or [NPM](https://www.npmjs.com/))
```bash
$ yarn install
```

I personally prefer and recommand yarn. Regardless of the tool, please keep the `yarn.lock` / `package-lock.json` files in the repo root, syncronized and up to date.

Also, make sure `webpack` & `http-server` are installed on your computer. Run:

```
$ webpack -v
3.11.0

$ http-server -h
usage: http-server [path] [options]

options:
...

```

To install `webpack` or `http-server` on the global level (i.e. so you can execute them from shell), run `yarn global add http-server` or `yarn global add webpack`.

3. Build codebase using webpack

The following command will build the whole project into a 'releaseable' version inside the `public/` folder. 

```bash
$ webpack --config webpack.config.js --progress --profile --colors
```

You may take these files and deploy them to a server or static hosting service (such as s3). For local development, I recommand running `webpack --config webpack.config.js -w --progress --profile --colors` (notice the additional `-w`) for `webpack` to listen to changes you make on the files and recompiles the projects automatically.

4. Host the compiled files using `http-server` (development) or static hosting (production).

On a different terminal tab, execute the following:

```bash
burner-games-ui$ cd public/
burner-games-ui/public$ http-server -p 8080 --cors .
```

Then open your browser: [http://localhost:8080/?userId=888](http://localhost:8001/?userId=888). The `userId` param is the user's profile user id on Drupal/Spark Midburn's systems.

## Contributing Guidance

### LICENSE

See [LICENSE file included in this repository](https://github.com/Midburn/burner-games/blob/master/LICENSE) (GPL).
