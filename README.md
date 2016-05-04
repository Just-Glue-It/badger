# badger: tracking your data stochastically

## Hey, what are you doing?

This app pings the user at random points in the day and asks what they are currently doing, where they select from a bunch of tags (ex. exercise, homework, TV, etc). Over time, it will collect data and provide a visualization based on your activities. The user will be able to view old data through the RESTful API.

### install

If you're interested in installing it to run on your phone or see how it works, run:

```shell
➜  ~ git clone {your link to clone}
➜  ~ cd badger
➜  ~ npm install
➜  ~ npm start
```

and navigate to `localhost:2020/www/index.html`. If you want to run it outside the localhost, run:

```shell
➜  ~ npm run build
```

and navigate to `file:///{$PATH}/badger/app/www/index.html` in your browser; `$PATH` is where you cloned the project.

But you can just go [here](badger.js.org).

### cordova

This is a Cordova project, meaning you are able to run it on mobile if you so please. It's not in the best working state for mobile as there are some bugs that need to be fixed and optimizations to be made. The default platforms should be installed: browser and android. If you wanted to add and run a platform such as iOS (assuming you have iOS dev requirements installed):

```shell
➜  ~ cordova platform add ios
➜  ~ cordova run ios
```

If you're interested in running the android platform, plug in your phone and run:

```shell
➜  ~ cordova run android
```

and it should pop up and install the app to you phone. 

### requirements

* npm 
* cordova
* android-sdk (API v22) 
