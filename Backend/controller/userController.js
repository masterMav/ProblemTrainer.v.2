const User = require("../models/user");
const Problem = require("../models/problem");
const { response } = require("express");

//new API endpoints
const api_userlist = (req, res) => {
  const handle = req.params.handle;
  //Get all problems saved by a user from usersDB
  User.find({ handle })
    .then((results) => {
      // create userlist
      const userlist = results.map((result) => {
        return {
          _id: result._id,
          problemName: result.problemName,
          problemLink: result.problemLink,
        };
      });

      res.send(JSON.stringify(userlist));
    })
    .catch((err) => res.status(404).send(JSON.stringify(err.message)));
};

const api_add = (req, res) => {
  const handle = req.body.handle,
    contestId = req.body.contestId,
    index = req.body.index;

  // Search problemDB
  Problem.findOne({ contestId, index })
    .then((result) => {
      if (result === null) {
        //Error Problem not found in problemDB
        res.statusMessage = "Problem not found in Problems Database.";
        res.status(422).end();
      } else {
        //Search userDB
        const str = `${index}. ${result.name}`;
        User.findOne({ handle, problemName: str })
          .then((result) => {
            if (result === null) {
              // Save in userDB
              const entry = new User({
                handle,
                problemName: str,
                problemLink: `https://codeforces.com/contest/${contestId}/problem/${index}`,
              });

              entry
                .save()
                .then((result) =>
                  res.send(
                    JSON.stringify({
                      _id: result._id,
                      problemName: result.problemName,
                      problemLink: result.problemLink,
                    })
                  )
                )
                .catch((err) => {
                  res.statusMessage = err.message;
                  res.status(500).end();
                });
            } else {
              //Error Problem Already Exists in userDB
              res.statusMessage = "Problem already present in the list.";
              res.status(422).end();
            }
          })
          .catch((err) => {
            res.statusMessage = err.message;
            res.status(500).end();
          });
      }
    })
    .catch((err) => {
      res.statusMessage = err.message;
      res.status(500).end();
    });
};

const api_delete = (req, res) => {
  User.findByIdAndDelete(req.params._id)
    .then((result) => {
      res.send("Successful Deletion.");
    })
    .catch((err) => {
      res.statusMessage = err.message;
      res.status(500).end();
    });
};

module.exports = {
  //new exports
  api_userlist,
  api_add,
  api_delete,
};
