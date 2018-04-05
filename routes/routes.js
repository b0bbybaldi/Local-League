// you can not use render with react
// https://stackoverflow.com/questions/21843840/what-does-res-render-do-and-what-does-the-html-file-look-like
const User = require("../models/user");
const Game = require("../models/game");
const Pro = require("../models/proteam");
const twilio = require("twilio");

module.exports = (app, passport) => {
  // =====================================
  // Read Only Pro team library  ========
  // =====================================
  app.post("/pro/create", (req, res) => {
    Pro.create(req.body).then(response => {
      res.send("created");
    });
  });
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get("/", (req, res) => {
    res.render("http://localhost:3000/"); // load the index.ejs file
  });

  // =====================================
  // User Account Endpoints (CRUD)  ========
  // =====================================
  app.get("/user/id", (req, res) => {
    if (req.isAuthenticated()) {
      res.json(req.session.passport.user);
    }
  });

  app.get("/user/account", (req, res) => {
    if (req.isAuthenticated()) {
      const userId = req.session.passport.user;
      User.findOne({ _id: userId }).then(user => {
        var userDate = {
          email: user.email,
          name: user.name,
          number: user.number,
          favorite: user.favorite,
          location: JSON.parse(user.location)
        };
        // console.log("\n$$$$$$$",user)

        // console.log("%%%%%%%%%",userDate)
        res.send(userDate);
      });
    }
  });

  app.put("/user/update", (req, res) => {
    if (req.isAuthenticated()) {
      const userId = req.session.passport.user;

      User.findOneAndUpdate(
        { _id: userId },
        {
          email: req.body.email,
          favorite: req.body.favorite,
          name: req.body.name,
          number: req.body.number,
          location: JSON.stringify(req.body.location)
        }
      ).then(user => {
        console.log("\n#######", user);
        res.send(true);
      });
    }
  });

  app.put("/user/update/location", (req, res) => {
    if (req.isAuthenticated()) {
      const userId = req.session.passport.user;
      // console.log("8888", userId)
      console.log("location", req.body);
      User.findOneAndUpdate(
        { _id: userId },
        { location: JSON.stringify(req.body) }
      )
        .then(location => {
          console.log("\n$$$$$$$", location);
          res.send(true);
        })
        .catch(error => {
          console.log("error location", error);
        });
    }
  });

  app.get("/user/account/favorite", (req, res) => {
    if (req.isAuthenticated()) {
      const userId = req.session.passport.user;
      User.findOne({ _id: userId }).then(user => {
        const userFavorite = user.favorite;
        Pro.findOne({ shortName: userFavorite }).then(proFav => {
          //console.log("\nteam",proFav)
          const favTeam = {
            team: proFav.name,
            icon: proFav.crestUrl
          };
          res.send(favTeam);
        });
      });
    }
  });

  // =====================================
  // CREATE A GAME  ========
  // =====================================
  app.post("/game/create", (req, res) => {
    if (req.isAuthenticated()) {
      const userId = req.session.passport.user;
      console.log(req.body);
      // console.log("\n #####",req.body);
      User.findOne({ _id: userId }).then(user => {
        console.log("user", user);

        const gameData = {
          dateAndTime: req.body.dateTime,
          NumPlayer: req.body.playerCount,
          teamOne: req.body.teamOne,
          teamTwo: req.body.teamTwo,
          itemsNeeded: req.body.checklist,
          address: req.body.searchLocation.address,
          location: user.location,
          userId: userId
        };
        console.log("ttttt", gameData);
        Game.create(gameData)
          .then(dbModel => {
            console.log("\n########dbModel", dbModel);
            Game.findOneAndUpdate(
              { _id: dbModel._id },
              { $push: { players: userId } }
            )
              .then(created => {
                console.log("!!!!!!!!!!!!!!!", created);
                // remove this when not hard coding text
                sendNotification();
                // uncomment when not hard coding text
                //getUsernumber(dbModel.location, userId)
                res.json(true);
              })
              .catch(errs => {
                console.log("err", errs);
                res.status(422).json(false);
              });
          })
          .catch(err => {
            console.log("err", err);
            res.status(422).json(false);
          });
      });
    }
  });

  // =============================================================
  // GET GAMES LOCATED IN THE SAME CURRENT USER LOCATION  ========
  // =============================================================

  app.get("/showgame", (req, res) => {
    if (req.isAuthenticated()) {
      const userId = req.session.passport.user;
      User.findOne({ _id: userId }).then(user => {
        // console.log(user)
        Game.find({ location: user.location })
          .then(dbModel => {
            // rebuild dbModal
            // const results = {
            //   currentUser: userId,
            //   games: dbModel
            // }
            // dbModel.push(userId)
            // console.log(dbModel)
            res.json(dbModel);
          })
          .catch(err => res.status(422).json(err));
      });
    }
  });

  app.post("/game/join/:id", (req, res) => {
    if (req.isAuthenticated()) {
      const userId = req.session.passport.user;
      Game.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { players: userId } }
      ).then(joinedGame => {
        res.json(true);
      });
    }
  });

  // =====================================
  // Twilio  ========
  // =====================================
  const getUsernumber = (gameLocation, userId) => {
    User.find({ location: gameLocation }, { _id: { $nin: userId } }).then(
      users => {
        console.log(users);
        const userNumbers = [];
        users.forEach(user => {
          userNumbers.push(user.number);
        });
        // uncomment when not gard coding text
        // sendNotification(userNumbers)
      }
    );
  };
  const sendNotification = () => {
    // uncomment this and add userNumber to func call

    // phoneNumbersArr.forEach(userNumber=>{
    //   let formatNum = userNumber.split("-")
    //   formatNum = "+1" + formatNum.join("")

    const client = new twilio(
      "AC6ad1592690b7c6dab18e0c7d57068a35",
      "2baf4dffb34ea1b205284ae3dcd0fe95"
    );
    //17204215986
    client.messages
      .create({
        body: "A new game near you has been created",
        to: `+17204215986`, // Text this number // change to ${formatNum}
        from: "+15707318472" // From a valid Twilio number
      })
      .then(message => console.log(message.sid));
    // })
  };
  // =====================================
  // CHECK IF IT IS LOGGED IN OR NOT =====
  // =====================================

  app.get("/isloggedin", (req, res) => {
    if (req.user === undefined || !req.user) {
      //console.log("user", req.user)
      console.log("session", req.isAuthenticated());
      res.json({ status: false, user: req.user });
    } else {
      // console.log("user", req.user)
      // console.log("session",req.isAuthenticated())
      res.json({ status: true, user: req.user });
    }
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get("/login", (req, res) => {
    // render the page and pass in any flash data if it exists
    res.render("http://localhost:3000/login", {
      message: req.flash("loginMessage")
    });
  });

  // process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "http://localhost:3000/dashboard", // redirect to the secure profile section
      failureRedirect: "http://localhost:3000/login", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get("/signup", (req, res) => {
    // render the page and pass in any flash data if it exists
    res.render("signup", { message: req.flash("signupMessage") });
  });

  // process the signup form
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "http://localhost:3000/dashboard", // redirect to the secure profile section
      failureRedirect: "http://localhost:3000/signup", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get("/dashboard", isLoggedIn, (req, res) => {
    res.render("http://localhost:3000/dashboard", {
      user: req.user // get the user out of session and pass to template
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get("/logout", (req, res) => {
    req.session.destroy(err => {
      req.logout();
      res.clearCookie("user_sid");
      // res.render("http://localhost:3000/")
      res.json(true);
    });
  });
};

// route middleware to make sure a user is logged in
const isLoggedIn = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to the home page
  res.redirect("http://localhost:3000/");
};
