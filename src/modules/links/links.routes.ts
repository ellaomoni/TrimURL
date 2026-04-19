import { Router } from "express";
import { authMiddleware } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { createLinkSchema } from "./links.validation";
import {
  createLink,
  deleteLink,
  getLinkById,
  getLinks,
  redirectToLongUrl,
} from "./links.contoller";

const router = Router();

/**
 * @openapi
 * /links/r/{shortCode}:
 *   get:
 *     summary: Redirect to the original long URL
 *     tags:
 *       - Links
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *         description: The generated short code or custom alias
 *     responses:
 *       302:
 *         description: Redirects to the original long URL
 *       404:
 *         description: Short link not found
 *       410:
 *         description: Short link has expired
 */
router.get("/r/:shortCode", redirectToLongUrl);

router.use(authMiddleware);

/**
 * @openapi
 * /links:
 *   post:
 *     summary: Create a shortened link
 *     tags:
 *       - Links
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - longUrl
 *             properties:
 *               longUrl:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/blog/how-to-build
 *               customAlias:
 *                 type: string
 *                 example: my-custom-link
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-12-31T23:59:59.000Z
 *     responses:
 *       201:
 *         description: Short link created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Custom alias is already in use
 */
router.post("/", validate(createLinkSchema), createLink);

/**
 * @openapi
 * /links:
 *   get:
 *     summary: Get all links for the authenticated user
 *     tags:
 *       - Links
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Links fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", getLinks);

/**
 * @openapi
 * /links/{id}:
 *   get:
 *     summary: Get a single link by id
 *     tags:
 *       - Links
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the link to fetch
 *     responses:
 *       200:
 *         description: Link fetched successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Link not found
 */
router.get("/:id", getLinkById);

/**
 * @openapi
 * /links/{id}:
 *   delete:
 *     summary: Delete a single link by id
 *     tags:
 *       - Links
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the link to delete
 *     responses:
 *       200:
 *         description: Link deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Link not found
 */
router.delete("/:id", deleteLink);

export default router;
