import axios from "axios";

export default {
  getStatus: function(t) {
    axios
      .get("/isloggedin")
      .then(response => {
        // console.log("%%%%%%",response);
        // console.log("$$$$", response.data.status);
        t.setState({
          status: response.data.status
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getUserId: function(t) {
    axios.get("/user/id").then(userId => {
      console.log("userid", userId);
      t.setState({
        currentUser: userId.data
      });
    });
  },

  getAccountData: function(t) {
    axios
      .get("/user/account")
      .then(response => {
        if (response.data.location) {
          var userObj = t.state.user;
          userObj.email = response.data.email;
          userObj.name = response.data.name;
          userObj.number = response.data.number;
          userObj.favorite = response.data.favorite;
          userObj.location = response.data.location;

          t.setState({
            loadingAccount: false,
            loadingLocation: false,
            user: userObj
          });

          if (!t.state.loadingAccount && !t.state.loadingLocation) {
            t.setState({
              loading: false
            });
          }
        } else {
          let userObj = t.state.user;
          userObj.email = response.data.email;
          userObj.name = response.data.name;
          userObj.number = response.data.number;
          userObj.favorite = response.data.favorite;
          t.setState({
            loadingAccount: false,
            user: userObj
          });
          if (!t.state.loadingAccount && !t.state.loadingLocation) {
            t.setState({
              loading: false
            });
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getCurrentLocation: function(t) {
    if (t.state.user.location.city === null) {
      axios.get("https://freegeoip.net/json/").then(results => {
        const location = {
          city: results.data.city,
          country_code: results.data.country_code,
          country_name: results.data.country_name,
          latitude: results.data.latitude,
          longitude: results.data.longitude,
          region_code: results.data.region_code,
          region_name: results.data.region_name,
          zip: results.data.zip
        };
        console.log("getlocation", location);
        var userObj = t.state.user;
        userObj.location = location;
        t.setState({
          loadingLocation: false,
          user: userObj
        });

        if (!t.state.loadingAccount && !t.state.loadingLocation) {
          t.setState({
            loading: false
          });
        }

        axios
          .put("/user/update/location", location, {
            headers: { "Content-Type": "application/json" }
          })
          .then(response => {
            if (response) this.getAccountData(t);
          })
          .catch(function(error) {
            console.log("error", error);
          });
      });
    } else {
      // console.log("hello location")
    }
  },

  updateAccountData: function(t) {
    const userData = t.state.user;
    axios
      .put("/user/update", userData, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        if (response) this.getAccountData(t);
        alert("account updated");
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  creatNewGame: function(t) {
    console.log("inside helper", t.state);
    const gameData = t.state;
    // axios call to /game/create
    return axios.post("/game/create", gameData);
  },

  joinNewGame: function(t) {
    axios.post(`/game/join/${t.state.selectedGameId}`).then(joined => {
      t.setState({
        joinedGame: joined
      });
      alert("You have joined the game!");
    });
  },

  // Gets the game information with the given id
  getGameInformation: function(t) {
    axios
      .get("/showgame")
      .then(res => {
        console.log("$$$$", res.data);
        t.setState({
          results: res.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getWeather: function(t) {
    axios.get("/user/account").then(response => {
      // console.log("weather $$$$$", response)
      const city = response.data.location.city;
      const region_name = response.data.location.region_name;
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city},${region_name}&units=imperial&appid=b92bd67b1bf224690009c4ed1fc0e080`
        )
        .then(results => {
          // console.log(results)
          let temp = results.data.main.temp.toString();
          temp = temp.split(".");
          t.setState({
            icon: results.data.weather[0].icon,
            description: results.data.weather[0].main,
            temp: temp[0]
          });
        });
    });
  },

  getUserFav: function(t) {
    axios.get("/user/account/favorite").then(response => {
      t.setState({
        team: response.data.team,
        icon: response.data.icon
      });
    });
  },

  logout: function() {
    axios.get("/logout").then(function(res) {
      // console.log(res);
      if (res.data) {
        //window.location.reload();
        window.location.href = "/";
      }
    });
  }
};
