import { Request, Response } from 'express';

import User from "../models/User";
import { userSchema } from "../utiles/validation";
import { User as UserType } from "../utiles/types";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({
      attributes: ['id', 'username', 'email']
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
}

export const newUser = async (req: Request, res: Response) => {
  // Joy Validation
  const result = userSchema.validate(req.body);
  if (result.error) {
    res.status(422).json({
      success: false,
      msg: `Validation err: ${result.error.details[0].message}`,
    });
    return;
  }

  const data = new User(req.body);
  data.save()
    .then(user => {
      res.send(JSON.stringify(user));
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
}

export const saveUser = async (req: Request, res: Response) => {
  // Joy Validation
  const result = userSchema.validate(req.body);
  if (result.error) {
    res.status(422).json({
      success: false,
      msg: `Validation err: ${result.error.details[0].message}`,
    });
    return;
  }

  const conditions = { '_id': req.body.userId }
  User.findOneAndUpdate(conditions, req.body, (err: any, user: UserType) => {
    if (err) return res.status(400).send(err.message);
    if (user) res.send(JSON.stringify(user));
  });
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.deleteOne({ _id: req.params.userId }).exec();
    res.send("okay");
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}


export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const users = await User.findOne({ _id: req.params.userId }).exec();
    res.json(users);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export default {
  getUsers,
  newUser,
  saveUser,
  deleteUser,
  getUserInfo,
}