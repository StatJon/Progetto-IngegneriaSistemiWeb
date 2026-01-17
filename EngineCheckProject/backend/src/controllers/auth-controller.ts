import bcrypt from "bcrypt";
import { parsePhoneNumber } from "awesome-phonenumber";
import { Request, Response } from "express";
import { getUser, onUserLoggedInBlock, setUser, unsetUser, User } from "../utils/auth";
import { connection } from "../utils/db";

