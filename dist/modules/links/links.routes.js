"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const validate_1 = require("../../middleware/validate");
const links_validation_1 = require("./links.validation");
const links_contoller_1 = require("./links.contoller");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
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
router.post("/", (0, validate_1.validate)(links_validation_1.createLinkSchema), links_contoller_1.createLink);
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
router.get("/", links_contoller_1.getLinks);
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
router.get("/:id", links_contoller_1.getLinkById);
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
router.delete("/:id", links_contoller_1.deleteLink);
exports.default = router;
//# sourceMappingURL=links.routes.js.map