import { db } from "../helper/db.js";

export const getAllUserData = (req, res) => {
  const q = "SELECT * FROM sat ORDER BY score DESC";
  // req.query.data

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json({ length: data.length, data });
  });
};

export const addUserData = (req, res) => {
  const q =
    "INSERT INTO sat(`Name`, `Address`, `City`, `Country`, `score`, `Passed`) VALUES(?)";

  let Passed = "pass";
  if (req.body.score > 1600)
    return res
      .status(500)
      .json({ err: "Please enter marks in the range of 0-1600" });

  if ((req.body.score * 100) / 1600 < 30) {
    Passed = "fail";
  }
  const values = [
    req.body.Name,
    req.body.Address,
    req.body.City,
    req.body.Country,
    req.body.score,
    Passed,
  ];

  console.log(values);

  db.query(q, [values], (err, data) => {
    console.log(err);
    if (err)
      return res.status(500).json({ err: "User with this name already exist" });

    return res.json({ data: "User has been created" });
  });
};

export const getRank = (req, res) => {
  const q1 = "SELECT * FROM sat ORDER BY score DESC";
  db.query(q1, (err, data) => {
    if (err) return res.status(500).send(err);
    console.log(err);
    console.log(data);
    let i = 0,
      found = false;
    for (; i < data.length; i++) {
      if (data[i]["Name"] == req.params.name) {
        found = true;
        break;
      }
    }
    console.log(found, i);
    if (!found)
      return res
        .status(500)
        .json({ err: "User with this name does not exist" });
    return res.status(200).json({ rank: i + 1 });
  });
};

export const updateUserScore = (req, res) => {
  let passed = "pass";
  if ((req.body.score * 100) / 1600 < 30) {
    passed = "fail";
  }
  const q = "UPDATE sat SET `score`=?, `Passed`=? WHERE `Name`=?";
  db.query(q, [req.body.score, passed, req.body.name], (err, data) => {
    if (err || !data["affectedRows"] || data.length == 0)
      return res.status(500).json({ data: "User does not exist" });
    return res.json({ data: "Score updated successfully" });
  });
};

export const deleteUserData = (req, res) => {
  const q = "DELETE FROM sat WHERE `Name`=?";
  db.query(q, [req.query.name], (err, data) => {
    console.log(err, data);
    if (err || !data["affectedRows"] || data.length == 0)
      return res.status(403).json({ err: "User not found" });

    return res.json("User data has been deleted successfully");
  });
};
