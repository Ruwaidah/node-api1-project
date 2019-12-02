// implement your API here
const express = require("express");

const server = express();

server.use(express.json());

const db = require("./data/db");
const port = 8000;

// GET request for users
server.get("/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log("error on GET users", error);
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

// GET request for one user
server.get("/users/:id", (req, res) => {
  db.findById(req.body.id)
    .then(user => {
      if (user) res.status(200).json(user);
      else
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
    })
    .catch(error => {
      //   console.log("error geting the user", error);
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

// POST request adding user
server.post("/users", (req, res) => {
  const { name, bio } = req.body;
  if (name && bio) {
    db.insert(req.body)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

// DELETE request

server.delete("/users/:id", (req, res) => {
  db.remove(req.body.id)
    .then(remove => {
      if (remove) res.status(200).json(remove);
      else
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
    })
    .catch(error =>
      res.status(500).json({ error: "The user could not be removed" })
    );
});

//  PUT request
server.put("/users/:id", (req, res) => {
  const { id, name, bio } = req.body;
  if (!name || !bio)
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  else {
    db.update(id, req.body).then(edite => {
      if (edite) res.status(200).json(edite);
      else
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
    });
  }
});

server.listen(port, () => console.log(`API running on port ${port}`));
