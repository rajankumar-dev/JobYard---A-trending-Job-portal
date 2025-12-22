import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/auth.controller.js";

//route object
const router = express.Router();

//auth routes

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - lastName
 *         - email
 *         - password
 *         - location
 *       properties:
 *         id:
 *          type: string
 *          description: The auto-generated id of the user collection
 *         name:
 *          type: string
 *          description: The name of the user
 *         lastname:
 *          type: string
 *          description: The lastname of the user
 *         email:
 *          type: string
 *          description: The email of the user
 *         password:
 *          type: string
 *          description: The password of the user
 *         location:
 *          type: string
 *          description: The location of the user
 *       example:
 *         id: 609e129912c1371a88e1f4b5
 *         name: John
 *         lastname: Doe
 *         email: john@gmail.com
 *         password: john123
 *         location: New York
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: The authentication managing API
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *          $ref: '#/components/schemas/User'
 *   responses:
 *      200:
 *       description: The user was successfully created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      500:
 *       description: internal server error
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *   responses:
 *      200:
 *       description: The user logged in successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      500:
 *       description: internal server error
 */
//register || Post
router.post("/register", registerController);

//login || Post
router.post("/login", loginController);

export default router;
